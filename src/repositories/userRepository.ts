import { User } from "@prisma/client";
import prisma from "../libs/prisma";
import { UserProfile } from "../types/user";

export const createUser = async (user: User) => {
  return await prisma.user.create({
    data: {
      email: user.email,
      fullName: user.fullName,
      password: user.password,
      userName: user.userName,
    },
  });
};

export const findUserByUserName = async (userName: string) => {
  return await prisma.user.findUnique({
    where: { userName },
    include: {
      _count: {
        select: {
          followers: true,
          likes: true,
          following: true,
        },
      },
      Profile: {
        select: {
          avatar: true,
          bio: true,
          cover: true,
        },
      },
      Thread: {
        orderBy:{
          createdAt: 'desc'
        },
        select: {
          id: true,
          content: true,
          media: true,
          createdAt: true
        },
      },
    },
  });
};

export const findManyUser = async () => {
  return await prisma.user.findMany();
};

export const deleteUser = async (id: number) => {
  return await prisma.user.delete({
    where: { id },
  });
};

export const findUniqueUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const findUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

export const findUserByName = async (name: string) => {
  return await prisma.user.findUnique({
    where: {
      userName: name,
    },
    include: {
      Profile: {
        select: {
          avatar: true,
          bio: true,
        },
      },
    },
  });
};

export const findUser = async (query: string, excludeUserId: number) => {
  return await prisma.user.findMany({
    where: {
      AND: [
        {
          id: {
            not: excludeUserId,
          },
        },
        {
          OR: [
            {
              userName: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              fullName: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
        },
      ],
    },
    include: {
      Profile: {
        select: {
          avatar: true,
          bio: true,
        },
      },
    },
  });
};

export const updateUser = async (user: UserProfile) => {
  return await prisma.user.update({
    where: { id: user.id },
    data: {
      fullName: user.fullName,
      email: user.email,
      userName: user.userName,
      password: user.password,
      Profile: {
        upsert: {
          create: {
            avatar: user.profile?.avatar || "",
            cover: user.profile?.cover || "",
            bio: user.profile?.bio || "",
          },
          update: {
            avatar: user.profile?.avatar || "",
            cover: user.profile?.cover || "",
            bio: user.profile?.bio || "",
          },
        },
      },
    },
    include: {
      Profile: true,
    },
  });
};

export const suggestedUser = async (userId: number) => {
  return await prisma.user.findMany({
    where: {
      id: {
        not: userId,
      },
      following: {
        some: {
          followingId: userId,
        },
      },
      NOT: {
        followers: {
          some: {
            followerId: userId,
          },
        },
      },
    },
    orderBy: {
      followers: {
        _count: "desc",
      },
    },
    select: {
      id: true,
      userName: true,
      fullName: true,
      email: true,
      followers: true,
      following: true,
      _count: {
        select: {
          followers: true,
          following: true,
        },
      },
      Profile: {
        select: {
          avatar: true,
        },
      },
    },
    take: 5,
  });
};
