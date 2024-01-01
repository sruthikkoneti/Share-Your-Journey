import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Post from '../components/Post';
import { getAllPosts } from '../utils/apiRoutes';
import BottomNavbar from '../components/BottomNavbar';

interface PostData {
    title: string;
    photo: string;
    caption: string;
    location: string;
    user: {
      username: string;
    };
}

const Home: React.FC = () => {
    const [posts, setPosts] = useState<PostData[]>([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get<PostData[]>(getAllPosts, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPosts(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPosts();
    }, [token]);

    return (
        <>
            <div className="screen">
                <Navbar />
                <main className="container-fluid mx-0 grid grid-cols-5 screen h-screen">
                    <div className="col-span-1 mt-28">
                        <div className="w-full top-28">
                            <div className="fixed">
                            <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full  mx-10 rounded-md border focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-3 mt-28 px-28">
                        {posts &&
                            posts.map((post) => (
                                <Post
                                    key={post._id}
                                    title={post.title}
                                    photo={post.photo}
                                    caption={post.caption}
                                    location={post.location}
                                    user={post.user}
                                />
                            ))
                        }
                    </div>
                    <div className="col-span-1 mt-28 lg:block md:block sm:hidden">
                        <div className="w-full">
                            <div className="fixed">
                                <Sidebar />
                            </div>
                        </div>
                    </div>
                    <div className="lg:hidden md:hidden sm:block">
                        <BottomNavbar />
                    </div>
                </main>
            </div>
        </>
    );
};

export default Home;
