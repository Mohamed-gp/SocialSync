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
    const user = await User.findById(id)
      .populate("following")
      .populate("followers")
      .populate({
        path: "posts",
        populate: {
          path: "user",
        },
      });
    if (!user) {
      return res
        .status(404)
        .json({ data: null, message: "no user found with this email" });
    }
    user.password = "";
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
  console.log(occupation);
  try {
    const { error } = verifyUpdateUser(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: error.details[0].message, data: null });
    }
    const file = req.file as Express.Multer.File;
    let user = await User.findById(req.params.id)
      .populate("following")
      .populate("followers")
      .populate({
        path: "posts",
        populate: {
          path: "user",
        },
      });

    if (file) {
      try {
        const picture = file.path;
        const uploadedPicture = await cloudinary.uploader.upload(picture);
        const pictureUrl = uploadedPicture.url;
        user.profileImg = pictureUrl;
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
    if (occupation != "") {
      user.occupation = occupation;
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
  try {
    const { firstUserId, secondUserId } = req.body;

    // Validate request body
    if (!firstUserId || firstUserId !== req.user.id) {
      return res.status(403).json({ data: null, message: "only user himself" });
    }
    if (!secondUserId) {
      return res
        .status(400)
        .json({ data: null, message: "something went wrong" });
    }

    // Fetch users from database
    const firstUser = await User.findById(firstUserId).populate("following");

    const secondUser = await User.findById(secondUserId).populate("following");

    // Validate users
    if (!firstUser) {
      return res
        .status(404)
        .json({ message: "you didn't provide a valid id of yours" });
    }
    if (!secondUser) {
      return res.status(404).json({
        message: "you didn't provide a valid id of your partner chat",
      });
    }

    // Check if already following
    const alreadyFollow = firstUser?.following?.find((user: any) => {
      return user._id == secondUserId;
    });
    if (alreadyFollow) {
      return res
        .status(400)
        .json({ message: "you already follow this guy", data: null });
    }

    // Update following and followers
    firstUser.following.push(secondUser); // Push secondUserId to firstUser's following
    secondUser.followers.push(firstUser); // Push firstUserId to secondUser's followers

    await firstUser.save();
    await secondUser.save();

    // Emit follow event if secondUser is online
    const isExist = onlineUsers.find((userId: any) => {
      return userId.toString() === secondUserId.toString();
    });
    if (isExist) {
      res.io.emit("follow", {
        userId: secondUserId,
        message: "someone followed you now refresh to see who followed you",
      });
    }
    firstUser.password = "";
    return res
      .status(200)
      .json({ data: firstUser, message: "you followed him successfully" });
  } catch (error) {
    console.error(error);
    next(error); // Pass error to the next middleware
  }
};

const removeUserFollowing = async (
  req: authRequest,
  res: ioResponse,
  next: NextFunction
) => {
  try {
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

    let firstUser = await User.findById(firstUserId)
      .populate("rooms")
      .populate("following")
      .populate("followers")
      .populate({
        path: "posts",
        populate: {
          path: "user",
        },
      });

    let secondUser = await User.findById(secondUserId);
    if (!firstUser) {
      return res
        .status(404)
        .json({ message: "you didn't provide a valide id of yours" });
    }
    if (!secondUser) {
      return res.status(404).json({
        message: "you didn't provide a valide id of your partner chat",
      });
    }
    firstUser.following = firstUser.following.filter(
      (userId: any) => userId._id != secondUserId
    );
    secondUser.followers = secondUser.followers.filter(
      (userId: any) => userId._id != firstUser
    );
    await firstUser.save();
    await secondUser.save();
    firstUser.password = "";
    return res.status(200).json({
      message: "you unfollowed him successfully",
      data: firstUser,
    });
  } catch (error) {
    next(error);
  }
};
const removeUserFollower = async (
  req: authRequest,
  res: ioResponse,
  next: NextFunction
) => {
  try {
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

    let firstUser = await User.findById(firstUserId)
      .populate("rooms")
      .populate("following")
      .populate("followers")
      .populate({
        path: "posts",
        populate: {
          path: "user",
        },
      });

    let secondUser = await User.findById(secondUserId);
    if (!firstUser) {
      return res
        .status(404)
        .json({ message: "you didn't provide a valide id of yours" });
    }
    if (!secondUser) {
      return res.status(404).json({
        message: "you didn't provide a valide id of your partner chat",
      });
    }
    firstUser.followers = firstUser.followers.filter(
      (userId: any) => userId._id != secondUserId
    );
    secondUser.following = secondUser.following.filter(
      (userId: any) => userId._id != firstUser
    );
    await firstUser.save();
    await secondUser.save();
    firstUser.password = "";
    return res.status(200).json({
      message: "you unfollowed him successfully",
      data: firstUser,
    });
  } catch (error) {
    next(error);
  }
};

const searchUser = async (
  req: authRequest,
  res: ioResponse,
  next: NextFunction
) => {
  try {
    const { search } = req.query;
    if (!search && search != "") {
      return res
        .status(404)
        .json({ message: "you must enter the information of users" });
    }
    const users = await User.find({
      username: { $regex: search, $options: "i" },
    });
    users.forEach((user) => {
      user.password = "";
    });
    return res.status(200).json({
      message: "fetched Successfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};
export {
  getUserByIdController,
  updateUserData,
  subscribe,
  removeUserFollowing,
  followUser,
  searchUser,
  removeUserFollower,
};
