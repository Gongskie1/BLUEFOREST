"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserQueries = void 0;
const client_1 = require("@prisma/client");
const UserRepo_1 = __importDefault(require("./UserRepo"));
const prisma = new client_1.PrismaClient();
const userRepo = new UserRepo_1.default(prisma);
exports.UserQueries = {
    createUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    }),
    loginAccount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { username, password } } = req;
        console.log("Inside the session store get");
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }
        try {
            const findUser = yield userRepo.findUserAccount(username, password);
            if (!findUser) {
                return res.status(401).json({ message: "There is no user found" });
            }
            else {
                return res.status(200).json({ data: findUser });
            }
        }
        catch (error) {
            console.log("No user found2!", error);
            return res.status(401).json({ message: "An error occurred" });
        }
    })
};
