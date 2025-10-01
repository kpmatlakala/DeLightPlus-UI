// hooks/useLocation.ts (simplified)
import { useState } from "react";

export function useLocation() {
  const [location, setLocation] = useState<{ city: string; country: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await res.json();
      const city = data.address?.city || data.address?.town || "Unknown";
      const country = data.address?.country || "Unknown";
      setLocation({ city, country });
      setLoading(false);
    });
  };

  const setCustomLocation = (city: string) => {
    setLocation({ city, country: "Custom" });
  };

  return { location, loading, getCurrentLocation, setCustomLocation };
}
