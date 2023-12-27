import { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserInfo } from '../utils/apiRoutes';
import Post from '../components/Post';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/ProfileCard';
import Sidebar from '../components/Sidebar';
import BottomNavbar from '../components/BottomNavbar';

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
        console.log(response.data)
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
      <div className="flex h-screen flex-col">
        <div className="h-20"><Navbar /></div>
        <div className="relative flex-1 overflow-y-auto">
          <div className="lg:grid lg:grid-cols-5 gap-0 md:grid md:grid-cols-5 sm:flex sm:flex-col">
            <div className="top-20 lg:col-span-1 md:col-span-1">
              <div className="lg:fixed md:fixed lg:w-1/5 sm:w-full">
                <ProfileCard
                  username={user?.username}
                  postCount={user && user.posts ? user.posts.length : 0}
                />
              </div>
            </div>
            <div className="lg:col-span-3 md:col-span-3">
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

export default Profile;
