import React, { useEffect, useState } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(center);

  useEffect(() => {
    // Function to fetch the current position
    const fetchCurrentPosition = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({
          lat: latitude,
          lng: longitude
        });
      });
    };

    // Fetch position once immediately when component mounts
    fetchCurrentPosition();

    // Set an interval to update the location every 10 minutes
    const intervalId = setInterval(fetchCurrentPosition, 600000); // 600000ms = 10 minutes

    // Cleanup on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition}
          zoom={15}
        >
          <Marker position={currentPosition} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default LiveTracking;
