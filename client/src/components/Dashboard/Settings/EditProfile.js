import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../../services/operations/settingsAPI";
import IconBtn from "../../common/IconBtn";
import React from "react";
const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

export default function EditProfile() {
  const { user } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);
  //console.log(token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitform = async (data) => {
    console.log(data);
    try {
      dispatch(updateProfile(data, token));
    } catch (error) {
      console.log("error in updating profile");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(submitform)}>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-yellow-100 p-8 px-12 bg-gray-800 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out w-full max-w-[900px] mx-auto">
          <h2 className="text-2xl font-bold text-slate-200">Profile Information</h2>
          {/* first name and last name */}
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 w-full lg:w-[48%]">
              <label htmlFor="firstName" className="text-lg text-slate-400">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className="form-style hover:border-yellow-300 focus:ring-yellow-500 transition-all"
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && <span className="text-xs text-yellow-400">Please enter your first name.</span>}
            </div>
            <div className="flex flex-col gap-2 w-full lg:w-[48%]">
              <label htmlFor="lastName" className="text-lg text-slate-400">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter last name"
                className="form-style hover:border-yellow-300 focus:ring-yellow-500 transition-all"
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName}
              />
              {errors.lastName && <span className="text-xs text-yellow-400">Please enter your last name.</span>}
            </div>
          </div>
          {/* dob and gender */}
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 w-full lg:w-[48%]">
              <label htmlFor="dateOfBirth" className="text-lg text-slate-400">Date of Birth</label>
              <input
                type="date"
                name="DOB"
                id="DOB"
                className="form-style hover:border-yellow-300 focus:ring-yellow-500 transition-all"
                {...register("DOB", { required: true })}
                defaultValue={user?.additionalDetails?.DOB}
              />
              {errors.DOB && <span className="text-xs text-yellow-400">Please enter your Date of Birth.</span>}
            </div>
            <div className="flex flex-col gap-2 w-full lg:w-[48%]">
              <label htmlFor="gender" className="text-lg text-slate-400">Gender</label>
              <select
                name="gender"
                id="gender"
                className="form-style hover:border-yellow-300 focus:ring-yellow-500 transition-all"
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >
                {genders.map((ele, i) => (
                  <option key={i} value={ele}>{ele}</option>
                ))}
              </select>
              {errors.gender && <span className="text-xs text-yellow-400">Please select your gender.</span>}
            </div>
          </div>
          {/* contact no and about */}
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 w-full lg:w-[48%]">
              <label htmlFor="contactNo" className="text-lg text-slate-400">Contact Number</label>
              <input
                type="tel"
                name="contactNo"
                id="contactNo"
                placeholder="Enter Contact Number"
                className="form-style hover:border-yellow-300 focus:ring-yellow-500 transition-all"
                {...register("contactNo", { required: true })}
                defaultValue={user?.additionalDetails?.contactNo}
              />
              {errors.contactNo && <span className="text-xs text-yellow-400">Please enter your Contact Number.</span>}
            </div>
            <div className="flex flex-col gap-2 w-full lg:w-[48%]">
              <label htmlFor="about" className="text-lg text-slate-400">About</label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter Bio Details"
                className="form-style hover:border-yellow-300 focus:ring-yellow-500 transition-all"
                {...register("about", { required: true })}
                defaultValue={user?.additionalDetails?.about}
              />
              {errors.about && <span className="text-xs text-yellow-400">Please enter your About.</span>}
            </div>
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
            text="Save" 
            className="w-full max-w-[150px] cursor-pointer rounded-md bg-blue-600 py-2 text-center font-semibold text-white hover:bg-blue-500 transition-all shadow-md"
          />
        </div>
      </form>
    </>
  );
  
  
  
}
