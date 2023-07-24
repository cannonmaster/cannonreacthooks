import { useState, useEffect } from "react";

interface GeolocationData {
  loading: boolean;
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  latitude: number | null;
  longitude: number | null;
  speed: number | null;
  timestamp: number | null;
  error: PositionError | null;
}
interface PositionError {
  code: number;
  message: string;
  PERMISSION_DENIED: number;
  POSITION_UNAVAILABLE: number;
  TIMEOUT: number;
}
const useGeolocation = (options: PositionOptions = {}): GeolocationData => {
  const [geolocation, setGeolocation] = useState<GeolocationData>({
    loading: true,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: null,
    error: null,
  });

  useEffect(() => {
    const successHandler = (position: {
      coords: {
        accuracy: any;
        altitude: any;
        altitudeAccuracy: any;
        heading: any;
        latitude: any;
        longitude: any;
        speed: any;
      };
      timestamp: any;
    }) => {
      const {
        coords: {
          accuracy,
          altitude,
          altitudeAccuracy,
          heading,
          latitude,
          longitude,
          speed,
        },
        timestamp,
      } = position;

      setGeolocation({
        loading: false,
        accuracy,
        altitude,
        altitudeAccuracy,
        heading,
        latitude,
        longitude,
        speed,
        timestamp,
        error: null,
      });
    };

    const errorHandler = (error: PositionError) => {
      setGeolocation({
        loading: false,
        accuracy: null,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        latitude: null,
        longitude: null,
        speed: null,
        timestamp: null,
        error,
      });
    };

    const watchId = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler,
      options
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [options]);

  return geolocation;
};

export default useGeolocation;
