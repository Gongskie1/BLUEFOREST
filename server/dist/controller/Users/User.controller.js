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
        console.log("Inside the session store get");
        // return req.user ? res.status(200).send(req.user) : res.status(401).send("Not Authenticate");
        req.sessionStore.get(req.sessionID, (error, SessionData) => {
            if (error) {
                console.log("This is an error occur in login controller: " + error);
                res.status(400).json({ message: "lezgoww error" });
                throw error;
            }
            console.log("This is session store: ", JSON.stringify(SessionData));
            console.log(req.sessionID);
            return res.sendStatus(404);
        });
    })
};
