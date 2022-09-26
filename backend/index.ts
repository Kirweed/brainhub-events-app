import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db";
import router from "./routes/eventRoutes";

dotenv.config();
connectDB();

const app: Express = express();
const port = process.env.PORT;

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method}  ${req.path}`);
  next();
};

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(logger);
app.use("/", router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
