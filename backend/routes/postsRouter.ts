import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getSinglePost,
  savePost,
} from "../controllers/productsController";
import { verifyToken, verifyAdmin } from "../middlewares/verifyToken";
import upload from "../utils/multer/multer";
import verifyObjectId from "../middlewares/verifyObjectId";

const router = Router();

router
  .route("/")
  .get(getAllPosts)
  .post(upload.array("images"), verifyToken, createPost);
router.route("/wishlist").post(verifyToken, savePost);
router
  .route("/:id")
  .get(verifyObjectId, getSinglePost)
  .delete(verifyToken, verifyAdmin, deletePost);

export default router;
