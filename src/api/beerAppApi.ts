import useTokenStore from "@/store/tokenStore";
import axios, { AxiosError } from "axios";
import MockAdapter from "axios-mock-adapter";

const baseURL = "http://localhost:5000";

// Axios instance with customized configuration
const beerAppApi = axios.create({
  baseURL,
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for handling request errors
beerAppApi.interceptors.request.use(
  (config) => {

      const csrfToken = useTokenStore().csrfTokenValue;
      if(csrfToken) config.headers['csrf_token'] = csrfToken;

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
beerAppApi.interceptors.response.use(
  (response) => {
    // Handle successful response
    return response;
  },
  (error: AxiosError) => {
    if (axios.isCancel(error)) {
      console.error('Request canceled', error.message);
    }
    return Promise.reject(error); 
  }
);

// This sets the mock adapter on the default instance
// export const mockBeerAppApi = new MockAdapter(beerAppApi);
export default beerAppApi;
