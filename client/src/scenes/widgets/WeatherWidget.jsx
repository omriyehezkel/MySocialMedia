import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const WeatherWidget = ({ apiKey }) => {
  const [weatherData, setWeatherData] = useState(null);
  const user = useSelector((state) => state.user);
  const location = user.location.split(", ").pop();
  const { palette } = useTheme();

  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${location}`
      );
      const data = await response.json();
      setWeatherData(data);
    };

    fetchWeatherData();
  }, [location, apiKey]);

  if (!weatherData) return <div>Loading...</div>;

  const { main, weather } = weatherData;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={palette.neutral.dark} variant="h5" fontWeight="500">
        Weather in {location}
        </Typography>
      </FlexBetween>
      <div style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}>
     
        <div>
          <Typography> Temperature: {(main.temp - 273.15).toFixed(1)} &#8451;</Typography>
          <Typography> Description: {weather[0].description}</Typography>
        </div>
      </div>

      
    </WidgetWrapper>
  );
};

export default WeatherWidget;
