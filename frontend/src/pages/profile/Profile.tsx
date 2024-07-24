import { BsCameraFill, BsPersonFill, BsPersonFillGear } from "react-icons/bs";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { FaBriefcase, FaLocationDot } from "react-icons/fa6";
import CenterSideHome from "../../components/homeComponents/CenterSideHome";
import CreatePost from "../../createPost/CreatePost";
import RightSideHome from "../../components/homeComponents/RightSideHome";

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
              src="../../../public/avatar.jpg"
              alt="avatar"
              className="w-11 h-11 object-cover rounded-full hover:scale-105 duration-150"
            />
          </div>
          <div className="flex flex-col flex-1">
            <p className="text-sm font-bold">Mohamed Outerbah</p>
            <p className=" opacity-80 text-sm">0 Posts</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur aliquid inventore optio quibusdam laboriosam ex
            necessitatibus sint sed, sit animi excepturi repellendus, ea saepe
            eaque cumque distinctio ipsam vitae. Eaque?
          </p>
        </div>
        <div className="flex flex-col gap-2 border-y-2 py-3">
          <div className="flex gap-4 items-center">
            <FaLocationDot />
            <p>New York,CA</p>
          </div>
          <div className="flex gap-4 items-center">
            <FaBriefcase />
            <p>Teacher</p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <p className="text-sm">Who's viewed your profile</p>
            <p>12323</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm">Impression of your post</p>
            <p>12323</p>
          </div>
        </div>
        <RightSideHome />
      </div>
      <CreatePost />
      <div className="flex justify-between items-center">
        <p className="py-6 my-3 text-xl font-bold ">Posts</p>
        {/* profile post */}
        <p>{0}</p>
      </div>
      {user?.posts?.length >= 1 ? (
        // <Posts posts={user?.posts} />
        <div>post</div>
      ) : (
        <p className="mx-auto text-xl font-bold  rounded-lg w-fit text-colorDanger py-2 px-4 ">
          There Is No Posts Found To Review
        </p>
      )}
    </div>
  );
};
export default Profile;
