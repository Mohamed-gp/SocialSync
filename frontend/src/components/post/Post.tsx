import { BsShareFill } from "react-icons/bs";
import { FaComment, FaHeart, FaMessage } from "react-icons/fa6";
import { MdPersonAddAlt1 } from "react-icons/md";
import PostPhotosModel from "../models/PostPhotosModel";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import customAxios from "../../axios/customAxios";
import { authActions } from "../../store/slices/authSlice";
import CommentsModel from "../commentsModel/CommentsModel";

interface PostProps {
  post: any;
}

const Post = ({ post }: PostProps) => {
  const user = useSelector((state: IRootState) => state.auth.user);
  const [isPostCommentsShow, setIsPostCommentsShow] = useState(false);
  const [postLikes, setPostLikes] = useState(post?.likes);

  const [isPostPhotosModelOpen, setIsPostPhotosModelOpen] = useState(false);
  const copy = () => {
    const input = document.createElement("input");
    input.setAttribute(
      "value",
      (import.meta.env.VITE_ENV == "development"
        ? "http://localhost:5002"
        : "https://socialsync.production-server.tech") +
        "/posts/" +
        post._id
    );

    document.body.appendChild(input);
    input.select();
    const result = document.execCommand("copy");
    document.body.removeChild(input);
    toast.success("share the post link with your friends");
    return result;
  };

  const dispatch = useDispatch();
  const followPersonHandler = async () => {
    try {
      const { data } = await customAxios.post("/users/follow", {
        firstUserId: user?._id,
        secondUserId: post?.user?._id,
      });
      console.log(data.data.following);
      dispatch(authActions.login(data.data));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  const navigate = useNavigate();
  const createRoom = async () => {
    try {
      const { data } = await customAxios.post("/messages/room/create", {
        firstUserId: user?._id,
        secondUserId: post?.user?._id,
      });
      toast.success(data.message);
      navigate("/messages");
    } catch (error) {
      console.log(error);
      if (
        error.response.data.message == "you already have chat with this person"
      ) {
        navigate("/messages");
      }
    }
  };
  const likeHandler = async () => {
    try {
      if (!user) {
        toast.error("you must be logged in to like a post");
        return;
      }
      const { data } = await customAxios.post(`/posts/${post?._id}/like`);
      setPostLikes(data.data);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex  flex-col rounded-xl bg-white dark:text-white dark:bg-darkThemeBG  px-6 my-6 py-6 gap-6 min-w-[330px]">
        <div className="flex gap-2 items-center relative ">
          <Link to={`/profile/${post?.user?._id}`}>
            <img
              src={post?.user?.profileImg}
              alt="avatar"
              className="w-11 h-11 object-cover rounded-full"
            />
          </Link>
          <Link to={`/profile/${post?.user?._id}`} className="flex-1">
            <div className="flex flex-col ">
              <p className="text-sm font-bold">{post?.user?.username}</p>
              <p className=" opacity-80">{post?.user?.occupation}</p>
            </div>
          </Link>

          {post?.user?._id == user?._id && "(this is you)"}
          {!user && (
            <>
              <Link to={"/register"}>
                <FaMessage
                  className={`hover:scale-105 mt-1 duration-300 cursor-pointer z-10 hover:text-mainColor`}
                />
              </Link>
              <Link to={"/register"}>
                <MdPersonAddAlt1
                  className={`text-xl mt-1 duration-300 cursor-pointer z-10 hover:text-mainColor`}
                />
              </Link>
            </>
          )}
          {user &&
            user?._id != post?.user?._id &&
            !user?.following?.find((id) => id?._id == post?.user?._id) && (
              <>
                <MdPersonAddAlt1
                  onClick={(e) => {
                    e.preventDefault();
                    followPersonHandler();
                  }}
                  className={`text-xl hover:scale-105 mt-1 duration-300 cursor-pointer z-10 hover:text-mainColor`}
                />
                <FaMessage
                  onClick={(e) => {
                    e.preventDefault();
                    createRoom();
                  }}
                  className={`hover:scale-105 mt-1 duration-300 cursor-pointer z-10 hover:text-mainColor`}
                />
              </>
            )}
          {user?._id != post?.user?._id &&
            user?.following?.find((id) => id?._id == post?.user?._id) && (
              <FaMessage
                onClick={(e) => {
                  e.preventDefault();
                  createRoom();
                }}
                className={`hover:scale-105 mt-1 duration-300 cursor-pointer z-10 hover:text-mainColor`}
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
        <div className="flex justify-between items-center">
          <div
            onClick={() => likeHandler()}
            className="flex gap-2 items-center justify-center flex-1 duration-300 hover:text-mainColor cursor-pointer"
          >
            <FaHeart
              style={
                postLikes.find((userId: string) => userId == user?._id)
                  ? { color: "#00c2ff" }
                  : {}
              }
            />
            <p>{postLikes?.length}</p>
          </div>
          <div
            onClick={() => setIsPostCommentsShow(true)}
            className="flex gap-2 items-center justify-center flex-1 duration-300 hover:text-mainColor cursor-pointer border-x-2"
          >
            <FaComment />
            <p>{post?.comments?.length}</p>
          </div>
          <div
            className="flex gap-2 items-center flex-1 cursor-pointer justify-center duration-300 hover:text-mainColor"
            onClick={() => copy()}
          >
            <BsShareFill />
          </div>
        </div>

        <PostPhotosModel
          isPostPhotosModelOpen={isPostPhotosModelOpen}
          setIsPostPhotosModelOpen={setIsPostPhotosModelOpen}
          postId={post?._id}
        />
        {isPostCommentsShow && (
          <CommentsModel
            post={post}
            setIsPostCommentsShow={setIsPostCommentsShow}
          />
        )}
      </div>
    </>
  );
};
export default Post;
