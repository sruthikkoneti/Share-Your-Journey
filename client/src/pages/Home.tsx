import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Post from '../components/Post';
import { getAllPosts } from '../utils/apiRoutes';
import BottomNavbar from '../components/BottomNavbar';

interface PostData {
    _id: string;
    title: string;
    photo: string;
    caption: string;
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
            <div className="flex h-screen flex-col">
                <div className="h-20"><Navbar /></div>
                <div className="relative flex-1 overflow-y-auto">
                    <div className="lg:grid lg:grid-cols-5 gap-0 md:grid md:grid-cols-5 sm:flex sm:flex-col">
                        <div className="first top-20 col-span-1">
                            <div className="fixed w-1/5">

                            </div>
                        </div>
                        <div className="lg:col-span-3 md:col-span-3">
                            {posts &&
                                posts.map((post) => (
                                    <Post
                                        key={post._id}
                                        title={post.title}
                                        photo={post.photo}
                                        caption={post.caption}
                                    />
                                ))
                            }
                        </div>
                        <div className="third right-0 top-20 lg:col-span-1 md:col-span-1 hidden lg:block">
                            <div className="fixed w-1/5">
                                <Sidebar />
                            </div>
                        </div>
                        <div className="lg:hidden md:hidden bottom-0">
                            <div className="fixed w-1/5">
                                <BottomNavbar />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
