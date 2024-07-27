import { NextFunction, Request, Response } from "express";
import { authRequest } from "../interfaces/authInterface";
import Room from "../models/Room";
import User from "../models/User";
import { onlineUsers } from "../utils/socket/socket";
import { ioResponse } from "../interfaces/authInterface";

const getAllChats = async (
  req: authRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.body;
  if (!userId || userId != req.user.id) {
    return res.status(403).json({ data: null, message: "only user himself" });
  }

  const rooms = await Room.find({ firstUser: userId });

  return res.status(200).json({ data: rooms, message: "fetched successfully" });
};
const createRoom = async (
  req: authRequest,
  res: Response,
  next: NextFunction
) => {
  const { firstUserId, secondUserId } = req.body;
  if (!firstUserId || firstUserId != req.user.id) {
    return res.status(403).json({ data: null, message: "only user himself" });
  }
  if (!secondUserId) {
    return res.status(400).json({
      data: null,
      message: "something went wrong",
    });
  }
  const firstUser = await User.findById(firstUserId);
  const secondUser = await User.findById(secondUserId);
  if (!firstUser) {
    return res
      .status(404)
      .json({ message: "you didn't provide a valide id of yours" });
  }
  if (!secondUser) {
    return res
      .status(404)
      .json({ message: "you didn't provide a valide id of your partner chat" });
  }

  let room = await Room.find({
    firstUser: firstUserId,
    secondUser: secondUserId,
  });

  if (room) {
    return res
      .status(400)
      .json({ data: null, message: "you already have chat with this person" });
  }
  room = await Room.create({
    firstUser: firstUserId,
    secondUser: secondUserId,
  });
  //@ts-ignore
  firstUser.rooms.push(room._id as string);
  //@ts-ignore
  secondUser.rooms.push(room._id as string);
  await firstUser.save();
  await secondUser.save();
  return res
    .status(200)
    .json({ data: room, message: "room created successfully" });
};

const createMessage = async (
  req: authRequest,
  res: ioResponse,
  next: NextFunction
) => {
  const { firstUserId, secondUserId, text } = req.body;
  if (!firstUserId || firstUserId != req.user.id) {
    return res.status(403).json({ data: null, message: "only user himself" });
  }
  if (!secondUserId) {
    return res.status(400).json({
      data: null,
      message: "something went wrong",
    });
  }
  if (!text) {
    return res
      .status(400)
      .json({ message: "you must enter a text", data: null });
  }
  const firstUser = await User.findById(firstUserId);
  const secondUser = await User.findById(secondUserId);
  if (!firstUser) {
    return res
      .status(404)
      .json({ message: "you didn't provide a valide id of yours" });
  }
  if (!secondUser) {
    return res
      .status(404)
      .json({ message: "you didn't provide a valide id of your partner chat" });
  }

  const room = await Room.findOne({
    firstUser: firstUserId,
    secondUser: secondUserId,
  });
  if (!room) {
    return res.status(400).json({ message: "you must create room first" });
  }
  //@ts-ignore
  room.messages.push({
    userId: firstUserId,
    message: text,
  });

  await room.save();
  const isExist = onlineUsers.find((userId) => userId == secondUserId);
  if (isExist) {
    res.io.emit("message", { id: secondUserId, message: text });
  }
  return res.status(200).json({
    message: "message created successfully",
    data: null,
  });
};

export { getAllChats, createRoom, createMessage };
