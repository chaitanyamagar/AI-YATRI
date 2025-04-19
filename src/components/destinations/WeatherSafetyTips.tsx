
import { useState, useEffect } from 'react';
import { CloudSun, Shield, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface WeatherSafetyTipsProps {
  destination: string;
}

const WeatherSafetyTips = ({ destination }: WeatherSafetyTipsProps) => {
  const [weatherData, setWeatherData] = useState({
    current: {
      temp: 0,
      condition: '',
      icon: '',
    },
    forecast: [] as Array<{
      day: string;
      temp: number;
      condition: string;
    }>
  });
  
  useEffect(() => {
    // In a real app, this would fetch from a weather API
    // Here we'll simulate weather data
    const generateWeatherData = () => {
      const currentTemp = Math.floor(Math.random() * 15) + 20; // 20-35°C
      
      const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Clear'];
      const currentCondition = conditions[Math.floor(Math.random() * conditions.length)];
      
      const forecast = [];
      const days = ['Today', 'Tomorrow', 'Day 3'];
      
      for (let i = 0; i < 3; i++) {
        forecast.push({
          day: days[i],
          temp: currentTemp + Math.floor(Math.random() * 5) - 2, // +/- 2 degrees
          condition: conditions[Math.floor(Math.random() * conditions.length)]
        });
      }
      
      setWeatherData({
        current: {
          temp: currentTemp,
          condition: currentCondition,
          icon: currentCondition.includes('Rain') ? '🌧️' : 
                currentCondition.includes('Cloud') ? '⛅' : '☀️'
        },
        forecast
      });
    };
    
    generateWeatherData();
  }, [destination]);
  
  // Get safety tips based on destination
  const getSafetyTips = () => {
    if (destination.toLowerCase().includes('mumbai')) {
      return [
        "Avoid carrying valuables during monsoon season (June-September).",
        "Be cautious at crowded places like train stations and markets.",
        "Use official prepaid taxi counters at airports and major stations.",
        "Avoid beaches during monsoons due to high tides.",
        "Carry a light raincoat or umbrella from June to September."
      ];
    } else if (destination.toLowerCase().includes('delhi')) {
      return [
        "Avoid going out alone late at night, especially in isolated areas.",
        "Use registered taxis or ride-sharing services instead of random cabs.",
        "Keep emergency numbers handy: Police (100), Tourist Police (1800-111-363).",
        "Be careful of air quality during winter months (Nov-Feb).",
        "Dress modestly when visiting religious places."
      ];
    } else {
      // Default safety tips for other destinations
      return [
        "Keep emergency contact numbers of local police and your hotel.",
        "Be aware of your surroundings, especially in crowded tourist areas.",
        "Use reputed transportation services and avoid isolated areas at night.",
        "Respect local customs and dress codes, especially at religious sites.",
        "Stay hydrated and use sun protection during summer months."
      ];
    }
  };
  
  // Get best time to visit based on destination
  const getBestTimeToVisit = () => {
    if (destination.toLowerCase().includes('mumbai')) {
      return {
        best: "October to March",
        reason: "Pleasant weather with temperatures between 20-30°C",
        avoid: "June to September",
        avoidReason: "Heavy monsoon rains can cause flooding and disruption"
      };
    } else if (destination.toLowerCase().includes('delhi')) {
      return {
        best: "October to March",
        reason: "Pleasant weather with clear skies and moderate temperatures",
        avoid: "May to July",
        avoidReason: "Extreme heat with temperatures often exceeding 40°C"
      };
    } else {
      return {
        best: "October to March",
        reason: "Generally pleasant weather across most of India",
        avoid: "June to September",
        avoidReason: "Monsoon season affects most parts with heavy rainfall"
      };
    }
  };
  
  const safetyTips = getSafetyTips();
  const bestTimeToVisit = getBestTimeToVisit();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CloudSun className="h-5 w-5 text-yatri-blue" />
          <span>Weather & Safety Guide</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {weatherData.forecast.map((day, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
              <h4 className="font-medium">{day.day}</h4>
              <div className="text-2xl my-1">
                {day.condition.includes('Rain') ? '🌧️' : 
                 day.condition.includes('Cloud') ? '⛅' : '☀️'}
              </div>
              <p className="text-lg font-semibold">{day.temp}°C</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{day.condition}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-4">
          <h4 className="font-medium flex items-center">
            <Clock className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
            Best Time to Visit
          </h4>
          <div className="mt-2 space-y-1">
            <p className="text-sm"><span className="font-medium">Recommended:</span> {bestTimeToVisit.best}</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">{bestTimeToVisit.reason}</p>
            <p className="text-sm"><span className="font-medium">Avoid:</span> {bestTimeToVisit.avoid}</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">{bestTimeToVisit.avoidReason}</p>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div>
          <h4 className="font-medium flex items-center mb-3">
            <Shield className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
            Safety Tips
          </h4>
          <ul className="space-y-2">
            {safetyTips.map((tip, index) => (
              <li key={index} className="text-sm flex items-start">
                <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherSafetyTips;
