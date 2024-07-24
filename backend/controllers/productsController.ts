import cloudinary from "../utils/cloudinary/cloudinary";
import { NextFunction, Request, Response } from "express";
import Post from "../models/Post";
import User from "../models/User";
import multer from "multer";
import removeFiles from "../utils/fs/fs";
import { verifyCreatePost } from "../utils/joi/postValidation";
import { authRequest } from "../interfaces/authInterface";

/**
 *
 * @method GET
 * @route /api/posts
 * @access public
 * @desc get products
 *
 */
const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
  const posts = await Post.find();
  return res.status(200).json({
    message: "fetched Successfully",
    data: posts,
  });
};
/**
 *
 * @method GET
 * @route /api/products/:id
 * @access public
 * @desc get products
 *
 */
const getSinglePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Post.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ data: null, message: "product not found" });
    }

    return res
      .status(200)
      .json({ message: "fetched successfully", data: product });
  } catch (error) {
    next(error);
  }
};

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    removeFiles();
    const { error } = verifyCreatePost(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: error.details[0].message, data: null });
    }
    const files = req.files as Express.Multer.File[];
    if (files.length != 4) {
      return res.status(400).json({
        message: "you must enter 4 images of the product",
        data: null,
      });
    }
    const pictures = files?.map((file) => {
      return file.path;
    });
    const uploadedPictures = await Promise.all(
      pictures.map((picture) => cloudinary.uploader.upload(picture))
    );
    const pictureUrls = uploadedPictures.map((picture) => picture.url);
    const product = await Post.create({
      description: req.body.description,
      images: pictureUrls,
    });
    return res
      .status(201)
      .json({ message: "created successfully", data: product });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Post.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ data: null, message: "no product find with this id" });
    } else {
      await Post.findByIdAndDelete(req.params.id);
      return res
        .status(200)
        .json({ data: null, message: "deleted successfully" });
    }
  } catch (error) {
    next(error);
  }
};

const savePost = async (
  req: authRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId, productId } = req.body;
  try {
    if (userId !== req.user.id) {
      return res.status(403).json({
        data: null,
        message: "Access denied, you must be the user himself",
      });
    }
    let user = await User.findById(userId).populate("wishlist");
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const isExist = user.wishlist.find((ele: any) => productId == ele._id);
    if (isExist) {
      user.wishlist = user.wishlist.filter((ele: any) => ele._id != productId);
    } else {
      user.wishlist.push(productId);
    }
    await user.save();
    user = await User.findById(userId).populate("wishlist");
    return res
      .status(200)
      .json({ message: "wishlist toggled successfull", data: user.wishlist });
  } catch (error) {
    next(error);
  }
};

export { getAllPosts, createPost, getSinglePost, deletePost, savePost };
