// components/cards/ClockCard.tsx
import { Button } from "../ui/Button";
import { Card,  CardContent,  CardDescription,  CardHeader, CardTitle, } from "../ui/Card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger, } from "../ui/Collapsible";

import { Input } from "../ui/Input";
import {
    MapPinIcon,
    SettingsIcon,
    ExternalLink,
    Github,
    RefreshCw,
    ChevronDown,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useLocation } from "../../hooks/useLocation";
import type { Project } from "../../types/project";

type Props = {
    project: Project;
};

export default function ClockCard({ project }: Props) {
    const [time, setTime] = useState(new Date());
    const [quote, setQuote] = useState("");
    const [showLocationSettings, setShowLocationSettings] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    const { location, loading, getCurrentLocation, setCustomLocation } = useLocation();

    const quotes = [
        "Code never lies, comments sometimes do.",
        "First, solve the problem. Then, write the code.",
        "Experience is the name everyone gives to their mistakes.",
        "Programming isn't about what you know; it's about what you can figure out.",
        "The best error message is the one that never shows up.",
        "Code is like humor. When you have to explain it, it's bad.",
    ];

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const refreshQuote = () => {
        const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(newQuote);
    };

    const getGreeting = () => {
        const hour = time.getHours();
        if (hour < 12) return "Good morning";
        if (hour < 17) return "Good afternoon";
        if (hour < 22) return "Good evening";
        return "Good night";
    };

    const getTimeFormatted = () =>
        time.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
        });

    const getTimeOfDayBackground = () => {
        const hour = time.getHours();
        if (hour >= 5 && hour < 12) return "from-yellow-200 to-orange-300";
        if (hour >= 12 && hour < 17) return "from-blue-300 to-indigo-400";
        if (hour >= 17 && hour < 20) return "from-purple-600 to-pink-500";
        return "from-gray-800 to-gray-900";
    };

    return (
        <Card className="overflow-hidden project-card text-white bg-gradient-to-br border-blue-200 dark:border-blue-800">
            <div className={`h-48 bg-gradient-to-br ${getTimeOfDayBackground()} relative`}>
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                    {/* Quote */}
                    <div className="text-xs italic flex justify-between items-start">
                        <p className="line-clamp-2 max-w-[80%]">"{quote || quotes[0]}"</p>
                        <RefreshCw className="w-4 h-4 cursor-pointer" onClick={refreshQuote} />
                    </div>

                    {/* Time & Location */}
                    <div className="text-center">
                        <p className="text-xs uppercase opacity-75">{getGreeting()}, it's currently</p>
                        <h2 className="text-4xl font-bold">{getTimeFormatted()}</h2>
                        <div className="flex justify-center items-center gap-2 mt-1">
                            <p className="text-sm opacity-90">
                                In{" "}
                                {loading
                                    ? "Loading..."
                                    : location
                                        ? `${location.city}, ${location.country}`
                                        : "Unknown"}
                            </p>
                            <div className="flex gap-1">
                                <Button
                                    className="p-1 hover:bg-white/20"
                                    onClick={getCurrentLocation}
                                    title="Use current location"
                                >
                                    <MapPinIcon className="w-3 h-3" />
                                </Button>
                                <Button
                                    className="p-1 hover:bg-white/20"
                                    onClick={() => setShowLocationSettings((v) => !v)}
                                    title="Location settings"
                                >
                                    <SettingsIcon className="w-3 h-3" />
                                </Button>
                            </div>
                        </div>

                        {showLocationSettings && (
                            <div className="mt-2 bg-black/20 p-2 rounded text-xs">
                                <Input
                                    placeholder="Enter city name"
                                    variant="default"
                                    className="bg-white/20 text-white placeholder-white/60 text-xs"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            const input = e.target as HTMLInputElement;
                                            setCustomLocation(input.value);
                                            setShowLocationSettings(false);
                                        }
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Card Info */}
            <CardHeader>
                <CardTitle className="text-blue-700 dark:text-blue-300">{project.title}</CardTitle>
                <CardDescription>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </CardDescription>
            </CardHeader>

            <Collapsible open={showDetails} onOpenChange={setShowDetails}>
                <CollapsibleTrigger className="w-full px-6 pb-2 flex items-center justify-between text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400">
                    <span>View Details</span>
                    <ChevronDown
                        className={`h-4 w-4 transition-transform ${showDetails ? "rotate-180" : ""}`}
                    />
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <CardContent>
                        <p className="text-sm">{project.description}</p>
                    </CardContent>
                </CollapsibleContent>
            </Collapsible>

            <div className="p-6 pt-0 flex justify-between">
                {project.githubUrl && (
                    <Button variant="outline" size="sm" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            Code
                        </a>
                    </Button>
                )}
                {project.liveUrl && (
                    <Button variant="secondary" size="sm" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Live Demo
                        </a>
                    </Button>
                )}
            </div>
        </Card>
    );
}


/*
const project = {
  id: 1,
  title: "Clock Card",
  description: "A clock card that syncs with location and shows motivational quotes.",
  tags: ["clock", "react", "location"],
  githubUrl: "https://github.com/your-repo/clock-card",
  liveUrl: "https://your-site.com/clock-card",
};

*/