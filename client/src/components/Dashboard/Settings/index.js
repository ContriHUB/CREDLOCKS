import React from "react";
import EditProfile from "./EditProfile";
import DeleteAccount from "./DeleteAccount";
// import UpdatePassword from "../UpdatePassword";
// import DeleteAccount from "./DeleteAccount";
import UpdatePassword from "./UpdatePassword";
const index = () => {
  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <h1 className="mb-14 text-4xl font-bold text-yellow-300 uppercase tracking-wider text-center">
        Edit Profile
      </h1>

      <EditProfile />

      <UpdatePassword />

      <DeleteAccount />
    </div>
  );
  
  
};

export default index;
