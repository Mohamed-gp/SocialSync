import LeftSideHome from "../../components/homeComponents/LeftSideHome";
import CenterSideHome from "../../components/homeComponents/CenterSideHome";
import RightSideHome from "../../components/homeComponents/RightSideHome";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";

const Home = () => {
  const user = useSelector((state: IRootState) => state.auth.user);
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
