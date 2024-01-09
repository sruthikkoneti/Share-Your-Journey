import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import BottomNavbar from '../components/BottomNavbar'
import LeafletMap from '../components/LeafletMap'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { getMapPosts } from '../utils/apiRoutes'

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

const MapPage = () => {
    const [mapPosts, setMapPosts] = useState<MapPost[]>([]);
    const token = localStorage.getItem("token")

    useEffect(() => {
        const fetchMapPosts = async () => {
            try {
                const response = await axios.get<MapPost[]>(getMapPosts, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                console.log(response.data)
                setMapPosts(response.data);
                console.log(mapPosts)
            } catch (error) {
                console.log(error);
            }
        };

        fetchMapPosts();
    }, []);
    return (
        <>
            <div className="screen">
                <Navbar />
                <main className="container-fluid mx-0 grid grid-cols-5 screen h-screen sm:">
                    <div className="col-span-1 mt-28">
                        <div className="w-full top-28"></div>
                    </div>
                    <div className="col-span-3 mt-28">
                        <LeafletMap mapPosts={mapPosts} />
                    </div>
                    <div className="col-span-1 mt-28 lg:block md:block sm:hidden">
                        <div className="fixed lg:block md:block hidden">
                            <Sidebar />
                        </div>
                    </div>
                    <div className="lg:hidden md:hidden sm:block">
                        <BottomNavbar />
                    </div>
                </main>
            </div>
        </>
    )
}

export default MapPage