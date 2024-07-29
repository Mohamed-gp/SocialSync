import { Router } from "express";
import {
  getAllChats,
  createRoom,
  createMessage,
} from "../controllers/messagesController";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.route("/message/create").post(verifyToken, createMessage);
router.route("/room/create").post(verifyToken, createRoom);
router.route("/:userId").get(verifyToken, getAllChats);

export default router;
