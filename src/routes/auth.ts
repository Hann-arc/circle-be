import { Router } from "express";
import * as authController from "../controllers/authController"
import { authentication } from "../middlewares/auth";


const authRouter = Router();

authRouter.post("/register", authController.register)
authRouter.post("/login", authController.login)
authRouter.get("/me", authentication, authController.getMe)

export default authRouter