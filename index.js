import { config } from "dotenv";
import express from "express";
import authRouter from "./routes/auth.js";
import connectDB from "./db/db.js";
import profileRoutes from "./routes/profile.js";
import gigRoutes from "./routes/gig.js";
config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

const router = express.Router();

router.use("/auth", authRouter);
router.use("/profile", profileRoutes);
router.use("/gig", gigRoutes);
app.use("/api", router);

const port = process.env.PORT;
app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
