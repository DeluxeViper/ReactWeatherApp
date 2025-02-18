import axios from 'axios';
import { CurrentWeatherData, ForecastData } from '../types/Weather';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getCurrentWeather = async (cityId: number): Promise<CurrentWeatherData> => {
  const url = `${BASE_URL}/weather?id=${cityId}&appid=${API_KEY}&units=metric`;
  const response = await axios.get<CurrentWeatherData>(url);
  return response.data;
}

export const getForecast = async (cityId: number): Promise<ForecastData> => {
  const url = `${BASE_URL}/forecast?id=${cityId}&appid=${API_KEY}&units=metric`;
  const response = await axios.get<ForecastData>(url);
  return response.data;
}
