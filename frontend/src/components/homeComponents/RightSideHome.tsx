import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { FaX } from "react-icons/fa6";
import customAxios from "../../axios/customAxios";
import toast from "react-hot-toast";
import { authActions } from "../../store/slices/authSlice";

const RightSideHome = () => {
  const user = useSelector((state: IRootState) => state.auth.user);
  const [typeOfRelation, setTypeOfRelation] = useState("followers");
  const dispatch = useDispatch();
  const deleteFollowerHandler = async (id: string) => {
    try {
      const { data } = await customAxios.delete(
        `/users/follower/${user._id}/${id}`
      );
      toast.success(data.message);
      dispatch(authActions.login(data.data));
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const deleteFollowingHandler = async (id: string) => {
    try {
      const { data } = await customAxios.delete(
        `/users/following/${user._id}/${id}`
      );
      toast.success(data.message);
      dispatch(authActions.login(data.data));
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      {user && (
        <div className="flex-col h-fit min-w-[350px] xl:flex hidden   rounded-xl bg-white dark:bg-darkThemeBG dark:text-white px-6 py-6 gap-6 ">
          <div className="flex justify-between text-center">
            <p
              onClick={() => setTypeOfRelation("followers")}
              className={`w-full cursor-pointer ${
                typeOfRelation == "followers" ? "border-black border-b-2" : ""
              } `}
            >
              Followers
            </p>
            <p
              onClick={() => setTypeOfRelation("following")}
              className={`w-full cursor-pointer ${
                typeOfRelation == "following" ? "border-black border-b-2" : ""
              } `}
            >
              Following
            </p>
          </div>
          <div className="flex flex-col max-h-[200px] pr-6 overflow-y-auto">
            {typeOfRelation == "followers" && (
              <>
                {user?.followers?.length == 0 ? (
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
                          <p className="text-sm font-bold">{user?.username}</p>
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
                        {/* {JSON.stringify(user)} */}
                        <div className="flex flex-col flex-1">
                          <p className="text-sm font-bold">{user?.username}</p>
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
      )}
    </>
  );
};
export default RightSideHome;
