import { Link } from "react-router-dom";
import {
  FaCartShopping,
  FaGear,
  FaHeart,
  FaMessage,
  FaPerson,
  FaUser,
  FaX,
} from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FaBars } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import { IRootState } from "../../store/store";
import customAxios from "../../axios/customAxios";
import { authActions } from "../../store/slices/authSlice";
import toast from "react-hot-toast";

export default function HeaderRight() {
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    try {
      const { data } = await customAxios.post("/auth/logout");
      dispatch(authActions.logout(null));
      toast.success(data.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const user: any = useSelector((state: IRootState) => state.auth.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="flex items-center justify-between gap-1 text-sm xl:text-lg ">
      {user && (
        <>
          <Link
            to={`/messages`}
            className="hidden xl:inline-block  px-2 py-1 rounded-xl"
          >
            <FaMessage />
          </Link>
          <Link
            to={`/profile/${user?._id}`}
            className="hidden xl:inline-block  px-2 py-1 rounded-xl"
          >
            <FaUser />
          </Link>
          <Link
            to={`/settings`}
            className="hidden xl:inline-block  px-2 py-1 rounded-xl"
          >
            <FaGear />
          </Link>
        </>
      )}
      {!user && (
        <>
          <Link
            to={`/login`}
            className="hidden xl:inline-block bg-mainColor text-white px-6 py-1 rounded-xl"
          >
            Login
          </Link>
          <Link
            to={`/register`}
            className="hidden xl:inline-block bg-mainColor text-white px-6 py-1 rounded-xl"
          >
            Register
          </Link>
        </>
      )}
      <div className="xl:hidden relative  ">
        {isMenuOpen ? (
          <FaX
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="menu-bar cursor-pointer"
          />
        ) : (
          <FaBars
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="menu-x cursor-pointer"
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
                  >
                    <li>Login</li>
                  </Link>
                  <Link
                    className="px-6 py-1 hover:bg-mainColor duration-300 hover:text-white"
                    to="/register"
                  >
                    <li>Register</li>
                  </Link>
                </>
              )}
              {user && (
                <>
                  <Link
                    className="px-6 py-1 hover:bg-mainColor duration-300 hover:text-white"
                    to="/profile"
                  >
                    <li>Profile</li>
                  </Link>
                  <Link
                    className="px-6 py-1 hover:bg-mainColor duration-300 hover:text-white"
                    to="/messages"
                  >
                    <li>Messages</li>
                  </Link>
                  <div
                    onClick={() => logoutHandler()}
                    className="px-6 py-1 hover:bg-mainColor duration-300 hover:text-white"
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