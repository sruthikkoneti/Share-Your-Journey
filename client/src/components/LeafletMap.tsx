import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletMap: React.FC = () => {
    const [currentPosition, setCurrentPosition] = useState<[number, number]>();
    // const initialPosition: [number, number] = [51.505, -0.09];

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentPosition([latitude, longitude]);
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported');
        }
    }, []);

    return (
        <>
            {
                currentPosition ? <div style={{ width: '100%', height: '80vh' }}>
                <MapContainer
                    // center={currentPosition || initialPosition}
                    center={currentPosition}
                    zoom={13}
                    scrollWheelZoom={true}
                    style={{ width: '100%', height: '100%' }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {/* <Marker position={initialPosition} /> */}
                    <Marker position={currentPosition} />
                    {/* Add more markers here with different positions */}
                </MapContainer>
            </div> : <div>Enable the location to use the map feature</div>
            }
        </>
        
    );
};

export default LeafletMap;
