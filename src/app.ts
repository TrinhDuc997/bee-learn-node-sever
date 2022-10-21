import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import phoneticIPARouter from "./routes/phoneticIPA";
dotenv.config();

/* CONNECT DATABASE - start */
declare var process: {
  env: {
    DATABASE_URL: string;
    PORT: number;
    DB_Name: string;
    DB_OPTIONS: string;
  };
};
const DB_Name = "dbBeeLearn";
mongoose
  .connect(`${process.env.DATABASE_URL}${DB_Name}?${process.env.DB_OPTIONS}`, {
    serverSelectionTimeoutMS: 5000,
  })
  .catch((err) => console.log(err));
/* CONNECT DATABASE - end */

const app: Application = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("common"));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});
//ROUTER
app.use("/v1/phoneticIPA", phoneticIPARouter);

app.listen(process.env.PORT || 8000, () => {
  console.log("sever is running...");
});
