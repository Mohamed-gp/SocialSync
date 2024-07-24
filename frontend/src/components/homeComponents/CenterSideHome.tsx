import CreatePost from "../../createPost/CreatePost";
import Post from "../post/Post";
import Dropzone from "react-dropzone";

const CenterSideHome = () => {
  return (
    <div className="flex-1 flex flex-col gap-6">
      <CreatePost />
      <Post />
    </div>
  );
};
export default CenterSideHome;
