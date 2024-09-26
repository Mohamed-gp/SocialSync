import { BsPersonFillGear } from "react-icons/bs";
import { FaBriefcase, FaLocationDot } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { Link } from "react-router-dom";

const LeftSideHome = () => {
  const user = useSelector((state: IRootState) => state.auth.user);
  return (
    <div className="xl:flex hidden h-fit min-w-[350px] flex-col rounded-xl bg-white dark:bg-darkThemeBG dark:text-white px-6 py-6 gap-6 ">
      <div className="flex gap-2 items-center relative">
        <img
          src={user?.profileImg}
          alt="avatar"
          className="w-11 h-11 object-cover rounded-full"
        />
        <div className="flex flex-col flex-1">
          <p className="text-sm font-bold">{user?.username}</p>
          <p className=" opacity-80 text-sm">{user?.posts?.length} Posts</p>
        </div>
        <Link to="/settings">
          <BsPersonFillGear
            className={`text-sm mt-1 duration-300 cursor-pointer z-10 `}
          />
        </Link>
      </div>
      <div className="flex flex-col gap-2 border-y-2 py-3">
        <div className="flex gap-4 items-center">
          <FaLocationDot />
          <p>
            {user?.location ? user?.location : "you didn't put your location"}
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
      {/* <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <p className="text-sm">Who's viewed your profile</p>
          <p></p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm">Impression of your post</p>
          <p>12323</p>
        </div>
      </div> */}
    </div>
  );
};
export default LeftSideHome;
