import { Link, useNavigate, useParams } from "react-router-dom";
import { FaDoorOpen, FaPersonWalkingArrowRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/slices/authSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { IRootState } from "../../store/store";
import customAxios from "../../axios/customAxios";

const Settings = () => {
  const { user } = useSelector((state: IRootState) => state.auth);
  const dispatch = useDispatch();
  const [data, setData] = useState<any>({
    username: "",
    location: "",
    occupation: "",
    bio: "",
    image: null,
    loading: false,
  });

  const updateUserInfo = async () => {
    setData({ ...data, loading: true });
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("image", data.image);
      formData.append("location", data.location);
      formData.append("occupation", data.occupation);
      formData.append("bio", data.bio);
      const result = await customAxios.post(`/users/${user?._id}`, formData);
      dispatch(authActions.login(result.data.data));
      toast.success(result.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setData({
        username: user.username,
        location: user.location,
        occupation: user.occupation,
        bio: user.bio,
        image: null, // must be user new  image
        loading: false,
      });
    }
  };

  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const { data } = await customAxios.post("/auth/logout");
      dispatch(authActions.logout(null));
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div
        className="container py-16"
        style={{ minHeight: "calc(100vh - 70.94px)" }}
      >
        <div className="my-10 rounded-xl border-2 border-mainColor p-3 dark:bg-darkThemeBG dark:text-white">
          <p className="border-b-2 pb-1 font-bold">Account Settings</p>
          <div className="flex flex-col-reverse items-center justify-between gap-x-32 px-4 py-6 sm:flex-row">
            <div className="flex w-full flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="username">Username: </label>
                <input
                  className="w-full rounded-xl border-2 py-2 pl-3 pr-3 focus:outline-none"
                  id="username"
                  type="text"
                  onChange={(e) =>
                    setData({ ...data, username: e.target.value })
                  }
                  value={data?.username}
                  placeholder={user?.username}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="location">location: </label>
                <input
                  className="w-full rounded-xl dark:text-black border-2 py-2 pl-3 pr-3 focus:outline-none"
                  id="location"
                  type="text"
                  onChange={(e) =>
                    setData({ ...data, location: e.target.value })
                  }
                  value={data?.location}
                  placeholder={user?.location}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="location">Occupation: </label>
                <input
                  className="w-full rounded-xl dark:text-black border-2 py-2 pl-3 pr-3 focus:outline-none"
                  id="location"
                  type="text"
                  onChange={(e) =>
                    setData({ ...data, occupation: e.target.value })
                  }
                  value={data?.occupation}
                  placeholder={user?.occupation}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="location">Bio: </label>
                <textarea
                  className="w-full rounded-xl dark:text-black border-2 py-2 pl-3 pr-3 focus:outline-none"
                  id="location"
                  onChange={(e) => setData({ ...data, bio: e.target.value })}
                  value={data?.bio}
                  placeholder={user?.bio}
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="">
                <img
                  src={
                    data.image
                      ? URL.createObjectURL(data.image)
                      : user.profileImg
                  }
                  alt="avatar"
                  className="w-28 h-28 rounded-full"
                />
              </div>
              {user?._id && (
                <>
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files != null) {
                        setData({ ...data, image: e.target.files[0] as any });
                      }
                    }}
                    id="image-change"
                    className="hidden"
                  />
                  <label
                    htmlFor="image-change"
                    className="w-[142px] cursor-pointer rounded-xl border-2 border-mainColor bg-white px-3 py-1 text-center font-bold text-mainColor"
                  >
                    Chose Image
                  </label>
                </>
              )}
            </div>
          </div>
          <button
            disabled={
              data.username == "" &&
              data.image == null &&
              data.location == "" &&
              data.occupation == "" &&
              data.bio == ""
            }
            onClick={() => updateUserInfo()}
            className="fit-content disabled:opacity-50 mx-auto flex rounded-xl bg-mainColor  px-4 py-2 text-white"
          >
            Save Changes
          </button>
        </div>
        {/* {user?.provider == "credentials" && (
          <div className="my-10 rounded-xl border-2 border-mainColor p-3">
            <p className="border-b-2  pb-1 font-bold">Change Password</p>
            <div className="flex flex-col-reverse items-center justify-between gap-x-32 px-4 py-6 sm:flex-row">
              <div className="flex w-full flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label htmlFor="current-password">Current Password: </label>
                  <input
                    className="w-full rounded-xl border-2 py-2 pl-3 pr-3 focus:outline-none"
                    id="current-password"
                    type="password"
                    placeholder="Password"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="email">New Password:</label>
                  <input
                    className="password-icon w-full rounded-xl border-2 py-2 pl-3 pr-3 focus:outline-none"
                    id="new-password"
                    type="password"
                    placeholder="Your New Password"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="Confirm-new-password">
                    Confirm New Password:
                  </label>
                  <input
                    className="password-icon w-full rounded-xl border-2 py-2 pl-3 pr-3 focus:outline-none"
                    id="confirm-new-password"
                    type="password"
                    placeholder="Your New Password"
                  />
                </div>
              </div>
            </div>
            <button className="fit-content mx-auto flex rounded-xl bg-mainColor  px-4 py-2 text-white">
              Change Password
            </button>
          </div>
        )} */}
        <div className="flex items-center justify-end">
          {user && (
            <button
              onClick={() => logoutHandler()}
              className="flex items-center gap-4 rounded-xl bg-mainColor px-6 py-2    text-white"
            >
              Logout
              <span className="text-2xl">
                <FaPersonWalkingArrowRight />
              </span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};
export default Settings;
