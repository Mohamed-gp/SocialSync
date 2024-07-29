import { useSelector } from "react-redux";
import CreatePost from "../../createPost/CreatePost";
import Dropzone from "react-dropzone";
import { IRootState } from "../../store/store";
import Posts from "../posts/Posts";
import { useEffect, useState } from "react";
import customAxios from "../../axios/customAxios";

const CenterSideHome = () => {
  const user = useSelector((state: IRootState) => state.auth.user);
  const [posts, setPosts] = useState([]);
  const getAllPosts = async () => {
    try {
      const { data } = await customAxios.get("/posts");
      setPosts(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <div
      className="flex-1 flex flex-col gap-6"
      style={posts?.length == 0 ? { height: "calc(100vh - 250px)" } : {}}
    >
      {user && <CreatePost getAllPosts={getAllPosts} />}
      <Posts posts={posts} />
    </div>
  );
};
export default CenterSideHome;
