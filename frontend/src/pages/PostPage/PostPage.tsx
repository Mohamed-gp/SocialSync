import { useEffect, useState } from "react";
import customAxios from "../../axios/customAxios";
import { useParams } from "react-router-dom";
import Post from "../../components/post/Post";

const PostPage = () => {
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

  return (
    // <></>
    <div className="container">
      {post && <Post post={post} key={post._id + "post-page-individual"} />}
    </div>
  );
};
export default PostPage;
