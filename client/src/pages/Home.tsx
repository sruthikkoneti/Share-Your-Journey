import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Post from '../components/Post';
import { getAllPosts } from '../utils/apiRoutes';

interface PostData {
  _id: string;
  title: string;
  photos: string[];
  caption: string;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([])
  const token = localStorage.getItem("token")

  useEffect(() => {
    const fetchPosts = async () => {
      try {

        const response = await axios.get<PostData[]>(getAllPosts, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, [token]);

  return (
    <div className="flex">
      <Navbar />
      <div className="flex-1 flex justify-end">
        <div className="lg:w-2/3 md:w-2/3 sm:w-full mt-16 flex justify-center">
          <div className="lg:w-1/2 md:w-1/2 sm:p-4">
            {posts &&
              posts.map((post) => (
                <Post
                  key={post._id}
                  title={post.title}
                  photo={post.photos[0]}
                  caption={post.caption}
                />
              ))}
          </div>
        </div>
        <div className="hidden lg:block w-1/3 mt-20">
           <div className="fixed mt-0 w-full">
           <Sidebar />
           </div>
          </div>
      </div>
    </div>
  );
};

export default Home;
