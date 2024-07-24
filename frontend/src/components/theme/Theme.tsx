import { useState } from "react";
import { MdOutlineNightlightRound } from "react-icons/md";
import { MdWbSunny } from "react-icons/md";

const Theme = () => {
  const [isLight, setIsLight] = useState(false);
  return (
    <div onClick={() => setIsLight(prev => !prev)} className="fixed right-4 bottom-4 text-xl text-white bg-mainColor p-3  cursor-pointer rounded-full">
      {isLight ? <MdWbSunny /> : <MdOutlineNightlightRound />}
    </div>
  );
};
export default Theme;
