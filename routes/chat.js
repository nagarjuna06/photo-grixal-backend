import { Router } from "express";
import { getMessages, sendMessage } from "../controllers/chatController.js";
import routeNotFound from "../middleware/route-not-found.js";

const chatRouter = Router();

chatRouter.post("/:userType/get-messages", routeNotFound, getMessages);

chatRouter.post("/:userType/send-message", routeNotFound, sendMessage);

export default chatRouter;
