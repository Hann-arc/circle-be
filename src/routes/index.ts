import { Router } from "express";
import threadsRouter from "./threads";
import usersRouter from "./users";
import authRouter from "./auth";
import { authentication } from "../middlewares/auth";
import upload from "../middlewares/file-upload";
import { uploadToCloudinary } from "../services/mediaService";
import followRouter from "./follows";
import replyRoter from "./reply";
import likeRoute from "./like";

const router = Router();

// router.post("/upload-img", upload.single("media"), async (req, res) => {
//   if(req.file === undefined){
//     res.json({
//       message: "Please upload a image"
//     })  
//   }

//  const url =  await uploadToCloudinary(req.file as Express.Multer.File)

//   res.json({
//     message: "Upload sekses",
//     url
//   })  
// })

router.use("/users", authentication, usersRouter);
router.use("/threads", authentication, threadsRouter);

router.use("/follows", authentication, followRouter)
router.use("/reply", authentication, replyRoter)
router.use("/like", authentication, likeRoute)

router.use(authRouter);
export default router;
