import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaKey } from "react-icons/fa";
import Footer from "../components/common/Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignupData } from "../slices/authSlice";
import toast from "react-hot-toast";
import { sendOtp } from "../services/operations/authAPI";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [passwordType, setPasswordType] = useState({
    password: false,
    confirmPassword: false,
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "firstName") setFirstName(value);
    else if (name === "lastName") setLastName(value);
    else if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "confirmPassword") setconfirmPassword(value);
    else if (name === "username") setUsername(value);
  };

  const handlePasswordToggle = (field) => {
    setPasswordType((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const newUser = { firstName, lastName, email, password, username, confirmPassword };
    dispatch(setSignupData(newUser));
    dispatch(sendOtp(email, navigate));
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setconfirmPassword("");
    setUsername("");
  };

  return (
    <section className="bg-gray-200 min-h-screen flex justify-center items-center">
      <div className="container mx-auto flex">
        <div className="w-1/2 flex justify-center items-center p-8">
          <img
            src="https://img.freepik.com/premium-vector/detective-character-investigation_884500-15711.jpg"
            className="h-auto max-h-full max-w-full rounded-lg shadow-2xl"
            alt="Detective"
          />
        </div>
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-semibold mb-4">Sign up</h2>

          <form onSubmit={handleSignUp} className="mx-4 lg:w-2/2">
            {/* First Name & Last Name */}
            <div className="flex items-center mb-4 gap-1">
              <FaUser className="text-lg me-3" />
              <div className="form-outline flex-grow">
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={handleOnChange}
                  className="form-control form-control px-3 py-2 rounded-3xl border-2 border-black w-full"
                  placeholder="Your First Name"
                />
              </div>
              <div className="form-outline flex-grow">
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={handleOnChange}
                  className="form-control form-control px-3 py-2 rounded-3xl border-2 border-black w-full"
                  placeholder="Your Last Name"
                />
              </div>
            </div>

            {/* Username */}
            <div className="flex items-center mb-4">
              <FaEnvelope className="text-lg me-3" />
              <div className="form-outline flex-grow">
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={handleOnChange}
                  className="form-control px-3 py-2 rounded-3xl border-2 border-black w-full"
                  placeholder="Your Username"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center mb-4">
              <FaEnvelope className="text-lg me-3" />
              <div className="form-outline flex-grow">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleOnChange}
                  className="form-control px-3 py-2 rounded-3xl border-2 border-black w-full"
                  placeholder="Your Email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex items-center mb-4">
              <FaLock className="text-lg me-3" />
              <div className="form-outline flex-grow rounded-3xl border-2 border-black flex bg-white items-center overflow-hidden">
                <input
                  type={passwordType.password ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  className="form-control px-3 py-2 w-full outline-none"
                  placeholder="Password"
                />
                {passwordType.password ? (
                  <IoMdEyeOff
                    onClick={() => handlePasswordToggle("password")}
                    className="cursor-pointer text-2xl mr-6"
                  />
                ) : (
                  <IoMdEye
                    onClick={() => handlePasswordToggle("password")}
                    className="cursor-pointer text-2xl mr-6"
                  />
                )}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex items-center mb-4">
              <FaKey className="text-lg me-3" />
              <div className="form-outline flex-grow rounded-3xl border-2 border-black flex bg-white items-center overflow-hidden">
                <input
                  type={passwordType.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleOnChange}
                  className="form-control px-3 py-2 w-full outline-none"
                  placeholder="Repeat your password"
                />
                {passwordType.confirmPassword ? (
                  <IoMdEyeOff
                    onClick={() => handlePasswordToggle("confirmPassword")}
                    className="cursor-pointer text-2xl mr-6"
                  />
                ) : (
                  <IoMdEye
                    onClick={() => handlePasswordToggle("confirmPassword")}
                    className="cursor-pointer text-2xl mr-6"
                  />
                )}
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="form-check flex justify-center mb-5">
              <input
                type="checkbox"
                className="form-check-input me-2"
                id="form2Example3c"
              />
              <label className="form-check-label" htmlFor="form2Example3c">
                I agree to all statements in <a href="#!">Terms of Service</a>
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mx-4 mb-4">
              <button
                type="submit"
                className="mt-3 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-bold text-richblack-900 hover:bg-blue-500"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default SignUp;
