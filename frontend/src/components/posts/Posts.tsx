import { useEffect, useState } from "react";
import Post from "../post/Post";
import customAxios from "../../axios/customAxios";

interface PostsProps {
  posts: any;
}

const Posts = ({ posts }: PostsProps) => {
  return (
    <div>
      {posts?.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
};
export default Posts;
