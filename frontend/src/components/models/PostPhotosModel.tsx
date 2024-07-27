import { useEffect, useState } from "react";
import customAxios from "../../axios/customAxios";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowLeftLong, FaX } from "react-icons/fa6";
import toast from "react-hot-toast";

interface PostPhotosModelProps {
  isPostPhotosModelOpen: boolean;
  setIsPostPhotosModelOpen: any;
  postId: string;
}
const PostPhotosModel = ({
  isPostPhotosModelOpen,
  setIsPostPhotosModelOpen,
  postId,
}: PostPhotosModelProps) => {
  const [images, setimages] = useState([]);

  const getPostsPhotosById = async () => {
    try {
      const { data } = await customAxios.get(`/posts/${postId}/pictures`);
      setimages(data.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    getPostsPhotosById();
  }, []);
  return (
    <>
      {isPostPhotosModelOpen && (
        <div
          className="fixed w-screen h-screen left-0 top-0 z-10"
          onClick={() => setIsPostPhotosModelOpen(false)}
        >
          <div
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
            className="w-[50vw] p-6  left-[25vw] flex flex-col top-[15vh] z-20 h-[70vh] overflow-auto rounded-2xl container fixed  bg-white  mt-6  "
          >
            <FaX
              onClick={() => setIsPostPhotosModelOpen(false)}
              className="text-redColor  absolute top-6 right-6 cursor-pointer"
            />
            <div className="flex flex-col gap-5 justify-center items-center mt-12">
              {images.map((image) => (
                <img src={image} alt={image} className="rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default PostPhotosModel;
