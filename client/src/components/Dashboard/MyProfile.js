import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../common/IconBtn";
import { RiEditBoxLine } from "react-icons/ri";
import { ACCOUNT_TYPE } from "../../utils/constant";
import { formattedDate } from "../../utils/formattedDate";
import { fetchUserDetails } from "../../services/operations/settingsAPI";
import { setLoading, setUserDetails } from "../../slices/profileSlice";
import { MapPin, Clock, Award, Briefcase, Plus } from 'lucide-react';
import AboutCard from "../../components/UI/AboutCard"
import React from "react";
export default function MyProfile() {
  // const { user, userDetails, loading, error } = useSelector((state) => ({
  //   user: state.profile,
  //   userDetails: state.profile,
  //   loading: state.profile.loading,
  //   error: state.profile.error,
  // }));
  // // const { user } = useSelector((state) => state.profile);

  // const { token } = useSelector((state) => state.auth);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // // ...
  // console.log("token", token);

  // useEffect(() => {
  //   const fetchUserDetailsAsync = async () => {
  //     setLoading(true);

  //     try {
  //       const response = await fetchUserDetails(token);
  //       // Handle the response data here
  //       console.log("response in fetching user details", response);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log("error in fetching user details");
  //       setLoading(false);
  //     }
  //   };

  //   fetchUserDetailsAsync();
  // }, [dispatch, token]);
  const { user, userDetails, loading, error } = useSelector((state) => ({
    user: state?.profile?.userDetails?.data,
    userDetails: state?.profile?.user,
    loading: state.profile.loading,
    error: state.profile.error,
  }));

  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserDetailsAsync = async () => {
      setLoading(true);

      try {
        const response = await fetchUserDetails(token);
        // Update the user's state in Redux
        dispatch(setUserDetails(response)); // Assuming response contains user details
        setLoading(false);
      } catch (error) {
        console.log("error in fetching user details");
        setLoading(false);
      }
    };

    fetchUserDetailsAsync();
  }, [dispatch, token]);

  if (loading) {
    // Return a loading indicator until user details are fetched
    return <div>Loading...</div>;
  }

  console.log("user", user);
  console.log("userDetails", userDetails);

  return (
    <div className="max-w-4xl mx-auto p-6">
    {/* Header Section */}
    <div className="bg-white rounded-lg shadow-sm mb-6">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-medium text-black">My Profile</h1>
          <IconBtn
            text="Edit Profile"
            onclick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        
        <div className="flex items-start gap-6">
          <img
            src={user?.additionalDetails?.profileImg}
            alt={`profile-${user?.firstName}`}
            className="w-24 h-24 rounded-full object-cover"
          />
          
          <div className="flex-1">
            <div className="space-y-2">
              <p className="text-lg font-semibold text-slate-800">
                {user?.firstName + " " + user?.lastName}
              </p>
              <p className="text-sm text-slate-800">{user?.email}</p>
            </div>

            <div className="flex gap-6 mt-4">
              <div className="flex items-center gap-2">
                <h2 className="font-medium">Follower</h2>
                <p>{user?.followers?.length || 0}</p>
              </div>
              <div className="flex items-center gap-2">
                <h2 className="font-medium">Following</h2>
                <p>{user?.following?.length || 0}</p>
              </div>
              <div className="flex items-center gap-2">
                <p>{user?.blogs?.length || 0}</p>
                <h2 className="font-medium">Blogs</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex justify-around border-t border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-400" />
          <div>
            <div className="font-medium">3+ Years</div>
            <div className="text-sm text-gray-500">Experience</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-gray-400" />
          <div>
            <div className="font-medium">5 Certificates</div>
            <div className="text-sm text-gray-500">Achieved</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-gray-400" />
          <div>
            <div className="font-medium">2 Internship</div>
            <div className="text-sm text-gray-500">Completed</div>
          </div>
        </div>
      </div>
    </div>

    {/* About Section */}
    <AboutCard className="p-6 mb-6">
      <div className="flex w-full items-center justify-between mb-4">
        <p className="text-lg font-semibold text-black">About</p>
        <IconBtn
          text="Edit"
          onclick={() => navigate("/dashboard/settings")}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>
      
      <p className={`${userDetails?.about ? "text-slate-600" : "text-slate-500"} text-sm font-medium mb-6`}>
        {userDetails?.about ?? "Write Something About Yourself"}
      </p>

      <div className="grid grid-cols-2 gap-x-8 gap-y-4 max-w-[500px]">
        <div>
          <p className="mb-2 text-sm text-slate-800">First Name</p>
          <p className="text-sm font-medium text-slate-600">{user?.firstName}</p>
        </div>
        <div>
          <p className="mb-2 text-sm text-slate-800">Last Name</p>
          <p className="text-sm font-medium text-slate-600">{user?.lastName}</p>
        </div>
        <div>
          <p className="mb-2 text-sm text-slate-800">Email</p>
          <p className="text-sm font-medium text-slate-600">{user?.username}</p>
        </div>
        <div>
          <p className="mb-2 text-sm text-slate-800">Phone Number</p>
          <p className="text-sm font-medium text-slate-600">
            {userDetails?.contactNo ?? "Add Contact Number"}
          </p>
        </div>
        <div>
          <p className="mb-2 text-sm text-slate-800">Gender</p>
          <p className="text-sm font-medium text-slate-600">
            {userDetails?.gender ?? "Add Gender"}
          </p>
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold text-slate-800">Date Of Birth</p>
          <p className="text-sm font-medium text-slate-600">
            {formattedDate(userDetails?.DOB) ?? "Add Date Of Birth"}
          </p>
        </div>
      </div>
    </AboutCard>
  </div>
  );
}
