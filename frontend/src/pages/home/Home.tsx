import LeftSideHome from "../../components/homeComponents/LeftSideHome";
import CenterSideHome from "../../components/homeComponents/CenterSideHome";
import RightSideHome from "../../components/homeComponents/RightSideHome";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { useEffect } from "react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

const Home = () => {
  const user = useSelector((state: IRootState) => state.auth.user);
  useEffect(() => {
    if (user?._id) {
      const socket = io("http://localhost:3000/", {
        query: { userId: user?._id },
      });

      socket.on("follow", (msg) => {
        if (msg?.userId == user?._id) {
          toast(msg.message, {
            icon: "👏",
          });
        }
      });
      return () => {
        socket.disconnect();
      };
    }
  }, []);
  return (
    <>
      <div className="container flex justify-center  flex-wrap mt-12 gap-6 ">
        {/* left side */}
        {user && <LeftSideHome />}
        {/* center side */}
        <CenterSideHome />
        {/* right side */}
        {user && <RightSideHome />}
      </div>
    </>
  );
};
export default Home;
