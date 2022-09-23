import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import wordRouter from "./routes/word";
dotenv.config();

/* CONNECT DATABASE - start */
declare var process: {
  env: {
    DATABASE_URL: string;
  };
};
mongoose.connect(process.env.DATABASE_URL, () => {
  console.log("Connected to MongoDB");
});
/* CONNECT DATABASE - end */

const app: Application = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("common"));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});
//ROUTER
app.use("/v1/words", wordRouter);

app.listen(8000, () => {
  console.log("sever is running...");
});
