import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import customAxios from "../../axios/customAxios";
import { MdPersonAddAlt1 } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import toast from "react-hot-toast";
import { authActions } from "../../store/slices/authSlice";
import { FaMessage } from "react-icons/fa6";

const Users = () => {
  const dispatch = useDispatch();
  const [users, setusers] = useState([]);
  const location = useLocation();
  const urlParams = new URLSearchParams(window.location.search);

  const getUsers = async () => {
    try {
      const { data } = await customAxios.get(
        `/users?search=${urlParams.get("search") || ""}`
      );
      setusers(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [location]);
  const { user: userFromStore } = useSelector(
    (state: IRootState) => state.auth
  );
  const navigate = useNavigate();
  const createRoom = async (id: string) => {
    try {
      const { data } = await customAxios.post("/messages/room/create", {
        firstUserId: userFromStore?._id,
        secondUserId: id,
      });
      toast.success(data.message);
      navigate("/messages");
    } catch (error: any) {
      console.log(error);
      if (
        error.response.data.message == "you already have chat with this person"
      ) {
        navigate("/messages");
      }
    }
  };
  const followPersonHandler = async (id: string) => {
    try {
      const { data } = await customAxios.post("/users/follow", {
        firstUserId: userFromStore._id,
        secondUserId: id,
      });
      dispatch(authActions.login(data.data));
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div className="container pt-6 mt-6 ">
      <div className="flex justify-between items-center">
        <p className="pl-3 border-l-mainColor border-l-4 font-bold text-2xl">
          Profiles
        </p>
      </div>
      <div style={{ minHeight: `calc(100vh - 150.94px)` }}>
        {users?.length == 0 ? (
          <div
            className="flex gap-8 flex-wrap justify-center"
            style={{ minHeight: `calc(100vh - 150.94px)` }}
          >
            <div className="container flex flex-col  items-center justify-center py-14">
              <p className="mb-2 text-3xl font-bold text-center">
                There Is No User Match Your Search :(
              </p>
              <p className="opacity-60">Try Searching For Another Person!</p>
            </div>
          </div>
        ) : (
          <div className="flex gap-8 flex-wrap my-12 justify-center">
            {users.map((user: any) => (
              <Link
                to={`/profile/${user?._id}`}
                className="flex gap-2 items-center relative w-full bg-white py-4 cursor-pointer hover:bg-mainColor/90 duration-500   px-4 "
              >
                <img
                  src={user?.profileImg}
                  alt="avatar"
                  className="w-11 h-11 object-cover rounded-full"
                />

                <div className="flex flex-col flex-1">
                  <p className="text-sm font-bold">{user?.username}</p>
                  <p className=" opacity-80">{user?.occupation}</p>
                </div>
                {user._id != user?._id && (
                  <MdPersonAddAlt1
                    className={`text-xl mt-1  duration-300 cursor-pointer z-10 `}
                  />
                )}
                {user?._id == userFromStore?._id && "(this is you)"}
                {!userFromStore && (
                  <Link to={"/login"}>
                    <MdPersonAddAlt1
                      className={`text-xl mt-1 duration-300 cursor-pointer z-10 `}
                    />
                  </Link>
                )}
                {userFromStore?._id != user._id &&
                  !userFromStore?.following?.find(
                    (id) => id._id == user._id
                  ) && (
                    <>
                      <MdPersonAddAlt1
                        onClick={(e) => {
                          e.preventDefault();
                          followPersonHandler(user._id);
                        }}
                        className={`text-xl hover:scale-105 mt-1 duration-300 cursor-pointer z-10 hover:text-white`}
                      />
                      <FaMessage
                        onClick={(e) => {
                          e.preventDefault();
                          createRoom(user._id);
                        }}
                        className={`hover:scale-105 mt-1 duration-300 cursor-pointer z-10 hover:text-white`}
                      />
                    </>
                  )}
                {userFromStore?._id != user._id &&
                  userFromStore?.following?.find(
                    (id) => id._id == user._id
                  ) && (
                    <FaMessage
                      onClick={(e) => {
                        e.preventDefault();
                        createRoom(user._id);
                      }}
                      className={`hover:scale-105 mt-1 duration-300 cursor-pointer z-10 hover:text-white`}
                    />
                  )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
