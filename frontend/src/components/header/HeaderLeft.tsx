import { Link } from "react-router-dom";
import { FaBagShopping, FaShop, FaStore } from "react-icons/fa6";
import { BiSolidMessageAlt } from "react-icons/bi";
export default function HeaderLeft() {
  return (
    <Link
      to="/"
      className="text-base xl:min-w-[240px] text-mainColor sm:text-xl font-bold sm:flex  hidden   items-center gap-1"
    >
      {/* <img src="/logo-symbol.png" alt="logo" width={20} height={20}/> */}
      {/* <span className="flex items-center justify-center text-white bg-mainColor p-2  rounded-xl text-lg">
      <FaBagShopping/>  
      </span> */}
      <div className="flex items-center justify-center text-white bg-mainColor p-[6px]  rounded-xl text-lg">
        <BiSolidMessageAlt />
      </div>
      {/* <img src="/socialSyncIcon.png" alt=""  className="w-8"/> */}
      SocialSync
    </Link>
  );
}
