import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginSchema } from "../libs/validator/loginSchema";
import {
  createUser,
  findUniqueUserByEmail,
  findUserByUserName
} from "../repositories/userRepository";

export const registerUser = async (user: User) => {
  const existedEmail = await findUniqueUserByEmail(user.email);

  if (existedEmail) {
    throw new Error("Email already used");
  }

  const existedUserName = await findUserByUserName(user.userName);

  if (existedUserName) {
    throw new Error("User name already used")
  }

  user.password = await bcrypt.hash(user.password, 10);

  return await createUser(user);
};


export const login = async (LoginDTO: LoginSchema) => {
  const { email, password } = LoginDTO;

  const user = await findUniqueUserByEmail(email);
  if (!user) {
    throw new Error("Email or password is incorrect");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Email or password is incorrect");
  }
 
  const token = jwt.sign(
    { id: user.id, userName: user.userName, email: user.email },
    process.env.JWT_SECRET as string,
  );

  return token;
};
