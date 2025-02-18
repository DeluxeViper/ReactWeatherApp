export interface WeatherInfo {
  description: string;
  icon: string;
}

export interface CurrentWeatherData {
  weather: WeatherInfo[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  name: string;
}

export interface ForecastListItem {
  dt_text: string;
  weather: WeatherInfo[];
  main: {
    temp: number;
  };
}

export interface ForecastData {
  list: ForecastListItem[];
  city: {
    name: string;
    country: string;
  };
}
