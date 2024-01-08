import { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserInfo } from '../utils/apiRoutes';
import Post from '../components/Post';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/ProfileCard';
import Sidebar from '../components/Sidebar';
import BottomNavbar from '../components/BottomNavbar';
import Form from '../components/Form';
import { Types } from 'mongoose'

interface UserData {
  username: string;
  posts: PostData[];
  bio?: string;
  userUpVotedPosts?: Types.ObjectId[],
  userDownVotedPosts?: Types.ObjectId[],
}

interface PostData {
  _id: Types.ObjectId,
  title: string;
  photo: string;
  caption: string;
  location: string;
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
                {user && (
                  <ProfileCard
                    username={user.username}
                    postCount={user.posts.length}
                    bio={user.bio || ''}
                  />
                )}
                <Form />
              </div>
            </div>
          </div>
          <div className="col-span-3 mt-28 px-28">
            {userPosts &&
              userPosts.map((userPost, index) => (
                <Post
                  key={index}
                  title={userPost.title}
                  photo={userPost.photo}
                  caption={userPost.caption}
                  location={userPost.location}
                  postID={userPost._id}
                  userUpVotedPosts={user?.userUpVotedPosts ?? []}
                  userDownVotedPosts={user?.userDownVotedPosts ?? []}
                  isDeletePage={true}
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
