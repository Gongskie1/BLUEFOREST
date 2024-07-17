import { Request, Response } from "express-serve-static-core";
import { PrismaClient } from "@prisma/client";
import UserRepository from "./UserRepo";
import { hashPassword, checkHashPassword } from "../../utils/bcrypt";

const prisma = new PrismaClient();
const userRepo = new UserRepository(prisma);


export const UserQueries = {
  createUser: async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Please fill all the fields." });
    }

    try {
      const findUser = await userRepo.findUserByUsername(username);

      if (!findUser) {
        const hash = await hashPassword(password);
        await userRepo.createUser({ username, password: hash });
        return res.status(201).json({ message: "User created" });
      } else {
        return res.status(400).json({ message: "User already exists" });
      }
    } catch (error) {
      console.error("Error in createUser:", error);
      return res.status(500).send("Internal Server Error");
    }
  },

  loginAccount: async (req: Request, res: Response) => {
    const { username, password } = req.body;
    console.log("Inside the session store get");

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    try {
      const findUser = await userRepo.findUserByUsername(username);

      if (findUser) {
        const compare = await checkHashPassword(findUser.password, password);
        if (!compare) {
          return res.status(401).json({ message: "Wrong credentials", user: null });
        } else {
          return res.status(200).json({ message: "Login successful", user: findUser });
        }
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.log("Error during user login:", error);
      return res.status(500).json({ message: "An internal server error occurred" });
    }
  },
};
