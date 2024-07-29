import { useEffect, useState } from "react";
import RegisterInput from "../../components/auth/RegisterInput";
import { FaX } from "react-icons/fa6";
import GoogleSignInButton from "../../components/auth/GoogleSignInButton";
import { Link, useNavigate } from "react-router-dom";
import customAxios from "../../axios/customAxios";
import { authActions } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    loading: false,
  });
  useEffect(() => {
    scrollTo(0, 0);
  }, []);
  const loginHandler = async () => {
    try {
      setData({ ...data, loading: true });
      const result = await customAxios.post("/auth/login", {
        email: data.email,
        password: data.password,
      });
      dispatch(authActions.login(result.data.data));
      toast.success(result.data.message);
      navigate("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setData({ ...data, loading: false });
    }
  };

  return (
    <div
      className="container rounded-2xl bg-white flex flex-col my-6 py-6 px-6 gap-3"
      style={{ height: "calc(100vh - 160px)" }}
    >
      <p className="text-mainColor font-bold text-center text-2xl">Login</p>
      <p className="text-center">
        Welcome back to SocialSync, The social Media for SocioPaths!
      </p>
      <RegisterInput data={data} name={"email"} setData={setData} />
      <RegisterInput data={data} name={"password"} setData={setData} />
      <GoogleSignInButton />
      <div className="flex-1 flex w-full flex-col justify-end">
        <button
          onClick={() => loginHandler()}
          disabled={data.loading}
          className="bg-mainColor disabled:opacity-50  text-white font-bold py-2 rounded-xl my-2 "
        >
          {data.loading ? "LOADING..." : "SUBMIT"}
        </button>
      </div>
      <p className="text-center">
        Not A Member?{" "}
        <Link to="/register" className="text-mainColor font-bold">
          Register
        </Link>
      </p>
    </div>
  );
};
export default Login;
