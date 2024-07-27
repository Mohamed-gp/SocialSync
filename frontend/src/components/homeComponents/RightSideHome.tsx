import { useState } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";

const RightSideHome = () => {
  const user = useSelector((state: IRootState) => state.auth.user);
  const [typeOfRelation, setTypeOfRelation] = useState("followers");
  return (
    <>
      {user && (
        <div className="flex-col h-fit min-w-[350px] xl:flex hidden   rounded-xl bg-white px-6 py-6 gap-6 ">
          <div className="flex justify-between text-center">
            <p
              onClick={() => setTypeOfRelation("followers")}
              className={`w-full cursor-pointer ${
                typeOfRelation == "followers" ? "border-black border-b-2" : ""
              } `}
            >
              Followers
            </p>
            <p
              onClick={() => setTypeOfRelation("following")}
              className={`w-full cursor-pointer ${
                typeOfRelation == "following" ? "border-black border-b-2" : ""
              } `}
            >
              Following
            </p>
          </div>
          <div className="flex flex-col">
            {typeOfRelation == "followers" ? (
              user?.followers?.length == 0 ? (
                <p className="text-center">you have no followers</p>
              ) : (
                user?.followers?.map((person: any) => <p>hello</p>)
              )
            ) : user?.followers?.length == 0 ? (
              <p className="text-center">you dont follow any person</p>
            ) : (
              user?.followers?.map((person: any) => <p>hello</p>)
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default RightSideHome;
