import { Request, Response } from "express";
import * as replyService from "../services/replyService";
import prisma from "../libs/prisma";

export const createReply = async (req: Request, res: Response): Promise<void> => {
  const authorId = res.locals.user?.id;
  const threadId = parseInt(req.params.threadId, 10);
  const { content, media } = req.body;

  if (!authorId) {
     res.status(401).json({ message: "Unauthorized" });
     return
  }

  if (!threadId) {
     res.status(400).json({ message: "No thread specified" });
     return
  }

  if (!content && !media) {
     res.status(400).json({ message: "Content or media is required" });
  }

  try {
   
    const threadExists = await prisma.thread.findUnique({
      where: { id: threadId },
    });

    if (!threadExists) {
       res.status(404).json({ message: "Thread not found" });
       return
    }
    const file = req.file as Express.Multer.File

    const reply = await replyService.createReply({
      content,
      media,
      authorId,
      threadId,
    }, file);

    
    res.status(201).json(reply);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while creating the reply" });
  }
};


export const getReplyByThread = async (req: Request, res: Response) => {
  const { threadId } = req.params;

  if (!threadId) {
    res.status(400).json({ message: "No thread exist" });
    return;
  }

  try {
    const getReply = await replyService.getReplyByThread(parseInt(threadId));

    if (!getReply) {
      res.status(400).json({ message: "no reply eexist" });
      return;
    }

    res.status(200).json(getReply);
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: (error as Error).message,
    });
  }
};
