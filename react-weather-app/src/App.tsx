import React, { useEffect, useState } from 'react'
import './styles/App.css';
import { CurrentWeatherData } from './types/Weather';
import { City } from './types/City';
import { getCurrentWeather } from './services/weatherService';
import { cities } from './data/cities';
import { Container, Typography, Box, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import WeatherCard from  './components/WeatherCard';

const App = () => {
  const [selectedCityId, setSelectedCityId] = useState<number>(cities[0].id);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData | null>(null);
  const [loadingCurrentWeather, setLoadingCurrentWeather] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () =>  {
      try {
        setLoadingCurrentWeather(true);
        setError(null);

        const data = await getCurrentWeather(selectedCityId);
        setCurrentWeather(data);
      } catch (e: any) {
        setError(e.message || 'Error fetching current weather');
      } finally {
        setLoadingCurrentWeather(false);
      }
    }

    fetchWeather();
  }, [selectedCityId]);

  const handleCityChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newCityId = parseInt(event.target.value as string, 10);
    setSelectedCityId(newCityId);
  }

  return (
    <Container maxWidth="sm" sx={{ my: 4}}>
      <Typography variant="h4" gutterBottom>
        Simple Weather App
      </Typography>

      <Box sx={{ mb: 2}}>
        <FormControl fullWidth>
          <InputLabel id="city-select-label">Select City</InputLabel>
          <Select
            labelId="city-select-label"
            id="citySelect"
            value={selectedCityId}
            label="Select City"
            onChange={handleCityChange}
          >
            {cities.map((city: City) => (
              <MenuItem key={city.id} value={city.id}>
                {city.name}, {city.country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {error && (
        <Typography color="error" paragraph>
          {error}
        </Typography>
      )}

      {loadingCurrentWeather ? (
        <Box display="flex" justifyContent="center" my={2}>
          <CircularProgress />
        </Box>
      ) : (
        currentWeather && <WeatherCard currentWeather={currentWeather} />
      )}
    </Container>
  )
}

export default App
