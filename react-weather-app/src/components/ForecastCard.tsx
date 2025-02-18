import React, { useState } from "react";
import dayjs from 'dayjs';
import {
  Table,
  Box,
  Paper,
  Card,
  CardContent,
  TableContainer,
  Typography,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";
import { ForecastData, TemperatureListItem } from "../types/Weather";
import TemperatureChart from "./TemperatureChart";

interface ForecastCardProps {
  forecast: ForecastData;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => {
  if (!forecast) return null;

  const uniqueDays = Array.from(
    new Set(forecast.list.map((item) => item.dt_txt.split(' ')[0]))
  ).slice(0, 5);

  const [selectedDate, setSelectedDate] = useState<string>(uniqueDays[0]);

  const filteredForecast = forecast.list.filter((item) => 
    item.dt_txt.startsWith(selectedDate)
  );

  const data: TemperatureListItem[] = filteredForecast.map((item) => ({
    time: dayjs(item.dt_txt).format('HH:mm'),
    temp: item.main.temp,
  }));

  return (
    <Card variant="outlined" sx={{ my: 2}}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Forecast for {forecast.city.name} on {selectedDate}
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell>Temp (°C)</TableCell>
                <TableCell>Min Temp (°C)</TableCell>
                <TableCell>Max Temp (°C)</TableCell>
                <TableCell>Wind (m/s)</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredForecast.map((item) => {
                const {
                  dt_txt,
                  main: { temp, temp_min, temp_max },
                  wind: { speed },
                  weather
                } = item;

                const { description } = weather[0];

                return (
                  <TableRow key={dt_txt}>
                    <TableCell>{dayjs(dt_txt).format('HH:mm')}</TableCell>
                    <TableCell>{temp}</TableCell>
                    <TableCell>{temp_min}</TableCell>
                    <TableCell>{temp_max}</TableCell>
                    <TableCell>{speed}</TableCell>
                    <TableCell>{description}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>


        {/* Date Selection Buttons */}
        <Box display="flex" justifyContent="center" mt={2} gap={1}>
          {uniqueDays.map((day) => (
            <Button
              key={day}
              variant={selectedDate === day ? 'contained' : 'outlined'}
              onClick={() => setSelectedDate(day)}
            >
              {day}
            </Button>
          ))}
        </Box>

        <TemperatureChart data={data} />
      </CardContent>
    </Card>
  );
}

export default ForecastCard;
