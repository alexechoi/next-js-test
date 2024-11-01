// components/WeatherCard.tsx
import React from 'react';

type WeatherCardProps = {
  date: string;
  avgTemp: number;
  weatherCode: number;
};

const weatherCodeMapping: { [key: number]: { description: string; emoji: string } } = {
  0: { description: 'Clear sky', emoji: '☀️' },
  1: { description: 'Mainly clear', emoji: '🌤️' },
  2: { description: 'Partly cloudy', emoji: '⛅' },
  3: { description: 'Overcast', emoji: '☁️' },
  45: { description: 'Fog', emoji: '🌫️' },
  48: { description: 'Depositing rime fog', emoji: '🌫️' },
  51: { description: 'Light drizzle', emoji: '🌦️' },
  53: { description: 'Moderate drizzle', emoji: '🌦️' },
  55: { description: 'Dense drizzle', emoji: '🌧️' },
  56: { description: 'Light freezing drizzle', emoji: '🌧️❄️' },
  57: { description: 'Dense freezing drizzle', emoji: '🌧️❄️' },
  61: { description: 'Slight rain', emoji: '🌧️' },
  63: { description: 'Moderate rain', emoji: '🌧️' },
  65: { description: 'Heavy rain', emoji: '🌧️' },
  66: { description: 'Light freezing rain', emoji: '🌧️❄️' },
  67: { description: 'Heavy freezing rain', emoji: '🌧️❄️' },
  71: { description: 'Slight snow fall', emoji: '🌨️' },
  73: { description: 'Moderate snow fall', emoji: '🌨️' },
  75: { description: 'Heavy snow fall', emoji: '❄️' },
  77: { description: 'Snow grains', emoji: '🌨️' },
  80: { description: 'Slight rain showers', emoji: '🌦️' },
  81: { description: 'Moderate rain showers', emoji: '🌦️' },
  82: { description: 'Violent rain showers', emoji: '⛈️' },
  85: { description: 'Slight snow showers', emoji: '🌨️' },
  86: { description: 'Heavy snow showers', emoji: '❄️' },
  95: { description: 'Thunderstorm', emoji: '⛈️' },
  96: { description: 'Thunderstorm with slight hail', emoji: '⛈️' },
  99: { description: 'Thunderstorm with heavy hail', emoji: '⛈️' },
};

const WeatherCard: React.FC<WeatherCardProps> = ({ date, avgTemp, weatherCode }) => {
  const weather = weatherCodeMapping[weatherCode] || {
    description: 'Unknown',
    emoji: '❓',
  };

  // Determine background color based on temperature
  let bgColor = 'bg-blue-500';
  if (avgTemp >= 30) {
    bgColor = 'bg-red-500';
  } else if (avgTemp >= 20) {
    bgColor = 'bg-yellow-400';
  } else if (avgTemp >= 10) {
    bgColor = 'bg-green-400';
  } else if (avgTemp >= 0) {
    bgColor = 'bg-blue-400';
  } else {
    bgColor = 'bg-blue-700';
  }

  return (
    <div className={`rounded-lg shadow-md p-6 w-full ${bgColor} text-white`}>
      <h2 className="text-xl font-semibold mb-2">
        {new Date(date).toLocaleDateString('en-GB', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        })}
      </h2>
      <div className="text-6xl mb-4">{weather.emoji}</div>
      <p className="text-3xl font-bold">{avgTemp.toFixed(1)}°C</p>
      <p className="text-lg capitalize mt-2">{weather.description}</p>
    </div>
  );
};

export default WeatherCard;