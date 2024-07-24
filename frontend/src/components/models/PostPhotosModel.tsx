import { useEffect, useState } from "react";
import customAxios from "../../axios/customAxios";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";

interface PostPhotosModelProps {
  isPostPhotosModelOpen: boolean;
}
const PostPhotosModel = ({ isPostPhotosModelOpen }: PostPhotosModelProps) => {
  const [images, setimages] = useState([]);
  const { id } = useParams();
  const getPostsPhotosById = async () => {
    try {
      const { data } = await customAxios.get(`/posts/${id}/pictures`);
      setimages(data.data);
      // console.log("this is hous");
      // console.log(images);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(params.id)
  useEffect(() => {
    getPostsPhotosById();
  }, []);
  return (
    <>
      {isPostPhotosModelOpen && (
        <div className="container  flex justify-center items-center mt-6  ">
          <Link
            to={`/posts/${id}`}
            className="flex gap-2  left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-12 top-24 absolute  items-center bg-buttonColor rounded-xl text-white px-2 hover:scale-105 duration-300"
          >
            <FaArrowLeftLong className="text-xl cursor-pointer  w-8 h-8 p-2 rounded-lg  " />
            <p className="text-sm">Back To The Property Page</p>
          </Link>
          <div className="flex flex-col gap-5 w-[50%] justify-center items-center mt-12">
            {images.map((image) => (
              <img src={image?.url} alt={image?.url} className="rounded-2xl" />
            ))}
            {/* {house?.Pictures?.map((picture : any) => <img src={picture?.url} alt="" />)} */}
          </div>
        </div>
      )}
    </>
  );
};
export default PostPhotosModel;
