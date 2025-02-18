import React from "react";
import { CurrentWeatherData } from "../types/Weather";
import { Stack, CardContent, Card, Typography, Box } from '@mui/material';
import WeatherDataLine from "./WeatherDataLine";

interface WeatherCardProps {
  currentWeather: CurrentWeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ currentWeather }) => {
  if (!currentWeather) return null;

  const {
    name,
    weather,
    main,
    visibility,
    wind,
    clouds
  } = currentWeather;
  const { description, icon } = weather[0];

  return (
    <Card variant="outlined" sx={{ my: 2}}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Current Weather in {name}
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box>
            <WeatherDataLine label="Description" value={description} />

            {/* Weather details */}
            <WeatherDataLine label="Temperature" value={main.temp} unit="°C" />
            <WeatherDataLine label="Feels Like" value={main.feels_like} unit="°C" />
            <WeatherDataLine label="Minimum Temperature" value={main.temp_min} unit="°C" />
            <WeatherDataLine label="Maximum Temperature" value={main.temp_max} unit="°C" />
            <WeatherDataLine label="Pressure" value={main.pressure} unit=" hPa" />
            <WeatherDataLine label="Humidity" value={main.humidity} unit="%" />
            <WeatherDataLine label="Sea Level" value={main.sea_level} unit=" hPa" />
            <WeatherDataLine label="Ground Level" value={main.grnd_level} unit=" hPa" /> 
            <WeatherDataLine label="Visibility" value={visibility} unit=" m" />
            <WeatherDataLine label="Wind Speed" value={wind.speed} unit="m/s" />
            <WeatherDataLine label="Wind Direction" value={wind.deg} unit="°" />
            <WeatherDataLine label="Wind Gust" value={wind.gust} unit=" m/s" />
            <WeatherDataLine label="Cloudiness" value={clouds.all} unit="%" />
          </Box>
          <Box>
            <img
              src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
              alt={description}
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default WeatherCard;
