import axios from "axios";

const baseApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
  timeout: 10000, // optional
  headers: {
    "Content-Type": "application/json",
  },
});

export default baseApi;
