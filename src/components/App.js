
import React from "react";
import './../styles/App.css';
import axios from "axios";
import { useEffect, useState } from "react";
import 'regenerator-runtime/runtime';

const API_KEY = "4054535fcc56ee7b217bf7f35be322f1";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);

  const search = async (e) => {
    if (e.key === "Enter") {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`
      );
      setWeather(response.data);
      setQuery("");
    }
  };

  const kelvinToFahrenheit = (k) => ((k - 273.15) * 9) / 5 + 32;
  return (
    <div className="app">
      <input
        type="text"
        className="search"
        placeholder="Enter a city"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />
      {weather && (
        <div className="weather">
          <div className="city">{weather.name}</div>
          <div className="temperature">
            {Math.round(kelvinToFahrenheit(weather.main.temp))}°F
          </div>
          <div className="description">{weather.weather[0].description}</div>
          <div className="icon">
            <img
              src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App
