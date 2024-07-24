import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import customAxios from "../../axios/customAxios";
import { Link, useNavigate } from "react-router-dom";

export default function HeaderCenter() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const searchHandler = () => {
    try {
      navigate(`/store?search=${search.split(" ").join("+")}`);
      setSearch("");
    } catch (error) {
      console.log(error);
    }
  };
  const [changeHandlerProducts, setChangeHandlerProduct] = useState([]);
  const onChangeHandler = async () => {
    try {
      const { data } = await customAxios.get(`/products?search=${search}`);
      setChangeHandlerProduct(data.data.slice(0, 4));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (search != "") {
      onChangeHandler();
    }
  }, [search]);

  return (
    <div className="flex items-center rounded-2xl border-2 border-solid border-[#dddddd] text-base md:text-lg">
      <div className="flex items-center justify-center rounded-l-xl p-2">
        <FaMagnifyingGlass />
      </div>
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[50px] pl-1 relative placeholder:text-[0px] focus:outline-none sm:w-[200px] sm:placeholder:text-sm md:w-[300px]"
          placeholder="Search for People"
        />
      </div>
      <button
        onClick={() => searchHandler()}
        disabled={search == ""}
        className="bg-mainColor disabled:opacity-50 h-full rounded-r-xl px-3 py-2 text-sm text-[white] hover:opacity-90 duration-300"
      >
        Search
      </button>
    </div>
  );
}