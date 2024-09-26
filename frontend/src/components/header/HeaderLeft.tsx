import { Link } from "react-router-dom";
import { BiSolidMessageAlt } from "react-icons/bi";
export default function HeaderLeft() {
  return (
    <Link
      to="/"
      className="text-base xl:min-w-[240px] text-mainColor dark:bg-slate-800 sm:text-xl font-bold sm:flex  hidden   items-center gap-1"
    >
      <div className="flex items-center justify-center text-white bg-mainColor p-[6px]  rounded-xl text-lg">
        <BiSolidMessageAlt />
      </div>
      SocialSync
    </Link>
  );
}
