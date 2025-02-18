import React from "react";
import { CurrentWeatherData } from "../types/Weather";
import { Stack, CardContent, Card, Typography, Box } from '@mui/material';

interface WeatherCardProps {
  currentWeather: CurrentWeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ currentWeather }) => {
  if (!currentWeather) return null;

  const { name, weather, main } = currentWeather;
  const { description } = weather[0];

  return (
    <Card variant="outlined" sx={{ my: 2}}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Current Weather in {name}
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box>
            <Typography>Description: {description}</Typography>
            <Typography>Temperature: {main.temp} °C</Typography>
            <Typography>Feels Like: {main.feels_like} °C</Typography>
            <Typography>Min/Max: {main.temp_min} °C / {main.temp_max} °C</Typography>
            <Typography>Humidity: {main.humidity}%</Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default WeatherCard;
