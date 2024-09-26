import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getSinglePost,
  savePost,
  getPostPictures,
  renewPostComments,
  togglePostLike,
} from "../controllers/postsController";
import { verifyToken, verifyAdmin } from "../middlewares/verifyToken";
import upload from "../utils/multer/multer";
import verifyObjectId from "../middlewares/verifyObjectId";

const router = Router();

router
  .route("/")
  .get(getAllPosts)
  .post(upload.array("images"), verifyToken, createPost);
router.route("/:id/pictures").get(getPostPictures);
router.route("/wishlist").post(verifyToken, savePost);
router.route("/:postId/like").post(verifyToken, togglePostLike);
router.route("/comments/:postId").get(verifyToken, renewPostComments);

router
  .route("/:id")
  .get(verifyObjectId, getSinglePost)
  .delete(verifyToken, verifyAdmin, deletePost);

export default router;
