import { BsPersonFillGear } from "react-icons/bs";
import { MdPersonAddAlt1 } from "react-icons/md";

import {
  FaBriefcase,
  FaImage,
  FaLinkedin,
  FaLocationDot,
  FaPencil,
  FaSquareXTwitter,
} from "react-icons/fa6";

const Home = () => {
  return (
    <>
      <div className="conatiner flex justify-center   mt-12 gap-6 ">
        {/* left side */}
        <div className="flex flex-col rounded-xl bg-white px-6 py-6 gap-6 w-[330px]">
          <div className="flex gap-2 items-center relative">
            <img
              src="../../../public/avatar.jpg"
              alt="avatar"
              className="w-11 h-11 object-cover rounded-full"
            />
            <div className="flex flex-col flex-1">
              <p className="text-sm font-bold">Mohamed Outerbah</p>
              <p className=" opacity-80">5 Friends</p>
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
          <p>Social Profiles</p>
          <div className="flex gap-2 items-center relative">
            <FaSquareXTwitter />
            <div className="flex flex-col flex-1">
              <p className="text-sm font-bold">Twitter</p>
              <p className=" opacity-80 text-sm">Social Network</p>
            </div>
            <FaPencil
              className={`text-sm mt-1  duration-300 cursor-pointer z-10 `}
            />
          </div>
          <div className="flex gap-2 items-center relative">
            <FaLinkedin className="text-xl" />
            <div className="flex flex-col flex-1">
              <p className="text-sm font-bold">Linkedin</p>
              <p className=" opacity-80 text-sm">Network Platform</p>
            </div>
            <FaPencil
              className={`text-sm mt-1  duration-300 cursor-pointer z-10 `}
            />
          </div>
        </div>
        {/* center side */}
        <div className="w-[700px]  flex flex-col gap-6">
          <div className="flex flex-col rounded-xl bg-white px-6 py-6 gap-6 ">
            <div className="flex gap-2 border-b-2 pb-4">
              <div className="img">
                <img
                  src="../../../public/avatar.jpg"
                  alt="avatar"
                  className="w-11 h-11 object-cover rounded-full"
                />
              </div>
              <input
                type="text"
                placeholder="What's on your mind..."
                className="bg-[#efefef] w-full rounded-full pl-6 focus:outline-none"
              />
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-1">
                <FaImage />
                <p>Image</p>
              </div>
              <div className="flex items-center gap-1">
                <FaImage />
                <p>Image</p>
              </div>
              <div className="flex items-center gap-1">
                <FaImage />
                <p>Image</p>
              </div>
              <div className="flex items-center gap-1">
                <FaImage />
                <p>Image</p>
              </div>
              <button className="text-white bg-[#03a9f4] px-3 py-1 rounded-xl">
                Create
              </button>
            </div>
          </div>
          <div className="flex flex-col rounded-xl bg-white px-6 py-6 gap-6 min-w-[330px]">
            <div className="flex gap-2 items-center relative">
              <img
                src="../../../public/avatar.jpg"
                alt="avatar"
                className="w-11 h-11 object-cover rounded-full"
              />
              <div className="flex flex-col flex-1">
                <p className="text-sm font-bold">Mohamed Outerbah</p>
                <p className=" opacity-80">5 Friends</p>
              </div>
              <MdPersonAddAlt1
                className={`text-xl mt-1 duration-300 cursor-pointer z-10 `}
              />
            </div>
            <p>This only a post description</p>
            <div className="img flex justify-center items-center">
              <img
                src="../../../public/imagepost2.jpeg"
                alt="post image"
                className="w-[200px] object-cover"
                // className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
