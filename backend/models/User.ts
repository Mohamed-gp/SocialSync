import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    occupation: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    provider: {
      type: String,
      default: "credentials",
    },
    profileViews: {
      type: Number,
      default: 0,
    },
    profileImg: {
      type: String,
      default:
        "https://i.pinimg.com/736x/09/21/fc/0921fc87aa989330b8d403014bf4f340.jpg",
    },
    isSubscribe: {
      type: String,
      default: false,
    },
    followers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Post",
      },
    ],
    savedPosts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Post",
      },
    ],

    rooms: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Room",
      },
    ],
  },

  {
    timestamps: true,
  }
);

const User = mongoose.models.user || mongoose.model("User", schema);
export default User;
