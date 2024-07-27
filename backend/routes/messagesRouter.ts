import { Router } from "express";
import {
  getAllChats,
  createRoom,
  createMessage,
} from "../controllers/messagesController";

const router = Router();

router.route("/message/create").post(createMessage);
router.route("/room/create").post(createRoom);
router.route("/:userId").get(getAllChats);

export default router;
