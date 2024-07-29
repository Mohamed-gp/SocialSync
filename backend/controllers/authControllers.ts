import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { verifyLogin, verifyRegister } from "../utils/joi/authValidation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import cloudinary from "../utils/cloudinary/cloudinary";

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const { error } = verifyLogin(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const user = await User.findOne({
      email,
    })
      .populate("following")
      .populate("followers")
      .populate("rooms")
      .populate({
        path: "posts",
        populate: {
          path: "user",
        },
      });
    if (!user) {
      return res.status(404).json({
        data: null,
        message: "user not found",
      });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({
        data: null,
        message: "email or password are incorrect",
      });
    }
    user.password = "";
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1y",
      }
    );
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "None" as "none",
        maxAge: 1000 * 60 * 60 * 24 * 365,
        secure: process.env.NODE_ENV == "developement" ? false : true,
      })
      .status(200)
      .json({ message: "login successfully", data: user });
  } catch (error) {
    next(error);
  }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password, location, occupation } = req.body;
    const { error } = verifyRegister(req.body);
    if (error) {
      return res.status(400).json({ message: error?.details[0].message });
    }
    let user = await User.findOne({
      email: email,
    })
      .populate("rooms")
      .populate("following")
      .populate("followers")
      .populate({
        path: "posts",
        populate: {
          path: "user",
        },
      });

    if (user) {
      return res.status(400).json({ message: "already user with this email" });
    }
    let file = req.file;
    let imgUrl;
    if (file) {
      const filePath = file?.path;
      try {
        const uploadResult = await cloudinary.uploader.upload(filePath);
        imgUrl = uploadResult.url;
      } catch (error) {
        next(error);
      }
    }

    user = await User.create({
      username,
      email,
      password: await bcrypt.hash(password, 10),
      location,
      occupation,
    });
    if (imgUrl) {
      user.profileImg = imgUrl;
    }
    await user.save();
    user.password = "";
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1y" }
    );
    res
      .cookie("token", token, {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        httpOnly: true,
        secure: process.env.NODE_ENV == "developement" ? false : true,
        sameSite: "None" as "none",
      })
      .status(201)
      .json({ data: user, message: "created succefully" });
  } catch (error) {
    next(error);
  }
};

const googleAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, photoUrl } = req.body;
  photoUrl;
  try {
    let user = await User.findOne({ email })
      .populate("following")
      .populate("followers")
      .populate("rooms")
      .populate({
        path: "posts",
        populate: {
          path: "user",
        },
      });

    if (user) {
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1y",
        }
      );
      user.password = "";
      return res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV == "developement" ? false : true,
          maxAge: 1000 * 60 * 60 * 24 * 365,
          sameSite: "None" as "none",
        })
        .status(200)
        .json({ data: user, message: "login successfully" });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      user = await User.create({
        email: email,
        profileImg: photoUrl,
        username,
        password: await bcrypt.hash(generatedPassword, 10),
        provider: "google",
      });

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1y",
        }
      );
      user.password = "";
      return res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV == "developement" ? false : true,
          maxAge: 1000 * 60 * 60 * 24 * 365,
          sameSite: "None" as "none",
        })
        .status(200)
        .json({ data: user, message: "login successfully" });
    }
  } catch (error) {
    next(error);
  }
};

const logout = (req: Request, res: Response, next: NextFunction) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ data: null, message: "logout successfully" });
};

export { login, register, googleAuth, logout };
