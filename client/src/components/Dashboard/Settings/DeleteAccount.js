import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../../../services/operations/settingsAPI";
import ConfirmationModal from "../../common/ConfirmationModal";
import React from "react";
export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleDeleteAccount() {
    try {
      dispatch(deleteAccount(token, navigate));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  }
  const [confirmationModal, setConfirmationModal] = useState(false);

  return (
    <>
      <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-pink-700 bg-pink-800 p-8 px-12 w-full max-w-[900px] mx-auto shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl">
        <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700 transition-transform duration-300 ease-in-out hover:scale-110">
          <FiTrash2 className="text-3xl text-pink-200" />
        </div>
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-semibold text-slate-200">Delete Account</h2>
          <div className="text-slate-300">
            <p>Would you like to delete your account?</p>
            <p className="w-4/5">
              This account may contain Paid Courses. Deleting your account is
              permanent and will remove all the content associated with it.
            </p>
          </div>
          
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure you want to delete your account?",
                text2: "You will not be able to login again.",
                btn1Text: "Delete",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(handleDeleteAccount()),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="w-fit cursor-pointer italic text-pink-300 transition-all duration-300 ease-in-out hover:text-pink-400 hover:underline"
          >
            <div className="flex items-center gap-x-2">
              <span>I want to delete my account.</span>
            </div>
          </button>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
  
}
