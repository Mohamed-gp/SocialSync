import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../fireBase";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/slices/authSlice";
import toast from "react-hot-toast";
import customAxios from "../../axios/customAxios";

const GoogleSignInButton = () => {
  const dispatch = useDispatch();
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const { displayName, email, photoURL } = result.user;
      const { data } = await customAxios.post("/auth/google", {
        username: displayName,
        email,
        photoUrl: photoURL,
      });

      toast.success(data.message);
      dispatch(authActions.login(data.data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      onClick={() => handleGoogleSignIn()}
      className="my-2 flex w-full justify-center gap-2 rounded-xl   border-2 py-2 text-mainColor"
    >
      <img src="/Google.svg" alt="google" width={20} height={20} />
      <p>Continue With Google</p>
    </button>
  );
};
export default GoogleSignInButton;
