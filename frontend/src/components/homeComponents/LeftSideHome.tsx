import { BsPersonFillGear } from "react-icons/bs";
import { FaBriefcase, FaLinkedin, FaLocationDot, FaPencil, FaSquareXTwitter } from "react-icons/fa6";

const LeftSideHome = () => {
  return (
    <div className="flex h-fit min-w-[400px] flex-col rounded-xl bg-white px-6 py-6 gap-6 ">
      <div className="flex gap-2 items-center relative">
        <img
          src="../../../public/avatar.jpg"
          alt="avatar"
          className="w-11 h-11 object-cover rounded-full"
        />
        <div className="flex flex-col flex-1">
          <p className="text-sm font-bold">Mohamed Outerbah</p>
          <p className=" opacity-80 text-sm">0 Posts</p>
        </div>
        <BsPersonFillGear
          className={`text-sm mt-1 duration-300 cursor-pointer z-10 `}
        />
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
      
    </div>
  );
};  
export default LeftSideHome;
