import { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserInfo } from '../utils/apiRoutes';
import Post from '../components/Post';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/ProfileCard';
import Sidebar from '../components/Sidebar';

interface UserData {
  username: string;
  posts: PostData[];

}

interface PostData {
  _id: string;
  title: string;
  photos: string[];
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

    // Fetch user's userPosts
    // const fetchUserPosts = async () => {
    //   try {
    //     const postsResponse = await axios.get<PostData[]>(getUserPosts(userId));
    //     setUserPosts(postsResponse.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    fetchUserData();
    // fetchUserPosts();
  }, [token]);

  return (
    <>
      <div className="flex flex-col">
        <div>
          <Navbar />
        </div>
        <div className="flex">
          <div className="w-2/3 p-4">
            <div className="flex">
              <div className="w-1/4 mt-20">
                <div className="fixed mt-0 flex justify-center">
                <ProfileCard
                  username={user?.username}
                  postCount={user && user.posts ? user.posts.length : 0}
                />
                </div>
              </div>
              <div className="w-3/4 m-5 p-10 mt-20">
                {userPosts &&
                  userPosts.map((userPost) => (
                    <Post
                      key={userPost._id}
                      title={userPost.title}
                      photo={userPost.photos[0]}
                      caption={userPost.caption}
                    />
                  ))}
              </div>
            </div>
          </div>
          <div className="hidden lg:block w-1/3 mt-20">
           <div className="fixed mt-0 w-full">
           <Sidebar />
           </div>
          </div>
        </div>
      </div>



    </>

  );
};

export default Profile;
