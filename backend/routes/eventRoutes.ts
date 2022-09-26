import express from "express";
import { createEvent } from "../controllers/eventControllers";

const router = express.Router();

router.route("/event").post(createEvent);

export default router;
