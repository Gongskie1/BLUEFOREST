import { Request, Response } from "express-serve-static-core";
import { PrismaClient } from "@prisma/client";
import UserRepository from "./UserRepo";
import { hashPassword, checkHashPassword } from "../../utils/bcrypt";

const prisma = new PrismaClient();
const userRepo = new UserRepository(prisma);


export const UserQueries = {
  createUser: async (req: Request, res: Response) => {
    const { username, password,userType, email, cellno, gender, address } = req.body;

    // Validate required fields
    if (!username || !password || !email || !cellno || !gender || !address) {
      return res.status(400).json({ status: false, message: "Please fill all the fields." });
    }

    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { username },
      });

      if (existingUser) {
        return res.status(400).json({ status: false, message: "User already exists" });
      }

      // Hash the password
      const hashedPassword = await hashPassword(password);

      await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          userType,
          email,
          cellno,
          gender,
          address,
        },
      });

      return res.status(201).json({ status: true, message: "User created" });
    } catch (error) {
      console.error("Error in createUser:", error);
      return res.status(500).json({ status: false, message: "Internal Server Error" });
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
      const data = {
        id:findUser?.id,
        username:findUser?.username,
        userType:findUser?.userType,
        email: findUser?.email,
        cellno: findUser?.cellno
      }

      if (findUser) {
        const compare = await checkHashPassword(findUser.password, password);
        if (!compare) {
          return res.status(401).json({ message: "Wrong credentials", user: null });
        } else {
          return res.status(200).json({ message: "Login successful", user: data });
        }
      } else {
        return res.status(404).json({ message: "User not found", user:null });
      }
    } catch (error) {
      console.log("Error during user login:", error);
      return res.status(500).json({ message: "An internal server error occurred" });
    }
  },
};
