import Post from "../post/Post";

interface PostsProps {
  posts: any;
}

const Posts = ({ posts }: PostsProps) => {
  return (
    <div>
      {posts?.map((post) => (
        <Post post={post} key={post._id + "posts-individual"} />
      ))}
    </div>
  );
};
export default Posts;
