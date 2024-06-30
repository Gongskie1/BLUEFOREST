import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { PrismaClient,User } from "@prisma/client";
import UserRepository from "../controller/Users/UserRepo";

const prisma = new PrismaClient();
const userRepo = new UserRepository(prisma);


export default passport.use(
    new LocalStrategy(async (username, password, done) => {
        console.log(`Register account Auth Username: ${username}`);
        console.log(`Register account Auth Password: ${password}`);
        try {
            const findUser = await userRepo.findUserByUsername(username);
            if (!findUser) throw new Error("User not found");
            if (findUser.password !== password) throw new Error("Invalid Credentials");
            done(null, findUser);
        } catch (error) {
            done(error, undefined);
        }

    })
);

passport.serializeUser((user, done) => {
    console.log("This is serialize User");
    console.log(`User in serializeUSER ${JSON.stringify(user)}`);
    done(null, user);
});

passport.deserializeUser(async(user:User,done) => {
    console.log("This is deserialize User");
    console.log(`User ID id deserialize User`, user.id);
    
    try {
        const findUser = await userRepo.findUserById(user.id);
        if (!findUser) throw new Error("User not found in Deserialize User ");
        done(null, findUser);
    } catch (error) {
        done(error, null);
    }
});