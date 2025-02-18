import React from 'react';
import { Stack, Typography } from '@mui/material';

interface WeatherDataLineProps {
  label: string;
  value: string | number;
  unit?: string;
}

const WeatherDataLine: React.FC<WeatherDataLineProps> = ({ label, value, unit }) => (
  <Stack direction="row" spacing={1}>
    <Typography variant="body1" fontWeight="bold">
      {label}:
    </Typography>
    <Typography variant="body1">
      {value}
      {unit && unit}
    </Typography>
  </Stack>
)

export default WeatherDataLine;
