import { Router } from "express";
import smartphoneRoute from "./smartphone.route.js";

const route = Router();
route.use("/smartphone", smartphoneRoute);

export default route;
