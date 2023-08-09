import { Router } from "express";
import smartphoneController from "../controllers/smartphone.controller.js";

const smartphoneRoute = Router();
smartphoneRoute.post("/", smartphoneController.create);

export default smartphoneRoute;
