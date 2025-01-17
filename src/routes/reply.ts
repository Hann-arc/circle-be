import { Router } from "express";
import * as replyController from '../controllers/replyController';
import upload from "../middlewares/file-upload";
const replyRoter = Router()

replyRoter.post("/:threadId", upload.single("media"), replyController.createReply);
replyRoter.get('/:threadId', replyController.getReplyByThread)

export default replyRoter