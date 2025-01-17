import { Thread } from "@prisma/client";
import prisma from "../libs/prisma";

export const createThread = async (thread: Thread) => {
  return await prisma.thread.create({
    data: {
      content: thread.content,
      media: thread.media,
      authorId: thread.authorId,
    },
  });
};

export const findManyThreads = async () => {
  try {
    return await prisma.thread.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            id: true,
            userName: true,
            fullName: true,
            Profile: true,
          },
        },
        replies:{
          select:{
            author: {
              select: {
                id: true,
                userName: true,
                fullName: true,
                Profile: {
                  select:{
                    avatar: true
                  }
                }
              },
            },
            content:true,
            media:true
          },
        },
        _count:{
          select:{
            replies: true,
            likes: true
          }
        }
      },
    });
  } catch (error) {
    console.error("Error fetching threads:", error);
    throw new Error("Unable to fetch threads");
  }
};

export const findThreadById = async (id: number) => {
  try {
    return await prisma.thread.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            userName: true,
            fullName: true,
            Profile: true,
          },
        },
        replies:{
          select:{
            author: {
              select: {
                id: true,
                userName: true,
                fullName: true,
                Profile: {
                  select:{
                    avatar: true
                  }
                }
              },
            },
            content:true,
            media:true
          },
        },
        _count:{
          select:{
            replies: true,
            likes: true
          }
        }
      },
    });
  } catch (error) {
    console.error("Error fetching thread:", error);
    throw new Error("Unable to fetch thread");
  }
};

export const getThreadUser = async (authorId: number) => {
  try {
    return await prisma.thread.findMany({
      where: { authorId },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            id: true,
            userName: true,
            fullName: true,
            Profile: true,
          },
        },
        _count: {
          select:{
             likes: true,
             replies: true
          }
        }
      },
    });
  } catch (error) {
    console.error("Error fetching threads by user:", error);
    throw new Error("Unable to fetch threads by user");
  }
};

export const deleteThread = async (id: number) => {
  try {
    return await prisma.thread.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error fetching thread:", error);
    throw new Error("Unable to fetch thread");
  }
};
