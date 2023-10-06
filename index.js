import { config } from "dotenv";
import express from "express";
import authRouter from "./routes/auth.js";
import connectDB from "./db/db.js";
config();
connectDB();

const app = express();

app.use(express.json());

const router = express.Router();

router.use("/auth", authRouter);

app.use("/api", router);

const port = process.env.PORT;
app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
