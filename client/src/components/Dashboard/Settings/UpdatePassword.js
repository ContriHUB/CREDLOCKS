import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { changePassword } from "../../../services/operations/settingsAPI";
import IconBtn from "../../common/IconBtn";

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitPasswordForm = async (data) => {
    console.log("password Data - ", data);
    try {
      await changePassword(token, data);
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitPasswordForm)}>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-yellow-100 p-8 px-12 bg-gray-800 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out w-full max-w-[900px] mx-auto">
          <h2 className="text-2xl font-bold text-slate-200">Change Password</h2>
          
          {/* Old Password */}
          <div className="relative flex flex-col gap-2 w-full">
            <label htmlFor="oldPassword" className="text-lg text-slate-400">Old Password</label>
            <input
              type={showOldPassword ? "text" : "password"}
              name="oldPassword"
              id="oldPassword"
              placeholder="Enter Current Password"
              className="form-style hover:border-yellow-300 focus:ring-yellow-500 transition-all"
              {...register("oldPassword", { required: true })}
            />
            <span
              onClick={() => setShowOldPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showOldPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
            {errors.oldPassword && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your Current Password.
              </span>
            )}
          </div>
  
          {/* New Password */}
          <div className="relative flex flex-col gap-2 w-full">
            <label htmlFor="newPassword" className="text-lg text-slate-400">New Password</label>
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              id="newPassword"
              placeholder="Enter New Password"
              className="form-style hover:border-yellow-300 focus:ring-yellow-500 transition-all"
              {...register("newPassword", { required: true })}
            />
            <span
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showNewPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
            {errors.newPassword && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your New Password.
              </span>
            )}
          </div>
  
          {/* Confirm New Password */}
          <div className="relative flex flex-col gap-2 w-full">
            <label htmlFor="confirmNewPassword" className="text-lg text-slate-400">Confirm New Password</label>
            <input
              type={showConfirmNewPassword ? "text" : "password"}
              name="confirmNewPassword"
              id="confirmNewPassword"
              placeholder="Confirm New Password"
              className="form-style hover:border-yellow-300 focus:ring-yellow-500 transition-all"
              {...register("confirmNewPassword", { required: true })}
            />
            <span
              onClick={() => setShowConfirmNewPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmNewPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
            {errors.confirmNewPassword && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please confirm your New Password.
              </span>
            )}
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-4 w-full max-w-[900px] mx-auto">
          <button
            onClick={() => { navigate("/dashboard/my-profile"); }}
            className="w-full max-w-[150px] cursor-pointer rounded-md bg-slate-600 py-2 text-center font-semibold text-white hover:bg-slate-500 transition-all shadow-md"
          >
            Cancel
          </button>
          <IconBtn 
            type="submit" 
            text="Update" 
            className="w-full max-w-[150px] cursor-pointer rounded-md bg-blue-600 py-2 text-center font-semibold text-white hover:bg-blue-500 transition-all shadow-md"
          />
        </div>
      </form>
    </>
  );
  
  
  
  
  
}
