import { Request, Response } from "express";
import * as threadService from "../services/threadService";
import { findManyThreads } from "../repositories/threadRepository";

export const createThread = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const user = res.locals.user;

    if (!user) {
      res.status(400).json({ message: "Unauthorized" });
      return;
    }

    body.authorId = user.id;

    
  if(!body.content && !body.media) {
    res.status(400).json({ message: "Content or media is required" });
    return
 }
    
    const file = req.file as  Express.Multer.File

    const thread = await threadService.createThread(body, file);

    res.status(201).json(thread);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: (error as Error).message,
    });
  }
};

export const deleteThread = async (req: Request, res: Response) => {
  const { id } = req.params;
  const authorId = res.locals.user.id;

  console.log("authorId :", authorId);
  console.log("id :", id);

  if (!authorId) {
    res.status(400).json({ message: "Unauthorized" });
    return;
  }

  try {
    const thread = await threadService.getThreadById(parseInt(id));

    if (!thread) {
      res.status(404).json({ message: "Thread not found" });
      return;
    }

    if (thread.authorId !== authorId) {
      res.status(400).json({ message: "Unauthorized" });
      return;
    }

    const deleteThread = await threadService.deleteThread(parseInt(id));

    res.status(201).json({deleteThread, message: "Thread deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: (error as Error).message,
    });
  }
};

export const getThreads = async (req: Request, res: Response) => {
  try {
    const thread = await findManyThreads();
    res.status(200).json(thread);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: (error as Error).message });
  }
};

export const findThreadById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const authorId = res.locals.user.id;

  if (!id || isNaN(Number(id))) {
    res.status(400).json({ message: "Invalid ID", authorId });
    return;
  }

  try {
    const findUniqueThread = await threadService.getThreadById(parseInt(id));

    if (!findUniqueThread) {
      res.status(404).json({ message: "Thread not found" });
      return;
    }

    res.status(200).json(findUniqueThread);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: (error as Error).message });
  }
};

export const threadMe = async (req: Request, res: Response) => {
  const user = res.locals.user;

  if (!user || !user.id) {
    res.status(400).json({ message: "Unauthorized" });
    return;
  }

  try {
    const threads = await threadService.getThreadUser(user.id);

    if (!threads || threads.length === 0) {
      res.status(404).json({ message: "No threads found for this user" });
      return;
    }

    res.status(200).json(threads);
  } catch (error) {
    console.error("Error fetching threads for user:", error);
    res.status(500).json({ message: "Error fetching threads" });
  }
};
