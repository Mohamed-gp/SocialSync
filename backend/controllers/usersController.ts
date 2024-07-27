import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import multer from "multer";
import removeFiles from "../utils/fs/fs";
import { verifyUpdateUser } from "../utils/joi/userValidation";
import cloudinary from "../utils/cloudinary/cloudinary";
import nodemailer from "nodemailer";
import { authRequest, ioResponse } from "../interfaces/authInterface";
import { onlineUsers } from "../utils/socket/socket";

const getUserByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ data: null, message: "no user found with this email" });
    }
    user.password = "";
    user.cart = null;
    return res.status(200).json({
      data: user,
      message: "user found",
    });
  } catch (error) {
    next(error);
  }
};

const updateUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, location, occupation, bio } = req.body;
  try {
    const { error } = verifyUpdateUser(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: error.details[0].message, data: null });
    }
    const file = req.file as Express.Multer.File;
    let user = await User.findById(req.params.id).populate({
      path: "posts",
      populate: {
        path: "user",
      },
    });

    if (file) {
      try {
        const picture = file.path;
        const uploadedPicture = await cloudinary.uploader.upload(picture);
        console.log(uploadedPicture);
        const pictureUrl = uploadedPicture.url;
        user.photoUrl = pictureUrl;
        removeFiles();
      } catch (error) {
        next(error);
      }
    }
    if (username != "") {
      user.username = username;
    }
    if (location != "") {
      user.location = location;
    }
    if (bio != "") {
      user.bio = bio;
    }

    await user.save();
    user.password = "";
    return res
      .status(201)
      .json({ message: "user info updated successfull", data: user });
  } catch (error) {
    next(error);
  }
};

const subscribe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "you must login with this email first with our app",
        data: null,
      });
    }

    if (user.isSubscribe) {
      return res
        .status(404)
        .json({ message: "you already subscribed", data: null });
    }
    user.isSubscribe = true;
    await user.save();

    const transporter = nodemailer.createTransport({
      // host: "smtp.ethereal.email",
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS_KEY,
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: process.env.EMAIL, // sender address
      to: email, // list of receivers
      subject: "SwiftBuy Subscription ✔", // Subject line
      text: "you successfully subscribed we gonna email with the latest news of our app", // plain text body
      html: "<b>thanks for joining us</b>", // html body
    });

    return res
      .status(200)
      .json({ data: null, message: "successfully subscribed" });
  } catch (error) {
    next(error);
  }
};

const followUser = async (
  req: authRequest,
  res: ioResponse,
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
  firstUser.following.push(firstUserId);
  secondUser.followers.push(secondUserId);
  await firstUser.save();
  await secondUser.save();
  const isExist = onlineUsers.find((userId) => userId == secondUserId);
  if (isExist) {
    res.io.emit("follow", {
      userId: secondUserId,
      message: "someone followed you now refrech to see who followed you",
    });
  }
  return res
    .status(200)
    .json({ data: null, message: "you followed him successfully" });
};

const reomveUserFollow = async (
  req: authRequest,
  res: ioResponse,
  next: NextFunction
) => {
  const { firstUserId, secondUserId } = req.params;
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
  firstUser.following.filter((userId) => userId != secondUserId);
  secondUser.followers.filter((userId) => userId != firstUser);
  await firstUser.save();
  await secondUser.save();
  return res.status(200).json({
    message: "you unfollowed him successfully",
    data: firstUser.following,
  });
};

export {
  getUserByIdController,
  updateUserData,
  subscribe,
  reomveUserFollow,
  followUser,
};
