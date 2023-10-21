import { config } from "dotenv";
import express from "express";
import authRouter from "./routes/auth.js";
import connectDB from "./db/db.js";
import profileRoutes from "./routes/profile.js";
import gigRoutes from "./routes/gig.js";
import chatRouter from "./routes/chat.js";
import morgan from "morgan";
import contactRouter from "./routes/contact.js";
import { verifyAccessToken } from "./middleware/accessToken.js";
import cors from "cors";
import allowOrigin from "./middleware/allowOrigin.js";
import adminRouter from "./routes/admin.js";

config();

connectDB();

const app = express();

app.use(express.json());

app.use(cors(allowOrigin));

app.use(express.urlencoded({ extended: true, limit: "100mb" }));

app.use(morgan("dev"));

app.use("/api/auth", authRouter);

app.use("/api/admin", adminRouter);

app.use(verifyAccessToken);

app.use("/api/profile", profileRoutes);

app.use("/api/gig", gigRoutes);

app.use("/api/contacts", contactRouter);

app.use("/api/chat", chatRouter);

const port = process.env.PORT;

export const server = app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
