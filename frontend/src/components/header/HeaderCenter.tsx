import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import customAxios from "../../axios/customAxios";
import toast from "react-hot-toast";
import { BiSolidMessageAlt } from "react-icons/bi";

export default function HeaderCenter() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const searchHandler = () => {
    try {
      navigate(`/users?search=${search.split(" ").join("+")}`);
      setSearch("");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const [changeHandlerUsers, setChangeHandlerUsers] = useState<any[]>([]);
  const onChangeHandler = async () => {
    try {
      const { data } = await customAxios.get(`/users?search=${search}`);
      setChangeHandlerUsers(data.data.slice(0, 4));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (search != "") {
      onChangeHandler();
    }
  }, [search, location]);

  return (
    <div className="flex gap-2 dark:bg">
      <Link
        to="/"
        className="text-base   sm:text-xl font-bold sm:flex  hidden   items-center gap-1"
      >
        <div className="flex items-center justify-center text-white bg-mainColor p-[6px] dark:bg-mainColor rounded-xl text-lg">
          <BiSolidMessageAlt />
        </div>
      </Link>
      <div className="flex items-center rounded-2xl border-2 border-solid border-[#dddddd] text-base md:text-lg">
        <div className="flex items-center h-full justify-center rounded-l-xl p-2 bg-white">
          <FaMagnifyingGlass />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            searchHandler();
          }}
          className="relative h-full"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[50px] pl-1 relative h-full placeholder:text-[0px] focus:outline-none sm:w-[200px] sm:placeholder:text-sm md:w-[300px]"
            placeholder="Search for People"
          />
          <div
            className="absolute left-0 top-12 flex-col w-full"
            onClick={() => setSearch("")}
          >
            {search != "" && (
              <>
                {changeHandlerUsers.map((user) => (
                  <div className="relative sm:block hidden">
                    <Link
                      to={`/profile/${user?._id}`}
                      className="py-2 flex items-center overflow-hidden z-10 bg-white gap-2 px-4 cursor-pointer hover:bg-mainColor/90 duration-500 "
                    >
                      <div className="img w-12 h-12 flex">
                        <img
                          src={user?.profileImg}
                          alt={user?._id}
                          className="rounded-full w-9 h-9"
                        />
                      </div>
                      <p className="text-sm">{user?.username}</p>
                    </Link>
                    <div
                      className="absolute w-screen h-screen left-0 top-0 -z-[1]"
                      onClick={() => setSearch("")}
                    ></div>
                  </div>
                ))}
              </>
            )}
          </div>
        </form>
        <button
          onClick={() => searchHandler()}
          disabled={search == ""}
          className="bg-mainColor dark:bg-mainColor disabled:cursor-not-allowed disabled:opacity-50 h-full rounded-r-xl px-3 py-2 text-sm text-[white] hover:opacity-90 duration-300"
        >
          Search
        </button>
      </div>
    </div>
  );
}
