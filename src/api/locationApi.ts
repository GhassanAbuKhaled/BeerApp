import axios from "axios";

const baseURL = "https://api.openweathermap.org/data/2.5";

const locationApi = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export default locationApi;
