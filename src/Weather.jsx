import React, { useState } from 'react';
import axios from 'axios';
import { WiDaySunny, WiThermometer, WiCloud } from 'react-icons/wi';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState('');
  const [temp, setTemp] = useState('');
  const [desc, setDesc] = useState('');

  const handleCity = (event) => {
    setCity(event.target.value);
  };

  const getWeather = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9da91afbcddcb7db6cfc2c4318fb8c61&units=metric`
      )
      .then((response) => {
        const data = response.data;
        setWeather(data.weather[0].main);
        setTemp(data.main.temp);
        setDesc(data.weather[0].description);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        setWeather('');
        setTemp('');
        setDesc('City not found or error fetching data');
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-blue-100 to-pink-200">
      <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl shadow-xl p-8 w-full max-w-md text-center text-gray-900">
        <h2 className="text-4xl font-extrabold text-purple-800 mb-2 tracking-wide">
          Weather Report
        </h2>
        <p className="text-sm text-purple-700 mb-6">
          I can give you a weather report about your city
        </p>

        <input
          type="text"
          onChange={handleCity}
          placeholder="Enter your city...."
          className="w-full p-3 rounded-md mb-5 text-gray-800 bg-white bg-opacity-90 shadow focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <button
          onClick={getWeather}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 transition-all text-white font-semibold py-3 px-4 rounded-md shadow"
        >
          Get Report
        </button>

        <div className="mt-6 bg-white/30 p-4 rounded-lg text-purple-900 font-semibold space-y-2 shadow-inner">
          <p className="flex items-center justify-center gap-2">
            <WiCloud className="text-2xl" />
            Weather: {weather}
          </p>
          <p className="flex items-center justify-center gap-2">
            <WiThermometer className="text-2xl" />
            Temperature: {temp}°C
          </p>
          <p className="flex items-center justify-center gap-2">
            <WiDaySunny className="text-2xl" />
            Description: {desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Weather;

