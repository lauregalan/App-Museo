import { useEffect, useState } from "react";
import * as Location from "expo-location";

type GeoZone = {
  latitude: number;
  longitude: number;
  radius: number; // en metros
};

export function useInsideArea(zone: GeoZone = DEFAULT_ZONE) {
  const [inside, setInside] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkPosition();
  }, []);

  const checkPosition = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setInside(false);
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const dist = getDistanceMeters(
        location.coords.latitude,
        location.coords.longitude,
        zone.latitude,
        zone.longitude
      );

      setInside(dist <= zone.radius);
    } catch (error) {
      console.error("Error obteniendo ubicación:", error);
      setInside(false);
    } finally {
      setLoading(false);
    }
  };

  return { inside, loading };
}

const DEFAULT_ZONE: GeoZone = {
  latitude: -34.6037,
  longitude: -58.3816,
  radius: 200, // ejemplo: 200 metros
};

// -----------------------------------------
// Función para calcular la distancia (Haversine)
// -----------------------------------------
function getDistanceMeters(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371000; // radio de la tierra en metros

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(a));
}

const toRad = (deg: number) => (deg * Math.PI) / 180;
