import { Router } from "express";
import { getAllChats } from "../controllers/messagesController";

const router = Router();

router.route("/userId").get(getAllChats);

export default router;
