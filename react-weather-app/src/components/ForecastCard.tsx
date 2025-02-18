import React from "react";
import { ForecastData } from "../types/Weather";
import {
  Table,
  Box,
  Paper,
  Card,
  CardContent,
  Divider,
  TableContainer,
  Typography,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

interface ForecastCardProps {
  forecast: ForecastData;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => {
  if (!forecast) return null;

  return (
    <Card variant="outlined" sx={{ my: 2}}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Forecast for {forecast.city.name}
        </Typography>
        {forecast.list.slice(0, 5).map((item, index) => {
          const { dt_txt, weather, main } = item;
          const { description, icon } = weather[0];

          return (
            <Card variant="outlined" sx={{ my: 2}}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Forecast for {forecast.city.name}
                </Typography>

                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Temp (°C)</TableCell>
                        <TableCell>Min Temp (°C)</TableCell>
                        <TableCell>Max Temp (°C)</TableCell>
                        <TableCell>Wind (m/s)</TableCell>
                        <TableCell>Description</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {forecast.list.map((item) => {
                        const {
                          dt_txt,
                          main: { temp, temp_min, temp_max },
                          wind: { speed },
                          weather
                        } = item;

                        const { description } = weather[0];

                        return (
                          <TableRow key={dt_txt}>
                            <TableCell>{dt_txt}</TableCell>
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
              </CardContent>
            </Card>
          )
        })}
      </CardContent>
    </Card>
  );
}

export default ForecastCard;
