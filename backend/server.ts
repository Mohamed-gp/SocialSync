import express from "express";
import authRouter from "./routes/authRouter";
import cors from "cors";
import dotenv from "dotenv";
import connectToDB from "./config/connnectToDB";

dotenv.config();
cors();
connectToDB();
const app = express();

const PORT = process.env.PORT;

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`am listening on port ${PORT}`);
});
