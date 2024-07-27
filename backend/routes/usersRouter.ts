import { Router } from "express";
import {
  getUserByIdController,
  updateUserData,
  subscribe,
  followUser,
  reomveUserFollow,
} from "../controllers/usersController";
import { verifyToken, verifyUser } from "../middlewares/verifyToken";
import upload from "../utils/multer/multer";

const router = Router();

router.route("/follow").post(followUser)q 
;
router.route("/subscribe").post(subscribe);
router
  .route("/:id")
  .get(getUserByIdController)
  .post(verifyToken, verifyUser, upload.single("image"), updateUserData);
router.route("/follow/:firstUserId/:secondUserId").delete(reomveUserFollow);

export default router;
