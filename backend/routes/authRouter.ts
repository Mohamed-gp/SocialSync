import { Router } from "express";
import { registerController } from "../controllers/authControllers";

const router = Router();


router.route("/register").get(registerController)



export default router