import express, { NextFunction, Request, Response } from "express";
import authRouter from "./routes/authRouter";
import adminRouter from "./routes/adminRouter";
import usersRouter from "./routes/usersRouter";
import postsRouter from "./routes/postsRouter";
import commentsRouter from "./routes/commentsRouter";
import messagesRouter from "./routes/messagesRouter";
import cors from "cors";
import dotenv from "dotenv";
import connectToDB from "./config/connnectToDB";
import helmet from "helmet";
import { errorHandler, notFound } from "./middlewares/errorsHandler";
import cookieParser from "cookie-parser";
import { socketInit } from "./utils/socket/socket";
import hpp from "hpp";
import { createServer } from "http";
import rateLimiting from "express-rate-limit";

dotenv.config();
connectToDB();

const app = express();
const server = createServer(app);
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin:
      process.env.ENV == "developement"
        ? "http://localhost:5173"
        : "https://social-sync1.netlify.app",
    // origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

app.use(hpp());

// // security headers
app.use(helmet());
// // prevent xss attack
// app.use(xss());

app.use(
  rateLimiting({
    windowMs: 10 * 60 * 1000,
    max: 200,
  })
);
const io = socketInit(server);
import { ioResponse } from "./interfaces/authInterface";
app.use((req: Request, res: ioResponse, next: NextFunction) => {
  res.io = io;
  next();
});

app.use(helmet());
app.use(express.urlencoded({ extended: false }));
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`am listening on port ${PORT}`);
});

app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/messages", messagesRouter);
app.use(notFound);
app.use(errorHandler);
