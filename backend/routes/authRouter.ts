import { Router } from "express";
import {
  login,
  register,
  googleAuth,
  logout,
} from "../controllers/authControllers";
import upload from "../utils/multer/multer";

const router = Router();

router.route("/register").post(upload.single("image"), register);
router.route("/login").post(login);
router.route("/google").post(googleAuth);
router.route("/logout").post(logout);

export default router;
