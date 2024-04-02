import { useState } from "react";
import {
  FaMagnifyingGlass,
  FaMessage,
  FaMoon,
  FaSun,
  FaCircleInfo,
  FaAngleDown,
} from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";

const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  return (
    <header className="relative bg-white">
      <div
        className="absolute left-0 top-0 w-screen h-screen -z-50"
        onClick={() => setMenuIsOpen(false)}
      ></div>
      <div
        className={`container flex ${
          userAuthenticated ? "justify-between" : "justify-center"
        } py-6`}
      >
        <div
          className={`flex items-center gap-4 w-[191.88px] ${
            !userAuthenticated ? "justify-center" : ""
          }`}
        >
          <h1 className="text-2xl font-bold text-[#03a9f4]">SocialSync</h1>
        </div>
        {userAuthenticated && (
          <div className="md:flex hidden items-center  relative ">
            <input
              type="text"
              placeholder="Search"
              className="pl-4 pr-8 py-1 bg-[#efefef] focus:outline-none w-full rounded-xl "
            />
            <FaMagnifyingGlass className="absolute right-2" />
          </div>
        )}
        <div className="flex items-center  justify-end gap-4 text-xl">
          {/* {true ? (
            <FaMoon className="cursor-pointer" />
          ) : (
            <FaSun className="cursor-pointer" />
          )} */}
          {/* <FaMessage className="cursor-pointer" />
          <IoIosNotifications className="cursor-pointer" />
          <FaCircleInfo className="cursor-pointer" /> */}
          {userAuthenticated && (
            <div className="flex gap-1 items-center relative">
              <img
                src="../../../public/avatar.jpg"
                alt="avatar"
                className="w-11 h-11 object-cover rounded-full"
              />
              <p className="text-sm">Mohamed Outerbah</p>
              <FaAngleDown
                className={`text-sm mt-1 duration-300 cursor-pointer z-10 ${
                  menuIsOpen ? "rotate-180" : ""
                }`}
                onClick={() => setMenuIsOpen((prev) => !prev)}
              />

              <div
                style={{
                  clipPath: `${
                    menuIsOpen
                      ? "polygon(0 0, 100% 0%, 100% 100%, 0 100%)"
                      : "polygon(0 0, 100% 0%, 100% 0, 0 0)"
                  }`,
                }}
                className="flex flex-col absolute top-[60px] left-0 gap-4 duration-300 bg-white border-2 w-full p-2 rounded-xl z-10"
              >
                <div className="flex gap-2 items-center cursor-pointer">
                  <FaMessage className="cursor-pointer text-sm" />
                  <p className="text-sm">Messages</p>
                </div>
                <div className="flex gap-2 items-center cursor-pointer">
                  <IoIosNotifications className="cursor-pointer text-sm" />
                  <p className="text-sm">Notfication</p>
                </div>
                <div className="flex gap-2 items-center cursor-pointer">
                  <FaCircleInfo className="cursor-pointer text-sm" />
                  <p className="text-sm">info</p>
                </div>
                {true ? (
                  <div className="flex gap-2 items-center cursor-pointer">
                    <FaMoon className="cursor-pointer text-sm" />
                    <p className="text-sm">Dark Mode</p>
                  </div>
                ) : (
                  <FaSun className="cursor-pointer" />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
