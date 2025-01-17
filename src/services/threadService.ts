import { Thread } from "@prisma/client";
import * as threadRepository from "../repositories/threadRepository";
import { uploadToCloudinary } from "./mediaService";

export const createThread = async (
  thread: Thread,
  file?: Express.Multer.File
) => {
    if(file){
        const mediaUrl = await uploadToCloudinary(file)
        thread.media = mediaUrl
    } 
  return await threadRepository.createThread(thread);
};

export const getThreadById = async (id: number) => {
  return await threadRepository.findThreadById(id);
};
export const getThreadUser = async (authorId: number) => {
  return await threadRepository.getThreadUser(authorId);
};
export const deleteThread = async (id: number) => {
  return await threadRepository.deleteThread(id);
};
