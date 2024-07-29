import { Router } from "express";
import {
  getUserByIdController,
  updateUserData,
  subscribe,
  followUser,
  removeUserFollowing,
  searchUser,
  removeUserFollower,
} from "../controllers/usersController";
import { verifyToken, verifyUser } from "../middlewares/verifyToken";
import upload from "../utils/multer/multer";

const router = Router();

router.route("/").get(searchUser);
router.route("/follow").post(verifyToken, followUser);
router.route("/subscribe").post(subscribe);
router
  .route("/:id")
  .get(getUserByIdController)
  .post(verifyToken, verifyUser, upload.single("image"), updateUserData);
router
  .route("/following/:firstUserId/:secondUserId")
  .delete(verifyToken, removeUserFollowing);
router
  .route("/follower/:firstUserId/:secondUserId")
  .delete(verifyToken, removeUserFollower);

export default router;
