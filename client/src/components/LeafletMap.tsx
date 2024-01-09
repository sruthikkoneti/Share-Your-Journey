import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup , ImageOverlay} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaLocationDot } from 'react-icons/fa6';

interface MapPost {
    title: string;
    caption: string;
    location: string;
    coordinateX: string;
    coordinateY: string;
    photo: string,
    user: {
        username: string;
    };
}

interface LeafletMapProps {
    mapPosts: MapPost[];
}

const LeafletMap: React.FC<LeafletMapProps> = ({ mapPosts }) => {
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
            {currentPosition ? (
                <div style={{ width: '100%', height: '80vh' }}>
                    <MapContainer
                        center={currentPosition}
                        zoom={13}
                        scrollWheelZoom={true}
                        style={{ width: '100%', height: '100%' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={currentPosition} />
                        {mapPosts.map((post, index) => (
                            <>
                            <Marker
                                key={index}
                                position={[+post.coordinateX, +post.coordinateY]}
                            >
                                <Popup>
                                    <div>
                                        <h3>{post.title}</h3>
                                        <p><FaLocationDot/>{post.location}</p>
                                        <p>{post.caption}</p>
                                        <p>Posted by: {post.user.username}</p>
                                    </div>
                                </Popup>
                            </Marker>
                            <ImageOverlay
                                key={index}
                                url={`${import.meta.env.VITE_HOST}${post.photo}`} // Replace with your image URL from post.photo
                                bounds={[
                                    [+post.coordinateX, +post.coordinateY], // Southwest coordinates of the image bounds
                                    [+post.coordinateX + 0.1, +post.coordinateY + 0.1], // Northeast coordinates of the image bounds (adjust this based on your image size)
                                ]}
                                alt="not displayed"
                            />
                            </>
                        ))}
                    </MapContainer>
                </div>
            ) : (
                <div>Enable the location to use the map feature</div>
            )}
        </>

    );
};

export default LeafletMap;
