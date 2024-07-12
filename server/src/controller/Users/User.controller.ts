import { Request, Response } from "express-serve-static-core";
import { PrismaClient } from "@prisma/client";
import UserRepository from "./UserRepo";

const prisma = new PrismaClient();
const userRepo = new UserRepository(prisma);

export const UserQueries = {

    createUser: async (req: Request, res: Response) => {
        // const { body:{email,username,password}} = req;
        // try {
        //     // const create = await userRepo.createUser({email:email,username:username,password:password});
            
            
        //     if (req.session.visited === undefined) {
        //         req.session.visited = 0;
        //         console.log("visited ")
        //     }
        //     req.session.visited += 1;
            
            
        //     res.send(`You have visited this page ${req.session.visited} times`);
        // } catch (error) {
        //     console.error('Error in createUser:', error);
        //     res.status(500).send('Internal Server Error');
        // }
        res.send(req.user);
    },

    loginAccount: async (req: Request, res: Response) => { 
        const {body:{username,password}} = req;
        console.log("Inside the session store get");

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        try {
            const findUser = await userRepo.findUserAccount(username,password);

            if(!findUser){
                return res.status(401).json({message:"There is no user found"});                
            }else{
                return res.status(200).json({data:findUser});
            }
        } catch (error) {
            console.log("No user found2!",error);
            return res.status(401).json({ message:  "An error occurred" });
        }

    }
    
}