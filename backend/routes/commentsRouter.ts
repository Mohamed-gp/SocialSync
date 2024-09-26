import { Router } from "express";
import {
  addComment,
  deleteComment,
  getComments,
  replyToComment,
} from "../controllers/commentsController";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.route("/:userId/:commentId").delete(verifyToken, deleteComment);
router.route("/:postId/:commentId/replyToComment").post(verifyToken, replyToComment);
router.route("/:postId").post(verifyToken, addComment).get(getComments);

export default router;
