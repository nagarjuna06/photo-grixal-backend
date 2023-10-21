import { Router } from "express";
import {
  addContact,
  contactList,
  deleteContact,
} from "../controllers/contactController.js";
import routeNotFound from "../middleware/route-not-found.js";

const contactRouter = Router();

contactRouter.post("/:userType", routeNotFound, addContact);

contactRouter.get("/:userType", routeNotFound, contactList);

contactRouter.delete("/:userType", routeNotFound, deleteContact);

export default contactRouter;
