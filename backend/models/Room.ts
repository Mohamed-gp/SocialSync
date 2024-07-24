import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    firstUser: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    secondUser: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    messages: [
      {
        userId: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        message: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.models.room || mongoose.model("room", schema);

export default Room;
