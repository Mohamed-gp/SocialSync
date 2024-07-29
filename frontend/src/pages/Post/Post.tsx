import { BsShareFill } from "react-icons/bs";
import { FaComment, FaHeart, FaMessage, FaShare } from "react-icons/fa6";
import { MdPersonAddAlt1 } from "react-icons/md";
import { LuGrip } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import PostPhotosModel from "../../components/models/PostPhotosModel";
import customAxios from "../../axios/customAxios";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { authActions } from "../../store/slices/authSlice";

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
    } catch (error: any) {
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
    } catch (error: any) {
      console.log(error);
      if (
        error.response.data.message == "you already have chat with this person"
      ) {
        navigate("/messages");
      }
    }
  };
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
              {!user && (
                <>
                  <Link to={"/login"}>
                    <FaMessage
                      className={`hover:scale-105 mt-1 duration-300 cursor-pointer z-10 hover:text-mainColor`}
                    />
                  </Link>
                  <Link to={"/login"}>
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
