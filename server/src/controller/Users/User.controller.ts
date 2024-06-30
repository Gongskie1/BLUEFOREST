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
        console.log("Inside the session store get");
        // return req.user ? res.status(200).send(req.user) : res.status(401).send("Not Authenticate");
        req.sessionStore.get(req.sessionID, (error: Error, SessionData) => {
            if (error) {
                console.log("This is an error occur in login controller: " + error);
                
                res.status(400).json({ message: "lezgoww error" });
                throw error;
            }
            console.log("This is session store: ", JSON.stringify(SessionData));
            console.log(req.sessionID);
            return res.sendStatus(404);
        });
     
    }
    
}