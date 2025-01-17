import { Router } from "express";
import * as threadController from "../controllers/threadController";
import upload from "../middlewares/file-upload";

const threadsRouter = Router();

threadsRouter.get("/me", threadController.threadMe);
threadsRouter.post("/", upload.single('media'), threadController.createThread);
threadsRouter.get("/", threadController.getThreads);
threadsRouter.get("/:id", threadController.findThreadById);
threadsRouter.delete("/:id", threadController.deleteThread);

export default threadsRouter;
