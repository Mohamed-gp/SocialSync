import { BsShareFill } from "react-icons/bs";
import { FaComment, FaHeart, FaShare } from "react-icons/fa6";
import { MdPersonAddAlt1 } from "react-icons/md";
import PostPhotosModel from "../models/PostPhotosModel";
import { LuGrip } from "react-icons/lu";
import { useState } from "react";

const Post = () => {
  const [isPostPhotosModelOpen, setIsPostPhotosModelOpen] = useState(false);
  return (
    <div className="flex  flex-col rounded-xl bg-white px-6 py-6 gap-6 min-w-[330px]">
      <div className="flex gap-2 items-center relative ">
        <img
          src="../../../public/avatar.jpg"
          alt="avatar"
          className="w-11 h-11 object-cover rounded-full"
        />
        <div className="flex flex-col flex-1">
          <p className="text-sm font-bold">Mohamed Outerbah</p>
          <p className=" opacity-80">Student</p>
        </div>
        <MdPersonAddAlt1
          className={`text-xl mt-1 duration-300 cursor-pointer z-10 `}
        />
      </div>
      <p>This only a post description</p>
      <div className="img flex flex-col justify-center items-center relative">
        <img
          src="../../../public/imagepost2.jpeg"
          alt="post image"
          className="w-[200px] object-cover"
          // className="w-full"
        />
        <button
          onClick={() => setIsPostPhotosModelOpen(true)}
          className="flex self-end bg-mainColor text-white items-center gap-2 px-4 py-1 my-4 rounded-xl cursor-pointer"
        >
          <LuGrip />
          <p>Show all photos</p>
        </button>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <FaHeart className="cursor-pointer" />
          <FaComment className="cursor-pointer" />
        </div>
        <BsShareFill className="cursor-pointer" />
      </div>

      <PostPhotosModel isPostPhotosModelOpen={isPostPhotosModelOpen}/>
    </div>
  );
};
export default Post;
