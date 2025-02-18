import React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 4,
        py: 2,
        textAlign: "center",
        backgroundColor: "#1E88E5",
        color: "#FFF",
        width: "100%",
        postiion: "absolute",
        bottom: 0,
        left: 0,
      }}
    >
      <Typography variant="h6">Weather App</Typography>
      <Typography variant="body2">by Abdullah Mohamed © {new Date().getFullYear()}</Typography>
    </Box>
  )
} 

export default Footer;
