import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const GoogleMapp: React.FC = () => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const containerStyle = {
        width: '100%',
        height: '90vh'
    };

    const [currentPosition, setCurrentPosition] = useState<any>({ lat: 51.505, lng: -0.09 });
    const [markerPosition, setMarkerPosition] = useState<any>({ lat: 51.505, lng: -0.09 });

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: apiKey,
    });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentPosition({ lat: latitude, lng: longitude });
                    setMarkerPosition({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported');
        }
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentPosition}
            zoom={13}
        >
            <Marker
                position={markerPosition}
                icon={{
                    url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png', // Red marker icon
                    scaledSize: new window.google.maps.Size(30, 30), // Marker size
                }}
            />
            {/* Add more markers here with different positions */}
        </GoogleMap>
    ) : (
        <div>Loading...</div>
    );
};

export default GoogleMapp;
