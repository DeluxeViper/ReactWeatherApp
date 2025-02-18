import React, { useEffect, useState } from 'react'
import {
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Autocomplete,
  Button,
} from '@mui/material';
import { getCurrentWeather, getForecast } from './services/weatherService';
import { CurrentWeatherData, ForecastData } from './types/Weather';
import WeatherCard from  './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import Footer from './components/Footer';
import { City } from './types/City';
import { cities } from './data/cities';
import './styles/App.css';

const App = () => {
  const [selectedCityId, setSelectedCityId] = useState<number>(cities[0].id);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData | null>(null);
  const [loadingCurrentWeather, setLoadingCurrentWeather] = useState(false);

  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loadingForecast, setLoadingForecast] = useState(false);
  const [showingForecast, setShowingForecast] = useState(false);

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

    if (showingForecast) {
      handleFetchForecast();
    }
  }, [selectedCityId]);

  const handleCityChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newCityId = parseInt(event.target.value as string, 10);
    setSelectedCityId(newCityId);
  };

  const handleFetchForecast = async () => {
    try {
      setLoadingForecast(true);
      setError(null);

      const data = await getForecast(selectedCityId);
      setForecast(data);
      setShowingForecast(true);
    } catch (e: any) {
      setError(e.message || 'Error fetching forecast');
      setShowingForecast(false);
    } finally {
      setLoadingForecast(false);
    }
  };

  const closeForecastDisplay = () => {
    setShowingForecast(false);
    setForecast(null);
    setLoadingForecast(false);
  }

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        pb: 8,
      }}
    >
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

      {!forecast ? (
        <Button
          variant="contained"
          onClick={handleFetchForecast}
          disabled={loadingForecast || !!error}
        >
          {loadingForecast ? 'Loading Forecast...' : 'See Forecast'}
        </Button>
      ) : (
        <Box>
          <Button
            variant="contained"
            onClick={closeForecastDisplay}
          >
            {'Close'}
          </Button>
          <ForecastCard forecast={forecast} />
        </Box>
      )}
    </Container>
      <Footer />
    </Box>
  )
}

export default App;
