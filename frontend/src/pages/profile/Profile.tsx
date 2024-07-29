import { BsCameraFill, BsPersonFill, BsPersonFillGear } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FaBriefcase, FaLocationDot, FaMessage, FaX } from "react-icons/fa6";
import CenterSideHome from "../../components/homeComponents/CenterSideHome";
import CreatePost from "../../createPost/CreatePost";
import Post from "../../components/post/Post";
import toast from "react-hot-toast";
import customAxios from "../../axios/customAxios";
import { authActions } from "../../store/slices/authSlice";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState<any>();
  const { user: userFromStore } = useSelector(
    (state: IRootState) => state.auth
  );
  const location = useLocation();
  const getProfileById = async () => {
    try {
      const { data } = await customAxios.get(`/users/${id}`);
      setUser(data.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    getProfileById();
  }, [location]);
  const [typeOfRelation, setTypeOfRelation] = useState("followers");

  const navigate = useNavigate();
  const createRoom = async () => {
    try {
      const { data } = await customAxios.post("/messages/room/create", {
        firstUserId: userFromStore?._id,
        secondUserId: user?._id,
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
  const dispatch = useDispatch();
  const deleteFollowerHandler = async (id: string) => {
    try {
      const { data } = await customAxios.delete(
        `/users/follower/${userFromStore._id}/${id}`
      );
      toast.success(data.message);
      dispatch(authActions.login(data.data));
      getProfileById();
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const deleteFollowingHandler = async (id: string) => {
    try {
      const { data } = await customAxios.delete(
        `/users/following/${userFromStore._id}/${id}`
      );
      toast.success(data.message);
      dispatch(authActions.login(data.data));
      getProfileById();
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      {user ? (
        <div className="container p-6">
          <div className="flex h-fit  flex-col rounded-xl bg-white px-6 py-6 gap-6 mb-6 ">
            <div className="flex flex-col justify-center  text-center gap-2 items-center relative">
              <div className="border-mainColor border-2 rounded-full">
                <img
                  src={user?.profileImg}
                  alt="avatar"
                  className="w-11 h-11 object-cover rounded-full hover:scale-105 duration-150"
                />
              </div>
              <div className="flex flex-col flex-1">
                <p className="text-sm font-bold">{user?.username}</p>
                <p className=" opacity-80 text-sm">
                  {user?.posts?.length} Posts
                </p>
              </div>
              <p>{user?.bio}</p>
            </div>
            <div className="flex justify-between border-y-2 items-center">
              <div className="flex flex-col gap-2  py-3">
                <div className="flex gap-4 items-center">
                  <FaLocationDot />
                  <p>
                    {user?.location
                      ? user?.location
                      : "you didn't put your location"}
                  </p>
                </div>
                <div className="flex gap-4 items-center">
                  <FaBriefcase />
                  <p>
                    {user?.occupation
                      ? user?.occupation
                      : "you didn't put your occupation"}
                  </p>
                </div>
              </div>
              {user && user?._id == userFromStore?._id && (
                <Link to="/settings">
                  <BsPersonFillGear
                    className={`text-sm mt-1 duration-300 cursor-pointer z-10 `}
                  />
                </Link>
              )}
              {user && user?._id != userFromStore?._id && (
                <FaMessage
                  onClick={() => createRoom()}
                  className={`text-sm mt-1 duration-300 cursor-pointer z-10 `}
                />
              )}
              {!user && (
                <Link to="/login">
                  <BsPersonFillGear
                    className={`text-sm mt-1 duration-300 cursor-pointer z-10 `}
                  />
                </Link>
              )}
            </div>

            <div className="flex-col h-fit min-w-[350px] xl:flex hidden   rounded-xl bg-white px-6 py-6 gap-6 ">
              <div className="flex justify-between text-center">
                <p
                  onClick={() => setTypeOfRelation("followers")}
                  className={`w-full cursor-pointer ${
                    typeOfRelation == "followers"
                      ? "border-black border-b-2"
                      : ""
                  } `}
                >
                  Followers
                </p>
                <p
                  onClick={() => setTypeOfRelation("following")}
                  className={`w-full cursor-pointer ${
                    typeOfRelation == "following"
                      ? "border-black border-b-2"
                      : ""
                  } `}
                >
                  Following
                </p>
              </div>
              <div className="flex flex-col max-h-[200px] pr-6 overflow-y-auto">
                {typeOfRelation == "followers" && (
                  <>
                    {user?.followers.length == 0 ? (
                      <p className="text-center">you have no followers</p>
                    ) : (
                      <>
                        {user?.followers?.map((user) => (
                          <div className="flex gap-2 items-center relative my-2 ">
                            <img
                              src={user?.profileImg}
                              alt="avatar"
                              className="w-9 h-9 object-cover rounded-full"
                            />

                            <div className="flex flex-col flex-1">
                              <p className="text-sm font-bold">
                                {user?.username}
                              </p>
                              <p className=" opacity-80">{user?.occupation}</p>
                            </div>

                            <FaX
                              className="text-redColor cursor-pointer"
                              onClick={() => deleteFollowerHandler(user?._id)}
                            />
                          </div>
                        ))}
                      </>
                    )}
                  </>
                )}
                {typeOfRelation == "following" && (
                  <>
                    {user?.following.length == 0 ? (
                      <p className="text-center">you don't follow any person</p>
                    ) : (
                      <>
                        {user?.following?.map((user) => (
                          <div className="flex gap-2 items-center relative my-2">
                            <img
                              src={user?.profileImg}
                              alt="avatar"
                              className="w-9 h-9 object-cover rounded-full"
                            />

                            <div className="flex flex-col flex-1">
                              <p className="text-sm font-bold">
                                {user?.username}
                              </p>
                              <p className=" opacity-80">{user?.occupation}</p>
                            </div>

                            <FaX
                              className="text-redColor cursor-pointer"
                              onClick={() => deleteFollowingHandler(user._id)}
                            />
                          </div>
                        ))}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          {user._id == userFromStore?._id && <CreatePost />}
          <div className="flex justify-between items-center">
            <p className="py-6 my-3 text-xl font-bold ">Posts</p>
            {/* profile post */}
            <p>{user?.posts?.length}</p>
          </div>
          {user?.posts?.length >= 1 ? (
            // <Posts posts={user?.posts} />
            <>
              {user?.posts?.map((post: any) => (
                <Post post={post} />
              ))}
            </>
          ) : (
            <p className="my-6 text-center font-bold">There is Posts Found</p>
          )}
        </div>
      ) : (
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
      )}
    </>
  );
};
export default Profile;
