import { BsShareFill } from "react-icons/bs";
import { FaComment, FaHeart, FaShare } from "react-icons/fa6";
import { MdPersonAddAlt1 } from "react-icons/md";
import { LuGrip } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import PostPhotosModel from "../../components/models/PostPhotosModel";
import customAxios from "../../axios/customAxios";
import { useParams } from "react-router-dom";

const Post = () => {
  const user = useSelector((state: IRootState) => state.auth.user);
  const [post, setPost] = useState();
  const { id } = useParams();
  const getPostById = async () => {
    try {
      const { data } = await customAxios.get(`/posts/${id}`);
      setPost(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPostById();
  }, []);
  const [isPostPhotosModelOpen, setIsPostPhotosModelOpen] = useState(false);
  return (
    <>
      {post && (
        <div
          className="container"
          style={{ minHeight: "calc(100vh - 70.94px)" }}
        >
          <div className="flex  flex-col rounded-xl bg-white px-6 my-6 py-6 gap-6 min-w-[330px]">
            <div className="flex gap-2 items-center relative ">
              <img
                src={post?.user?.profileImg}
                alt="avatar"
                className="w-11 h-11 object-cover rounded-full"
              />

              <div className="flex flex-col flex-1">
                <p className="text-sm font-bold">{post?.user?.username}</p>
                <p className=" opacity-80">{post?.user?.occupation}</p>
              </div>
              {post.user._id != user?._id && (
                <MdPersonAddAlt1
                  className={`text-xl mt-1 duration-300 cursor-pointer z-10 `}
                />
              )}
            </div>
            <p>{post?.description}</p>
            <div className="img flex flex-col justify-center items-center relative">
              {post?.images?.length != 0 && (
                <img
                  src={post?.images[0]}
                  alt="post image"
                  className="w-[200px] object-cover"
                  // className="w-full"
                />
              )}
              {post?.images.length > 1 && (
                <button
                  onClick={() => setIsPostPhotosModelOpen(true)}
                  className="flex self-end bg-mainColor text-white items-center gap-2 px-4 py-1 my-4 rounded-xl cursor-pointer"
                >
                  Show all photos
                </button>
              )}
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <FaHeart className="cursor-pointer" />
                <FaComment className="cursor-pointer" />
              </div>
              <BsShareFill className="cursor-pointer" />
            </div>

            <PostPhotosModel
              isPostPhotosModelOpen={isPostPhotosModelOpen}
              setIsPostPhotosModelOpen={setIsPostPhotosModelOpen}
              postId={post?._id}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default Post;
