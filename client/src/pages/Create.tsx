import { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserInfo } from '../utils/apiRoutes';
import Post from '../components/Post';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import BottomNavbar from '../components/BottomNavbar';
import Form from '../components/Form';

interface UserData {
  username: string;
  posts: PostData[];

}

interface PostData {
  _id: string;
  title: string;
  photo: string;
  caption: string;

}



const Profile: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [userPosts, setUserPosts] = useState<PostData[]>([]);
  const token = localStorage.getItem("token")

  useEffect(() => {

    const fetchUserData = async () => {
      try {
        const response = await axios.get<UserData>(getUserInfo, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setUser(response.data);
        setUserPosts(response.data.posts)
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [token]);

  return (
    <>
      <div className="screen">
        <Navbar />
        <main className="container-fluid mx-0 grid grid-cols-5 screen h-screen sm:">
          <div className="col-span-1 mt-28">
            <div className="w-full top-28">
              <div className="fixed">
                <Form/>
              </div>
            </div>
          </div>
          <div className="col-span-3 mt-28 px-28">
            {userPosts &&
              userPosts.map((userPost) => (
                <Post
                  key={userPost._id}
                  title={userPost.title}
                  photo={userPost.photo}
                  caption={userPost.caption}
                />
              ))}
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

export default Profile;
