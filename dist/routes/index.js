"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const threads_1 = __importDefault(require("./threads"));
const users_1 = __importDefault(require("./users"));
const auth_1 = __importDefault(require("./auth"));
const auth_2 = require("../middlewares/auth");
const follows_1 = __importDefault(require("./follows"));
const reply_1 = __importDefault(require("./reply"));
const like_1 = __importDefault(require("./like"));
const router = (0, express_1.Router)();
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
router.use("/users", auth_2.authentication, users_1.default);
router.use("/threads", auth_2.authentication, threads_1.default);
router.use("/follows", auth_2.authentication, follows_1.default);
router.use("/reply", auth_2.authentication, reply_1.default);
router.use("/like", auth_2.authentication, like_1.default);
router.use(auth_1.default);
exports.default = router;
