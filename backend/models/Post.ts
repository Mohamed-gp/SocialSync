import mongoose, { mongo } from "mongoose";

const schema = new mongoose.Schema(
  {
    description: {
      type: String,
    },
    images: {
      type: [String],
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    comments: [
      {
        comment: { type: mongoose.Types.ObjectId, ref: "Comment" },
        replies: [
          {
            type: mongoose.Types.ObjectId,
            ref: "Comment",
          },
        ],
      },
    ],
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);
const Post = mongoose.models.post || mongoose.model("Post", schema);
export default Post;

// import mongoose from "mongoose";

// const repliesSchema = new mongoose.Schema({
//   reply: { type: mongoose.Types.ObjectId, ref: "Comment" },
// });

// const commentSchema = new mongoose.Schema({
//   comment: { type: mongoose.Types.ObjectId, ref: "Comment" },
//   replies: [repliesSchema],
// });

// const schema = new mongoose.Schema({
//   description: {
//     type: String,
//     required: true,
//   },
//   images: {
//     type: [String],
//     required: true,
//   },
//   comments: [commentSchema],
//   likes: [
//     {
//       type: mongoose.Types.ObjectId,
//       ref: "User",
//     },
//   ],
// });
