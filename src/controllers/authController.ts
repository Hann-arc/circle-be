import { Request, Response } from "express";
import * as authServices from "../services/authService";
import prisma from "../libs/prisma";

export const register = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const user = await authServices.registerUser(body);

    res.json({
      message: "register berhasil broww",
      user,
    });
  } catch (error: any) {
    console.log((error as Error).message);
    res.status(500).json({ message: error.message });
  }
};

export const getMe = async (req: Request, res: Response) => {
  const userId = res.locals.user.id;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        Thread:true,
        userName: true,
        fullName: true,
        followers: {
          select: {
            follower: {
              select: {
                id:true,
                fullName: true,
                userName: true,
                Profile: {
                  select: {
                    avatar: true,
                    bio: true,
                    cover: true
                  },
                },
              },
            },
          },
        },
        following: {
          select: {
            following: {
              select: {
                id:true,
                fullName: true,
                userName: true,
                Profile: {
                  select: {
                    avatar: true,
                    bio: true,
                  },
                },
              },
            },
          },
        },
        _count: {
          select: {
            followers: true,
            following: true,
            likes: true,
            replies: true
          },
        },
        Profile: {
          select: {
            avatar: true,
            bio: true,
            cover: true
          },
        },
      },
    });

    res.status(200).json(user);
  } catch (error: any) {
    console.log((error as Error).message);
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const token = await authServices.login(body);

    res.json({
      token,
    });
  } catch (error: any) {
    console.log((error as Error).message);
    res.status(500).json({ message: error.message });
  }
};
