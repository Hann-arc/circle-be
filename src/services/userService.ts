import { User } from "@prisma/client";
import * as userRepository from "../repositories/userRepository";
import { UserProfile } from "../types/user";
import { uploadToCloudinary } from "./mediaService";

export async function getUser() {
  return await userRepository.findManyUser();
}
export const createUser = async (user: User) => {
  return await userRepository.createUser(user);
};

export const updateUser = async (
  user: UserProfile,
  files?: { avatarFile?: Express.Multer.File; coverFile?: Express.Multer.File }
) => {
  if (files?.avatarFile) {
    const avatarUrl = await uploadToCloudinary(files.avatarFile);
    if (user.profile) {
      user.profile.avatar = avatarUrl;
    }
  }

  if (files?.coverFile) {
    const coverUrl = await uploadToCloudinary(files.coverFile);
    if (user.profile) {
      user.profile.cover = coverUrl;
    }
  }

  return await userRepository.updateUser(user);
};


export const deleteUser = async (id: number) => {
  return await userRepository.deleteUser(id);
};

export const getUserById = async(id: number) => {
  return await userRepository.findUserById(id)
}

export const getUserByName = async(name: string) => {
  return await userRepository.findUserByName(name)
}
export const getAllUser = async(name: string, excludeUserId:number) => {
  return await userRepository.findUser(name, excludeUserId)
}

export const suggestedUser = async (userId:number) => {
  return await userRepository.suggestedUser(userId)
}
export const findUserByUserNameService = async (userName:string) => {
  return await userRepository.findUserByUserName(userName)
}