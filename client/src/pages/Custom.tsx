import { useState, useEffect,FormEvent } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Post from '../components/Post';
import {  getPostsByLocation, getUserVotedPosts } from '../utils/apiRoutes';
import BottomNavbar from '../components/BottomNavbar';
import { Types } from 'mongoose';
import { useNavigate, useParams } from 'react-router-dom';

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

const Custom: React.FC = () => {
    const [user, setUser] = useState<UserVotedPosts | null>(null);
    const [posts, setPosts] = useState<PostData[]>([]);
    const token = localStorage.getItem('token');
    const {location}=useParams()

    const navigate = useNavigate();
    const [locationQuery, setLocationQuery] = useState<string>('');

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(`/search/${locationQuery}`);
        setLocationQuery('')
    };

    useEffect(() => {
        const fetchUserVotedPosts=async()=>{
            try{
                const response= await axios.get<UserVotedPosts>(getUserVotedPosts,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setUser(response.data)
            }catch(error){
                console.log(error)
            }
        }
        const fetchPostsByLocation = async () => {
            try {
                const response = await axios.get<PostData[]>(`${getPostsByLocation}${location}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data)
                setPosts(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUserVotedPosts()
        fetchPostsByLocation();
    }, [token,location]);

    return (
        <>
            <div className="screen">
                <Navbar />
                <main className="container-fluid mx-0 grid grid-cols-5 screen h-screen">
                    <div className="col-span-1 mt-28">
                        <div className="w-full top-28">
                        <div className="fixed">
                                <form onSubmit={handleSearch}>
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="w-full mx-10 rounded-md border focus:outline-none focus:border-blue-500"
                                        value={locationQuery}
                                        onChange={(e) => setLocationQuery(e.target.value)}
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-3 mt-28 px-28">
                        {(posts && user) &&
                            posts.map((post) => (
                                <Post
                                    key={post._id}
                                    title={post.title}
                                    photo={post.photo}
                                    caption={post.caption}
                                    location={post.location}
                                    postID={post._id}
                                    user={post.user}
                                    userUpVotedPosts={user?.userUpVotedPosts}
                                    userDownVotedPosts={user?.userDownVotedPosts}
                                />
                            ))
                        }
                        {
                            posts.length!==0? null : <div className='flex items-center pt-24 text-center h-full justify-center' >No Posts found for the given location :(</div>
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

export default Custom;
