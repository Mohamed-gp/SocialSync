import { Router } from "express";
import { register } from "../controllers/authControllers";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(register);
router.route("/google").post(register);

export default router;
