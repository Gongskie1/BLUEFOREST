import { Request, Response } from "express-serve-static-core";
import { PrismaClient } from "@prisma/client";
import UserRepository from "./UserRepo";

const prisma = new PrismaClient();
const userRepo = new UserRepository(prisma);

export const UserQueries = {

    createUser: async (req: Request, res: Response) => {
        const { body:{username,password,userType,gender,phoneNumber}} = req;
        try {
            const create = await userRepo.createUser({
                username: username, password: password, userType: userType,
                gender: gender,
                phoneNumber: phoneNumber
            });
            
            
            res.send(`You have visited this page ${req.session.visited} times ${userType}`);
        } catch (error) {
            console.error('Error in createUser:', error);
            res.status(500).send('Internal Server Error');
        }
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
                return res.status(401).json(
                    {
                        data:null, 
                        status:false
                    });                
            }else{
                return res.status(200).json(
                    {
                        data:findUser, 
                        status:true
                    });
            }
        } catch (error) {
            console.log("Error during user login: ",error);
            return res.status(500).json({ message: "An internal server error occurred" });
        }

    }
    
}