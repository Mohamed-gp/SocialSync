import { Link, useNavigate } from "react-router-dom";
import { FaGear, FaMessage, FaUser, FaX } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa6";
import { IRootState } from "../../store/store";
import customAxios from "../../axios/customAxios";
import { authActions } from "../../store/slices/authSlice";
import toast from "react-hot-toast";
import { TbLogout } from "react-icons/tb";
import { io } from "socket.io-client";

export default function HeaderRight() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const { data } = await customAxios.post("/auth/logout");
      dispatch(authActions.logout(null));
      navigate("/");
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const { user } = useSelector((state: IRootState) => state.auth);
  useEffect(() => {
    if (user?._id) {
      const socket = io(
        import.meta.env.VITE_ENV == "development"
          ? "http://localhost:3002"
          : "https://socialsync1.production-server.tech",
        {
          auth: { userId: user._id },
        }
      );

      return () => {
        socket.disconnect();
      };
    }
  }, []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="flex items-center justify-between gap-2 text-sm xl:text-lg ">
      {user && (
        <>
          <Link
            to={`/messages`}
            className="hidden xl:inline-block dark:text-white  px-2 py-1 rounded-xl "
          >
            <FaMessage className="hover:scale-110 duration-200" />
          </Link>
          <Link
            to={`/profile/${user?._id}`}
            className="hidden xl:inline-block dark:text-white  px-2 py-1 rounded-xl"
          >
            <FaUser className="hover:scale-110 duration-200" />
          </Link>
          <Link
            to={`/settings`}
            className="hidden xl:inline-block dark:text-white px-2 py-1 rounded-xl gear-container"
          >
            <FaGear className="hover:scale-110 duration-200" />
          </Link>

          <TbLogout
            onClick={() => logoutHandler()}
            className="hidden xl:inline-block  text-xl dark:text-white  rounded-xl cursor-pointer hover:scale-110 duration-200"
          />
        </>
      )}
      {!user && (
        <>
          <Link
            to={`/login`}
            className="hidden  duration-300 xl:inline-block hover:scale-105 bg-mainColor dark:bg-mainColor text-white px-6 py-1 rounded-xl"
          >
            Login
          </Link>
          <Link
            to={`/register`}
            className="hidden xl:inline-block hover:scale-105 bg-mainColor dark:bg-mainColor duration-300 text-white px-6 py-1 rounded-xl"
          >
            Register
          </Link>
        </>
      )}
      <div className="xl:hidden relative  ">
        {isMenuOpen ? (
          <FaX
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="menu-bar cursor-pointer dark:text-white  relative z-50"
          />
        ) : (
          <FaBars
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="menu-x cursor-pointer dark:text-white relative z-50"
          />
        )}
        {isMenuOpen && (
          <nav>
            <ul
              className="absolute z-[3] p-2 right-0 bg-white flex flex-col gap-2 top-[55px] w-[200px] text-center "
              style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
            >
              {!user && (
                <>
                  <Link
                    className="px-6 py-1 hover:bg-mainColor duration-300 hover:text-white"
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <li>Login</li>
                  </Link>
                  <Link
                    className="px-6 py-1 hover:bg-mainColor duration-300 hover:text-white"
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <li>Register</li>
                  </Link>
                </>
              )}
              {user && (
                <>
                  <Link
                    className="px-6 py-1 hover:bg-mainColor duration-300 hover:text-white"
                    to={`/profile/${user?._id}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <li>Profile</li>
                  </Link>
                  <Link
                    className="px-6 py-1 hover:bg-mainColor duration-300 hover:text-white"
                    to="/messages"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <li>Messages</li>
                  </Link>
                  <Link
                    className="px-6 py-1 hover:bg-mainColor duration-300 hover:text-white"
                    to="/settings"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <li>Settings</li>
                  </Link>
                  <div
                    onClick={() => {
                      logoutHandler();
                      setIsMenuOpen(false); 
                    }}
                    className="px-6 py-1 cursor-pointer hover:bg-mainColor duration-300 hover:text-white"
                  >
                    <li>Logout</li>
                  </div>
                </>
              )}
            </ul>
            <div
              className="z-[2] h-full w-full fixed left-0 top-0 bg-transparent"
              onClick={() => setIsMenuOpen(false)}
            ></div>
          </nav>
        )}
      </div>
    </div>
  );
}
