import LeftSideHome from "../../components/homeComponents/LeftSideHome";
import CenterSideHome from "../../components/homeComponents/CenterSideHome";
import RightSideHome from "../../components/homeComponents/RightSideHome";

const Home = () => {

  return (
    <>
      <div className="container flex justify-center  flex-wrap mt-12 gap-6 ">
        {/* left side */}
        <LeftSideHome />
        {/* center side */}
        <CenterSideHome />
        {/* right side */}
        <RightSideHome />
      </div>
    </>
  );
};
export default Home;
