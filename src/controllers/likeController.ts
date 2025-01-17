import { Request, Response } from "express";
import prisma from "../libs/prisma";



export const toggleLike = async (req: Request, res: Response) => {
  try {
    const { threadId } = req.params;
    const  userId  = res.locals.user.id; 
    const existingLike = await prisma.like.findFirst({
      where: {
        threadId: Number(threadId),
        userId: Number(userId),
      },
    });
    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
       res.status(200).json({ message: "Like removed" });
   return
      } else {
      await prisma.like.create({
        data: {
          threadId: Number(threadId),
          userId: Number(userId),
        },
      });
       res.status(200).json({ message: "Like added" });
   return
      }
  } catch (error) {
    console.error(error);
     res.status(500).json({ error: "Internal server error" });
 return
    }
};
