'use client';

import { Project } from "../../types/project"; // adjust import path as needed
import { ProjectCard } from "./ProjectCard";
import { Sun, MapPin, Settings } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

// Dummy location hook
function useLocation() {
  const [location, setLocation] = useState({ city: "San Francisco", country: "USA" });
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = () => {
    setLoading(true);
    setTimeout(() => {
      setLocation({ city: "New York", country: "USA" });
      setLoading(false);
    }, 1200);
  };

  const setCustomLocation = (city: string) => {
    setLocation({ city, country: "Custom" });
  };

  return { location, loading, getCurrentLocation, setCustomLocation };
}

type WeatherCardProps = {
  project: Project;
};

export default function WeatherCard({ project }: WeatherCardProps) {
  const [showLocationSettings, setShowLocationSettings] = useState(false);
  const { location, loading, getCurrentLocation, setCustomLocation } = useLocation();

  return (
    <ProjectCard
      title={project.title}
      description={project.description}
      tags={project.tags}
      githubUrl={project.githubUrl}
      liveUrl={project.liveUrl}
      className="bg-gradient-to-br from-blue-50 to-sky-100 dark:from-blue-950/50 dark:to-sky-900/50 border-blue-200 dark:border-blue-800"
    >
      <div className="h-48 bg-gradient-to-br from-sky-400 to-blue-600 relative overflow-hidden rounded-t-lg text-white p-6 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">
              {loading ? "Loading..." : location.city}
            </h3>
            <p className="text-sm opacity-90">
              {loading ? "" : location.country}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Sun className="w-8 h-8" />
            <div className="flex flex-col gap-1">
              <Button
                size="icon"
                variant="ghost"
                onClick={getCurrentLocation}
                title="Use current location"
              >
                <MapPin className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setShowLocationSettings(!showLocationSettings)}
                title="Location settings"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {showLocationSettings && (
          <div className="mt-3 text-xs">
            <Input
              placeholder="Enter city name"
              className="bg-white/20 text-white placeholder-white/60 text-xs"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const target = e.target as HTMLInputElement;
                  setCustomLocation(target.value);
                  setShowLocationSettings(false);
                }
              }}
            />
          </div>
        )}

        <div className="flex items-end gap-4">
          <div className="text-4xl font-bold">22°C</div>
          <div className="text-sm opacity-90 mb-2">
            <div>Feels like 25°C</div>
            <div>Sunny</div>
          </div>
        </div>
      </div>
    </ProjectCard>
  );
}


/*
import WeatherCard from "@/components/cards/WeatherCard";

const dummyProject = {
  id: 1,
  title: "Weather App",
  description: "Displays current weather conditions using dummy data.",
  tags: ["React", "API", "OpenWeather"],
  githubUrl: "https://github.com/example/weather-app",
  liveUrl: "https://weather-app.example.com",
};

export default function Page() {
  return <WeatherCard project={dummyProject} />;
}
*/