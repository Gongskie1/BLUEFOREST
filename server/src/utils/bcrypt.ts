import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();


// Mao ning tig encrypt sa plain basta mag create ug user account
async function hashPassword(password:string):Promise<string>{
    const saltRound:number = 10;
    const hash = await bcrypt.hash(password,saltRound);

    return hash;
}
/* mao ning tig compare sa sa plain ug hash password nya 
   return niya ang boolean if ang ghe comapare kay pariha sa plain ug hash return sya'g true if dli pariha return sya'g false 
*/
async function checkHashPassword(hashPassword:string,plainPassword:string):Promise<boolean>{

    const compareResult = await bcrypt.compare(plainPassword,hashPassword);
    
    return compareResult;
}

export  {hashPassword, checkHashPassword};