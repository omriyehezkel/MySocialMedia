import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const WeatherWidget = ({ apiKey }) => {
  const [weatherData, setWeatherData] = useState(null);
  const user = useSelector((state) => state.user);
  const location = user.location.split(", ").pop();

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
    <div>
      <h2>Weather in {location}</h2>
      <p>Temperature: {(main.temp - 273.15).toFixed(1)} &#8451;</p>
      <p>Description: {weather[0].description}</p>
    </div>
  );
};

export default WeatherWidget;
