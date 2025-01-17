import { Request, Response } from "express";
import * as userService from "../services/userService";
import { RequestHandler } from "express";

export const getUser = async (req: Request, res: Response) => {
  try {
    const users = await userService.getUser();

    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: (error as Error).message,
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    console.log(req.body);

    const createUser = await userService.createUser(body);
    console.log("user created: ", createUser);

    res.json(createUser);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: (error as Error).message,
    });
  }
};


export const updateUser: RequestHandler = async (req, res) => {
  try {
    const id = res.locals.user.id;
    const { userName, fullName, bio, avatar, cover } = req.body;

    const profile = {
      avatar: avatar || "",
      cover: cover || "",
      bio: bio || "",
    };

    if (userName) {
      const existingUser = await userService.getUserById(id);
      if (existingUser && existingUser.userName !== userName) {
        const existingUserName = await userService.getUserByName(
          userName as string
        );
        if (existingUserName) {
          res.status(400).json({ message: "Username already exist" });
          return;
        }
      }
    }
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const avatarFile = files.avatar?.[0];
    const coverFile = files.cover?.[0];

    const updatedUser = await userService.updateUser(
      { id: +id, userName, fullName, profile },
      { avatarFile, coverFile }
    );

    res.status(201).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      message: (error as Error).message,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const delateUser = await userService.deleteUser(parseInt(id));

    res.json(delateUser);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: (error as Error).message,
    });
  }
};

export const findUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const findUniqueUser = await userService.getUserById(parseInt(id));
    3;
    res.json({ findUniqueUser });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: (error as Error).message,
    });
  }
};

export const getUserByQuery = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    const userId = res.locals.user.id;

    const user = await userService.getAllUser(name as string, userId);

    res.status(200).json(user);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: (error as Error).message,
    });
  }
};

export const suggestUser = async (
  req: Request,
  res: Response
) => {
  const userId = res.locals.user?.id;

  if (!userId) {
    res.status(400).json({ message: "Unauthorized" });
    return;
  }

  try {
    
    console.log("User ID:", userId);

    const userRec = await userService.suggestedUser(userId);

    res.status(200).json(userRec);
    return;
  } catch (error) {
    console.error("Error fetching suggested users:", error);

    res.status(500).json({
      message: (error as Error).message,
    });
    return;
  }
};

export const findUserByUSername = async(  req: Request,
  res: Response) =>{

  const { name } = req.params;

  if(!name){
     res.status(400).json({message: "invalid username"})
     return

  }
  
  try {

    const detailUser = await userService.findUserByUserNameService(name as string)

    if(!detailUser){
       res.status(400).json({message: 'this user is not exist'})
       return
    }

     res.status(200).json(detailUser)
     return

  } catch (error) {
    console.error("Error fetching detail  users:", error);

    res.status(500).json({
      message: (error as Error).message,
    });
  }
} 