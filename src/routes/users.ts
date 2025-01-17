import { Router } from "express";
import * as userController from "../controllers/userController";
import upload from "../middlewares/file-upload";

const usersRouter = Router();

usersRouter.get("/", userController.getUser);

usersRouter.post("/", userController.createUser);
usersRouter.patch(
    "/",
    upload.fields([
      { name: "avatar", maxCount: 1 },
      { name: "cover", maxCount: 1 },
    ]),
    userController.updateUser
  );
  
usersRouter.delete("/:id", userController.deleteUser);
usersRouter.get("/detail/:id", userController.findUserById);
usersRouter.get("/search", userController.getUserByQuery);
usersRouter.get("/suggest", userController.suggestUser);
usersRouter.get("/:name", userController.findUserByUSername);
 
export default usersRouter;
