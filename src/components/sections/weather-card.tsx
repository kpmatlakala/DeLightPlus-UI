import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Cloud, Sun, CloudRain, CloudSnow, CloudDrizzle, Wind, Droplets, Gauge, Edit2, Check, X } from 'lucide-react';

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
}

interface WeatherResponse {
  success: boolean;
  data?: WeatherData;
  message?: string;
}

const getWeatherIcon = (iconCode: string) => {
  const iconMap: Record<string, any> = {
    '01d': Sun,
    '01n': Sun,
    '02d': Cloud,
    '02n': Cloud,
    '03d': Cloud,
    '03n': Cloud,
    '04d': Cloud,
    '04n': Cloud,
    '09d': CloudDrizzle,
    '09n': CloudDrizzle,
    '10d': CloudRain,
    '10n': CloudRain,
    '11d': CloudRain,
    '11n': CloudRain,
    '13d': CloudSnow,
    '13n': CloudSnow,
    '50d': Cloud,
    '50n': Cloud,
  };
  
  return iconMap[iconCode] || Cloud;
};

export default function WeatherCard() {
  const [city, setCity] = useState('Johannesburg');
  const [inputCity, setInputCity] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const { data: weatherResponse, isLoading, error, refetch } = useQuery<WeatherResponse>({
    queryKey: ['/api/weather', city],
    queryFn: async (): Promise<WeatherResponse> => {
      const response = await fetch(`/api/weather/${encodeURIComponent(city)}`);
      const data = await response.json();
      return data;
    },
    enabled: !!city,
    retry: false,
  });

  const handleCityChange = () => {
    if (inputCity.trim()) {
      setCity(inputCity.trim());
      setIsEditing(false);
      setInputCity('');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setInputCity('');
  };

  const weatherData = weatherResponse?.data;
  const WeatherIcon = weatherData ? getWeatherIcon(weatherData.icon) : Cloud;

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-green-900/20 dark:to-green-800/10 border-none shadow-lg typewriter-card terminal-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-slate-800 dark:text-green-400">
          <span className="text-xl font-bold">Weather</span>
          {!isEditing ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsEditing(true);
                setInputCity(city);
              }}
              className="text-slate-600 dark:text-green-300 hover:text-slate-800 dark:hover:text-green-400"
            >
              <Edit2 size={16} />
            </Button>
          ) : (
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCityChange}
                className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
              >
                <Check size={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
              >
                <X size={16} />
              </Button>
            </div>
          )}
        </CardTitle>
        
        {isEditing ? (
          <Input
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCityChange();
              if (e.key === 'Escape') handleCancel();
            }}
            placeholder="Enter city name"
            className="mt-2 dark:bg-green-900/20 dark:border-green-500/30"
            autoFocus
          />
        ) : (
          <p className="text-sm text-slate-600 dark:text-green-200">
            {weatherData ? `${weatherData.city}, ${weatherData.country}` : city}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-16 w-full dark:bg-green-900/20" />
            <div className="grid grid-cols-3 gap-4">
              <Skeleton className="h-12 dark:bg-green-900/20" />
              <Skeleton className="h-12 dark:bg-green-900/20" />
              <Skeleton className="h-12 dark:bg-green-900/20" />
            </div>
          </div>
        ) : error || !weatherResponse?.success ? (
          <div className="text-center py-8">
            <Cloud className="w-12 h-12 text-slate-400 dark:text-green-600 mx-auto mb-3" />
            <p className="text-slate-600 dark:text-green-300 mb-2">
              {weatherResponse?.message || 'Unable to load weather data'}
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => refetch()}
              className="dark:border-green-500/30 dark:text-green-400 dark:hover:bg-green-900/20"
            >
              Try Again
            </Button>
          </div>
        ) : weatherData && (
          <>
            {/* Main Weather Display */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 dark:bg-green-900/30 rounded-full">
                  <WeatherIcon className="w-8 h-8 text-blue-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-800 dark:text-green-400">
                    {weatherData.temperature}°C
                  </div>
                  <div className="text-sm text-slate-600 dark:text-green-200 capitalize">
                    {weatherData.description}
                  </div>
                </div>
              </div>
            </div>

            {/* Weather Details */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-white/50 dark:bg-green-900/20 rounded-lg">
                <Droplets className="w-5 h-5 text-blue-500 dark:text-green-400 mx-auto mb-1" />
                <div className="text-sm font-medium text-slate-800 dark:text-green-300">
                  {weatherData.humidity}%
                </div>
                <div className="text-xs text-slate-600 dark:text-green-500">Humidity</div>
              </div>
              
              <div className="text-center p-3 bg-white/50 dark:bg-green-900/20 rounded-lg">
                <Wind className="w-5 h-5 text-cyan-500 dark:text-green-400 mx-auto mb-1" />
                <div className="text-sm font-medium text-slate-800 dark:text-green-300">
                  {weatherData.windSpeed} m/s
                </div>
                <div className="text-xs text-slate-600 dark:text-green-500">Wind</div>
              </div>
              
              <div className="text-center p-3 bg-white/50 dark:bg-green-900/20 rounded-lg">
                <Gauge className="w-5 h-5 text-purple-500 dark:text-green-400 mx-auto mb-1" />
                <div className="text-sm font-medium text-slate-800 dark:text-green-300">
                  {weatherData.pressure}
                </div>
                <div className="text-xs text-slate-600 dark:text-green-500">hPa</div>
              </div>
            </div>

            {/* Live Badge */}
            <div className="flex justify-center">
              <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                Live Weather Data
              </Badge>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}