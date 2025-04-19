
import { useState, useEffect } from 'react';
import { CloudSun, CloudRain, Sun, Loader2 } from 'lucide-react';

interface WeatherForecastProps {
  destination: string;
}

interface WeatherDay {
  date: string;
  temp: number;
  condition: 'sunny' | 'cloudy' | 'rainy';
  description: string;
}

const WeatherForecast = ({ destination }: WeatherForecastProps) => {
  const [weather, setWeather] = useState<WeatherDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Only fetch if we have a destination
    if (!destination) return;
    
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // In a real app, this would call a weather API
        // Here we're generating mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const today = new Date();
        const forecast: WeatherDay[] = [];
        
        const conditions: Array<'sunny' | 'cloudy' | 'rainy'> = ['sunny', 'cloudy', 'rainy'];
        const descriptions = {
          sunny: 'Clear skies',
          cloudy: 'Partly cloudy',
          rainy: 'Light rain'
        };
        
        // Generate 5 days of weather data
        for (let i = 0; i < 5; i++) {
          const day = new Date(today);
          day.setDate(today.getDate() + i);
          
          const condition = conditions[Math.floor(Math.random() * conditions.length)];
          const temp = Math.floor(Math.random() * 15) + 20; // Random temp between 20-35°C
          
          forecast.push({
            date: day.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }),
            temp,
            condition,
            description: descriptions[condition]
          });
        }
        
        setWeather(forecast);
      } catch (err) {
        console.error('Error fetching weather:', err);
        setError('Could not load weather data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchWeatherData();
  }, [destination]);
  
  // Get weather icon based on condition
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="h-6 w-6 text-yellow-500" />;
      case 'cloudy':
        return <CloudSun className="h-6 w-6 text-gray-400" />;
      case 'rainy':
        return <CloudRain className="h-6 w-6 text-blue-400" />;
      default:
        return <CloudSun className="h-6 w-6 text-gray-400" />;
    }
  };
  
  if (!destination) return null;
  
  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
      <h3 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
        <CloudSun className="mr-2 h-5 w-5 text-yatri-blue" />
        Weather Forecast for {destination}
      </h3>
      
      {loading ? (
        <div className="flex justify-center py-4">
          <Loader2 className="h-6 w-6 text-gray-400 animate-spin" />
        </div>
      ) : error ? (
        <div className="text-sm text-red-500 py-2">{error}</div>
      ) : (
        <div className="grid grid-cols-5 gap-2">
          {weather.map((day, index) => (
            <div key={index} className="text-center p-2 rounded-lg bg-white dark:bg-gray-600">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-300">{day.date}</div>
              <div className="flex justify-center my-2">
                {getWeatherIcon(day.condition)}
              </div>
              <div className="text-lg font-semibold text-gray-800 dark:text-white">{day.temp}°C</div>
              <div className="text-xs text-gray-500 dark:text-gray-300">{day.description}</div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 italic text-center">
        Weather forecast is simulated - in a real app, this would use live weather API data
      </div>
    </div>
  );
};

export default WeatherForecast;
    