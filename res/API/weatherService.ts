import apiClient from "./baseApi";

const API_KEY = "b0efb02d99a2d83b47796bf8b75d5dad"; // replace with your key

const WeatherService = {
  // Get current weather by coordinates
  getCurrentWeather: (lat: number, lon: number) =>
    apiClient.get(`weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`),

//Get current weather by city name
  getWeatherByCity: (city: string) =>
    apiClient.get(`weather?q=${city}&appid=${API_KEY}&units=metric`),

  // Get forecast by coordinates
  getForecast: (lat: number, lon: number) =>
    apiClient.get(`forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`),

  // Get air quality
  getAirQuality: (lat: number, lon: number) =>
    apiClient.get(`air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`),
};

export default WeatherService;
