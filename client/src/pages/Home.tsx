import { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Post from '../components/Post';
import { getAllPosts, getUserVotedPosts } from '../utils/apiRoutes';
import BottomNavbar from '../components/BottomNavbar';
import { Types } from 'mongoose';
import { useNavigate } from 'react-router-dom';

interface UserVotedPosts {
    userUpVotedPosts?: Types.ObjectId[],
    userDownVotedPosts?: Types.ObjectId[],
}

interface PostData {
    _id: Types.ObjectId,
    title: string;
    photo: string;
    caption: string;
    location: string;
    user: {
        username: string;
    };
}

const Home: React.FC = () => {
    const [user, setUser] = useState<UserVotedPosts | null>(null);
    const [posts, setPosts] = useState<PostData[]>([]);
    const token = localStorage.getItem('token');

    const navigate = useNavigate();
    const [location, setLocation] = useState<string>('');

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(`/search/${location}`);
        setLocation('')
    };

    useEffect(() => {
        const fetchUserVotedPosts = async () => {
            try {
                const response = await axios.get<UserVotedPosts>(getUserVotedPosts, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setUser(response.data)
            } catch (error) {
                console.log(error)
            }
        }
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
        fetchUserVotedPosts()
        fetchPosts();
    }, [token]);

    return (
        <>
            <div className="screen">
                <Navbar />
                <main className="container-fluid mx-0 grid grid-cols-5 screen h-screen sm:flex-col">
                    <div className="col-span-1 mt-28">
                        <div className="w-full top-28">
                            <div className="fixed">
                                <form onSubmit={handleSearch}>
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="w-full mx-10 rounded-md border focus:outline-none focus:border-blue-500"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="lg:hidden md:hidden col-span-5 mt-31 lg:mt-28 md:mt-28">
                        {(posts && user) &&
                            posts.map((post) => (
                                <Post
                                    key={String(post._id)}
                                    title={post.title}
                                    photo={post.photo}
                                    caption={post.caption}
                                    location={post.location}
                                    postID={post._id}
                                    user={post.user}
                                    userUpVotedPosts={user?.userUpVotedPosts ?? []}
                                    userDownVotedPosts={user?.userDownVotedPosts ?? []}
                                    isDeletePage={false}
                                />
                            ))
                        }
                    </div>
                    <div className="lg:col-span-3 lg:mt-28 lg:px-28 hidden lg:block">
                        {posts &&
                            user &&
                            posts.map((post) => (
                                <Post
                                    key={String(post._id)}
                                    title={post.title}
                                    photo={post.photo}
                                    caption={post.caption}
                                    location={post.location}
                                    postID={post._id}
                                    user={post.user}
                                    userUpVotedPosts={user?.userUpVotedPosts ?? []}
                                    userDownVotedPosts={user?.userDownVotedPosts ?? []}
                                    isDeletePage={false}
                                />
                            ))}
                    </div>
                    <div className="col-span-1 mt-28 lg:block md:block sm:hidden">
                        <div className="w-full">
                            <div className="fixed lg:block md:block hidden">
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
