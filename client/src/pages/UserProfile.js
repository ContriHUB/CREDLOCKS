import React, { useEffect, useState } from "react";
import "../utils/profile.css";
import {
  followUser,
  getUserByUsername,
  unfollowUser,
} from "../services/operations/settingsAPI";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import { setUserDetails } from "../slices/profileSlice";
import {
  FaUserCheck,
  FaCoins,
  FaHeart,
  FaComment,
  FaUserPlus,
  FaUserMinus,
} from "react-icons/fa";
import { ACCOUNT_TYPE } from "../utils/constant";
import {
  addModeratorAPI,
  removeModeratorAPI,
} from "../services/operations/blogAPI";
import { setUserDetails } from "../slices/profileSlice";
import AboutCard from "../components/UI/AboutCard";
function UserProfile() {
  const { username } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { userDetails } = useSelector((state) => state.profile);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true); // State variable for loading status
  const [isFollowing, setIsFollowing] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserByUsername(username, token);
        console.log("response in fetchuser", response);
        setUser(response.user);
        setIsFollowing(response?.followers?.includes(user.username));
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.log("error in fetching user details", error);
      }
    };

    fetchUserDetails();
  }, [username, token]);
  useEffect(() => {
    setIsModerator(user?.isModerator || false);
  }, [user]);

  const followHandler = async () => {
    try {
      const response = await followUser(username, token);
      if (response.data.success) {
        setIsFollowing(true);
      }

      console.log("response in fetching user details", response);
    } catch (error) {
      console.log("error in fetching user details", error);
    }
    console.log("followed");
  };

  //unfollow handler
  const unfollowhandler = async () => {
    try {
      const response = await unfollowUser(username, token);
      console.log("response in fetching user details", response);
      if (response.data.success) setIsFollowing(false);
    } catch (error) {
      console.log("error in fetching user details", error);
    }
    console.log("unfollowed");
  };

  if (loading) {
    return <div>Loading...</div>; // Render a loading indicator while data is being fetched
  }
  //addmoderator
  // const addModerator = async (username) => {
  //   // Renaming function to avoid conflict
  //   try {
  //     const response = await addModeratorAPI(username, token); // Using renamed imported function
  //     console.log("response in fetching user details", response);
  //     setIsModerator(true);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log("error in adding moderator", error);
  //   }
  // };
  // const removeModerator = async () => {
  //   try {
  //     const response = await removeModeratorAPI(username, token);
  //     if (response.data.success) setIsModerator(false);
  //   } catch (error) {
  //     console.log("error in removing moderator", error);
  //   }
  // };
  const addModerator = async (username) => {
    try {
      const response = await addModeratorAPI(username, token);
      console.log("response in fetching user details", response);
      setIsModerator(true);
      setLoading(false);
    } catch (error) {
      console.log("error in adding moderator", error);
    }
  };

  const removeModerator = async () => {
    try {
      const response = await removeModeratorAPI(username, token);
      if (response.data.success) {
        setIsModerator(false);
      }
    } catch (error) {
      console.log("error in removing moderator", error);
    }
  };

  console.log("user inside userprofile", user);
  console.log("userDetails which user login", userDetails);
  return (

    <div className="max-w-6xl mx-auto px-4 py-8">
    {/* Profile Header Card */}
    <AboutCard className="mb-8">
      

   
      <div>
        <div className="container">
          <div className="profile">
            <div className="profile-image">
              <img src={user?.additionalDetails?.profileImg} alt="" />
            </div>
            <div className="profile-user-settings p-2">
              <h1 className="profile-user-name mb-2 text-sm font-serif ">
                {user?.username}
              </h1>
              {username==userDetails?.data.username?(<></>):(isFollowing ? (
                <button
                  className="btn profile-edit-btn"
                  onClick={unfollowhandler}
                >
                  Unfollow
                  <FaUserMinus aria-hidden="true" />
                </button>
              ) : (
                <button
                  className="btn profile-edit-btn"
                  onClick={followHandler}
                >
                  Follow
                  <FaUserPlus aria-hidden="true" />
                </button>
              ))}
              <FaUserPlus aria-hidden="true" />
              {userDetails?.data?.role === ACCOUNT_TYPE.ADMIN && (
                <div>
                  {/* Button for moderator */}
                  {user?.isModerator ? (
                    <button
                      onClick={() => {
                        removeModerator(user?.username);
                      }} // Pass username as argument
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Remove Moderator
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        addModerator(user?.username);
                      }}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Add Moderator
                    </button>
                  )}
                </div>
              )}
            </div>

          {/* Profile Info */}
          <div className="flex-grow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-semibold mb-1">{user?.username}</h1>
                <p className="text-gray-600 uppercase">
                  {user?.firstName} {user?.lastName}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {isFollowing ? (
                  <button
                    onClick={unfollowhandler}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
                  >
                    <FaUserMinus />
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={followHandler}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition"
                  >
                    <FaUserPlus />
                    Follow
                  </button>
                )}

                {/* Admin Controls */}
                {userDetails?.data?.role === ACCOUNT_TYPE.ADMIN && (
                  <button
                    onClick={() => user?.isModerator ? removeModerator(user?.username) : addModerator(user?.username)}
                    className={`px-4 py-2 rounded-lg transition ${
                      user?.isModerator 
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    {user?.isModerator ? 'Remove Moderator' : 'Add Moderator'}
                  </button>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mb-4">
              <div className="text-center">
                <span className="block text-xl font-bold">{user?.blogs?.length}</span>
                <span className="text-gray-600">posts</span>
              </div>
              <div className="text-center">
                <span className="block text-xl font-bold">{user?.followers?.length}</span>
                <span className="text-gray-600">followers</span>
              </div>
              <div className="text-center">
                <span className="block text-xl font-bold">{user?.following?.length}</span>
                <span className="text-gray-600">following</span>
              </div>
            </div>

            {/* Bio & Contributions */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <FaCoins className="text-yellow-500" />
                <span>{user?.contributions} contributions</span>
              </div>
              <p className="text-gray-600">{user?.additionalDetails?.about}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </AboutCard>

    {/* Blog Gallery */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {user?.blogs.map((blog) => (
        <Link 
          to={`/blog/getBlogs/${blog._id}`} 
          key={blog._id}
          className="group"
        >
          <AboutCard className="overflow-hidden h-full hover:shadow-lg transition-shadow">
            <div className="relative aspect-video">
              <img 
                src={blog.coverImg} 
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                <h3 className="font-semibold mb-2">{blog.title}</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <FaHeart />
                    <span>{blog.upvotes.length}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaComment />
                    <span>{blog.comments.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </AboutCard>
        </Link>
      ))}
    </div>
  </div>
  );
}

export default UserProfile;
