import { Reply } from "../types/reply";
import prisma from "../libs/prisma";

export const createReply = async (reply: Reply) => {
  return await prisma.reply.create({
    data: {
      content: reply.content,
      media: reply.media,
      authorId: reply.authorId,
      threadId: reply.threadId,
    },
  });
};

export const findreplyByThread = async (threadId: number) => {
  return await prisma.reply.findMany({
    where: { threadId },
    orderBy:{
      createdAt:"desc"
    },
    include: {
      author: {
        select: {
          fullName: true,
          userName: true,
          Profile: {
            select: {
              avatar: true,
            },
          },
        },
      },
    },
  });
};

export const existThread = async (reply: Reply) => {
  return await prisma.reply.findUnique({
    where: { id: reply.threadId },
  });
};
