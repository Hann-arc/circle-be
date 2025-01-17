import express from "express";
import { toggleLike } from "../controllers/likeController";

const likeRoute = express.Router();

likeRoute.post("/:threadId/", toggleLike);

export default likeRoute;
