import * as replyRepository from "../repositories/replyRepository";
import { Reply } from "../types/reply";
import { uploadToCloudinary } from "./mediaService";
export const createReply = async (reply: Reply, file?: Express.Multer.File) => {
  if (file) {
    const mediaUrl = await uploadToCloudinary(file);
    reply.media = mediaUrl;
  }

  return await replyRepository.createReply(reply);
};

export const getReplyByThread = async (threadId: number) => {
  return await replyRepository.findreplyByThread(threadId);
};
