import { Router } from "express";
import * as followsController from '../controllers/followsController';
const followRouter = Router()

followRouter.post("/toggle", followsController.toggleFollow)
followRouter.get("/followers/:userId", followsController.getFollowers)
followRouter.get("/following/:userId", followsController.getFollowing)

export default followRouter