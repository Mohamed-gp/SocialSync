import { Request, Response, NextFunction } from "express";
import { authRequest } from "../interfaces/authInterface";
import Post from "../models/Post";
import Comment from "../models/Comment";

const addComment = async (
  req: authRequest,
  res: Response,
  next: NextFunction
) => {
  const { text, userId } = req.body;
  const { postId } = req.params;
  try {
    if (req.user.id != userId) {
      return res
        .status(403)
        .json({ data: null, message: "access denied,only user himself" });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "post not found", data: null });
    }

    const comment = await Comment.create({
      text: text,
      post: postId,
      user: userId,
    });
    if (!post.comments) {
      post.comments = [{ comment: comment?._id, replies: [] }];
    } else {
      post.comments.push({ comment: comment?._id, replies: [] });
    }
    await post.save();
    const comments = await Comment.find({ post: postId }).populate("user");
    comments.map((comment) => {
      comment.user.password = "";
    });
    return res
      .status(200)
      .json({ data: comments, message: "comment created successfull" });
  } catch (error) {
    next(error);
  }
};

const getComments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "product not found", data: null });
    }
    const comments = await Comment.find({ post: postId }).populate("user");
    comments.map((comment) => {
      comment.user.password = "";
    });
    return res
      .status(200)
      .json({ data: comments, message: "comments fetched successfull" });
  } catch (error) {
    next(error);
  }
};
const replyToComment = async (
  req: authRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId, commentId } = req.params;
    const { text } = req.body;
    const post = await Post.findById(postId).populate("user");
    console.log(post);
    if (!post) {
      return res.status(404).json({ message: "post not found", data: null });
    }
    const comment = post.comments.find(
      (comment: any) => comment.comment.toString() == commentId
    );
    console.log(comment);
    const newComment = await Comment.create({
      text: text,
      post: postId,
      user: req.user.id,
    });

    comment.replies.push(newComment._id);
    await post.save();
    console.log(post);
    console.log(comment);
    console.log(comment.replies);
    return res
      .status(200)
      .json({ data: comment, message: "comments fetched successfull" });
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (
  req: authRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { commentId, userId } = req.params;
    if (req.user.id != userId) {
      return res
        .status(403)
        .json({ data: null, message: "access denied,only user himself" });
    }
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "comment doesn't exist" });
    }
    await Comment.findByIdAndDelete(comment._id);
    return res
      .status(200)
      .json({ data: null, message: "comment deleted successfull" });
  } catch (error) {
    next(error);
  }
};

export { addComment, getComments, deleteComment, replyToComment };
