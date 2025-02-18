import React from "react";
import { ForecastData } from "../types/Weather";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";

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
            <Box key={dt_txt} sx={{ mb: 2}}>
              <Typography variant="subtitle1" fontWeight="bold">
                {dt_txt}
              </Typography>
              <Box display="flex" alignItems="center" gap={2} mt={1}>
                <img
                  src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                  alt={description}
                />
                <Box>
                  <Typography>Description: {description}</Typography>
                  <Typography>Temp: {main.temp} C</Typography>
                </Box>
              </Box>
              {index < 4 && <Divider sx={{ mt: 2 }} />}
            </Box>
          )
        })}
      </CardContent>
    </Card>
  );
}

export default ForecastCard;
