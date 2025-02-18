export interface WeatherInfo {
  description: string;
  icon: string;
}

export interface CurrentWeatherData {
  id: number;
  name: string;
  weather: WeatherInfo[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
}

export interface ForecastListItem {
  dt_txt: string;
  weather: WeatherInfo[];
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
}

export interface ForecastData {
  list: ForecastListItem[];
  city: {
    name: string;
    country: string;
  };
}

export interface TemperatureListItem {
  time: string;
  temp: number;
}
