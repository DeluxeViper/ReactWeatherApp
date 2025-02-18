import { Box } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TemperatureListItem } from "../types/Weather";

interface TemperatureChartProps {
  data: TemperatureListItem[]; 
}

const TemperatureChart = ({ data }: TemperatureChartProps) => {
  return (
    <Box sx={{ mt: 3, ml: -2 }}>
      <strong style={{ paddingLeft: "40%", fontSize: "20px" }}>Daily Temp Chart</strong>
      <ResponsiveContainer height={300}>
        <LineChart data={data} width={500} height={300}>
          <XAxis
            dataKey="time"
            label={{ value: "Time (HH:mm)", dy: 10, position: "insideBottomRight" }}
          />
          <YAxis label={{ value: "Temp (°C)", dx: 10, dy: -45, angle: -90, position: "insideBottomLeft" }}/>
          <Tooltip />
          <Line type="monotone" dataKey="temp" stroke="#1E88E5" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default TemperatureChart;
