import { Link } from "react-router-dom";
import { FaCartShopping, FaHeart, FaMessage, FaUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useState } from "react";
import { RiAdminFill } from "react-icons/ri";
import { IRootState } from "../../store/store";

export default function HeaderRight() {
  const user: any = useSelector((state: IRootState) => state.auth.user);
  const [isCartEmpty, setisCartEmpty] = useState(false);
  return (
    <div className="flex items-center justify-between gap-3 text-sm md:text-lg ">
      <div className="py-2 pr-3 ">
        <Link
          to={user?._id ? `/wishlist` : "/register"}
          className=" md:text-xl"
        >
          <FaMessage />
        </Link>
      </div>
      {user?.role != "admin" ? (
        <Link to={user ? `/profile` : `/register`} className=" md:text-xl ">
          <FaUser />
        </Link>
      ) : (
        <Link to="/admin/dashboard" className=" md:text-xl ">
          <RiAdminFill />
        </Link>
      )}
      {/* <div className="py-2 pr-3 ">
        <Link
          to={user?._id ? `/wishlist` : "/register"}
          className=" md:text-xl"
        >
          <FaHeart />
        </Link>
      </div> */}
    </div>
  );
}
