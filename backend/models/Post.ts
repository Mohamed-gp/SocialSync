import mongoose from "mongoose";

const schema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
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
},{timestamps : true});
const Post = mongoose.models.post || mongoose.model("post", schema);
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
