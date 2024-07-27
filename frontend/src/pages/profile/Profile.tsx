import { BsCameraFill, BsPersonFill, BsPersonFillGear } from "react-icons/bs";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaBriefcase, FaLocationDot } from "react-icons/fa6";
import CenterSideHome from "../../components/homeComponents/CenterSideHome";
import CreatePost from "../../createPost/CreatePost";
import RightSideHome from "../../components/homeComponents/RightSideHome";
import Post from "../../components/post/Post";

const Profile = () => {
  const { id } = useParams();
  const user = useSelector((state: IRootState) => state.auth.user);
  const [file, setFile] = useState(null);
  return (
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
            <p className=" opacity-80 text-sm">{user?.posts?.length} Posts</p>
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
          <Link to="/settings">
            <BsPersonFillGear
              className={`text-sm mt-1 duration-300 cursor-pointer z-10 `}
            />
          </Link>
        </div>
        {/* <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <p className="text-sm">Who's viewed your profile</p>
            <p>12323</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm">Impression of your post</p>
            <p>12323</p>
          </div>
        </div> */}
        <RightSideHome />
      </div>
      <CreatePost />
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
        <p>there is np p</p>
      )}
    </div>
  );
};
export default Profile;
