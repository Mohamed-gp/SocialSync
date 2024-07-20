import express from "express";
import authRouter from "./routes/authRouter";
import adminRouter from "./routes/adminRouter";
import usersRouter from "./routes/usersRouter";
import cors from "cors";
import dotenv from "dotenv";
import connectToDB from "./config/connnectToDB";
import helmet from "helmet";

dotenv.config();
connectToDB();

const app = express();
app.use(cors());
app.use(helmet());

const PORT = process.env.PORT || 3000;

app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

app.listen(PORT, () => {
  console.log(`am listening on port ${PORT}`);
});
