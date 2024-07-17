import { Request, Response } from "express-serve-static-core";
import { PrismaClient } from "@prisma/client";
import UserRepository from "../Users/UserRepo";

const prisma = new PrismaClient();
const userRepo = new UserRepository(prisma);

const scheduleController = {
    create: async (req:Request,res:Response)=>{
        const {body:{gender,firstname,lastname,phoneNumber,therapyType}} = req;
        console.log(gender,firstname,lastname,phoneNumber,therapyType);
    }
}

export default scheduleController;