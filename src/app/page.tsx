// page.tsx
import React from 'react';
import WeatherCard from './components/WeatherCard';

type WeatherData = {
  date: string;
  avgTemp: number;
  weatherCode: number;
};

export default async function Home() {
  const weatherData: WeatherData[] = await getWeatherData();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-blue-200 p-4">
      <h1 className="text-4xl font-bold mb-8 text-white">London Weather Forecast</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {weatherData.map((data) => (
          <WeatherCard
            key={data.date}
            date={data.date}
            avgTemp={data.avgTemp}
            weatherCode={data.weatherCode}
          />
        ))}
      </div>
    </main>
  );
}

async function getWeatherData(): Promise<WeatherData[]> {
  const latitude = 51.5074; // London's latitude
  const longitude = -0.1278; // London's longitude

  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode&timezone=Europe/London`
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error('Failed to fetch weather data');
  }

  // Process data to get daily averages and most frequent weather codes
  const hourlyTimestamps = data.hourly.time;
  const hourlyTemperatures = data.hourly.temperature_2m;
  const hourlyWeatherCodes = data.hourly.weathercode;

  const dailyDataMap: { [date: string]: { temps: number[]; codes: number[] } } = {};

  hourlyTimestamps.forEach((timestamp: string, index: number) => {
    const date = timestamp.split('T')[0];
    const temp = hourlyTemperatures[index];
    const code = hourlyWeatherCodes[index];

    if (dailyDataMap[date]) {
      dailyDataMap[date].temps.push(temp);
      dailyDataMap[date].codes.push(code);
    } else {
      dailyDataMap[date] = {
        temps: [temp],
        codes: [code],
      };
    }
  });

  // Calculate average temperatures and most frequent weather codes
  const weatherData: WeatherData[] = Object.entries(dailyDataMap).map(
  ([date, data]) => {
    const avgTemp =
      data.temps.reduce((sum, temp) => sum + temp, 0) / data.temps.length;

    const codeFrequency: { [code: number]: number } = {};
    data.codes.forEach((code) => {
      codeFrequency[code] = (codeFrequency[code] || 0) + 1;
    });

    // Explicitly type the keys as numbers
    const mostFrequentCode = parseInt(
      (Object.keys(codeFrequency) as unknown as number[]).reduce((a, b) =>
        codeFrequency[a] > codeFrequency[b] ? a : b
      ).toString()
    );

    return {
      date,
      avgTemp,
      weatherCode: mostFrequentCode,
    };
  }
);


  // Get the next three days
  const today = new Date().toISOString().split('T')[0];
  const nextThreeDaysData = weatherData
    .filter((data) => data.date >= today)
    .slice(1, 4);

  return nextThreeDaysData;
}