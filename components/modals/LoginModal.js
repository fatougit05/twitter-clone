import { auth } from "@/firebase";
import { closeLoginModal, closeSignupModal, openLoginModal } from "@/redux/modalSlice";
import Modal from "@mui/material/Modal";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function LoginModal() {
  const isOpen = useSelector((state) => state.modals.loginModalOpen);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSignIn(){
    await signInWithEmailAndPassword(auth, email, password )

  }

  async function handleGuestSignIn(){
    await signInWithEmailAndPassword(auth, "guest111100@gmail.com", "123456")

  }



  return (
    <>
      <button
        className="bg-transparent border border-white text-white
        w-[160px] rounded-full h-[40px] hover:bg-[#cbd2d7]
        "
        onClick={() => dispatch(openLoginModal())}
      >
        Log In
      </button>

      <Modal
        open={isOpen}
        onClose={() => dispatch(closeLoginModal())}
        className="flex items-center justify-center"
      >
        <div
          className="w-[90%] h-[600px] bg-black text-white md:w-[560px] md:h-[600px] border border-gray-700 rounded-lg
        flex justify-center
        "
        >
          <div className="w-[90%] mt-8 flex flex-col">
            <h1 className="mt-4 text-4xl font-bold">Sign in to your account</h1>
            <input
              placeholder="Email"
              className="h-10 p-6 mt-8 bg-transparent border border-gray-700 rounded-md"
              type={"email"}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              className="h-10 p-6 mt-8 bg-transparent border border-gray-700 rounded-md"
              type={"password"}
              onChange={e => setPassword(e.target.value)}
            />

            <button
              className="w-full p-2 mt-8 text-lg font-bold text-black bg-white rounded-md "
                onClick={handleSignIn}
            >
              Sign In
            </button>

            <h1 className="mt-8 text-lg font-bold text-center">or</h1>
            <button
              className="w-full p-2 mt-4 text-lg font-bold text-black bg-white rounded-md "
                onClick={handleGuestSignIn}
            >
              Sign In as Guest
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}