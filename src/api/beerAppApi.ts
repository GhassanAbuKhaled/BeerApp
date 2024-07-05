import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const baseURL = "http://api.example.com/v1";

// Axios instance with customized configuration
const beerAppApi = axios.create({
  baseURL,
  timeout: 5000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
    // Add other headers if needed, such as authorization headers
    // Example:
    // 'Authorization': `Bearer ${yourAccessToken}`,
  },
  withCredentials: true,
});

// Request interceptor for handling request errors
beerAppApi.interceptors.request.use(
  (config) => {
    // Modify request config here if needed (e.g., adding headers dynamically)
    return config;
  },
  (error) => {
    // Handle request error
    console.error('Request error:', error.message);
    return Promise.reject(error);
  }
);

// Response interceptor for handling response errors
beerAppApi.interceptors.response.use(
  (response) => {
    // Handle successful responses here if needed
    return response;
  },
  (error) => {
    // Handle response error
    console.error('Response error:', error.message);
    return Promise.reject(error);
  }
);

// This sets the mock adapter on the default instance
export const mockBeerAppApi = new MockAdapter(beerAppApi);
export default beerAppApi;
