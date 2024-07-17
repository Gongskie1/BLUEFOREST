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
const bcrypt_1 = require("../../utils/bcrypt");
const prisma = new client_1.PrismaClient();
const userRepo = new UserRepo_1.default(prisma);
exports.UserQueries = {
    createUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Please fill all the fields." });
        }
        try {
            const findUser = yield userRepo.findUserByUsername(username);
            if (!findUser) {
                const hash = yield (0, bcrypt_1.hashPassword)(password);
                yield userRepo.createUser({ username, password: hash });
                return res.status(201).json({ message: "User created" });
            }
            else {
                return res.status(400).json({ message: "User already exists" });
            }
        }
        catch (error) {
            console.error("Error in createUser:", error);
            return res.status(500).send("Internal Server Error");
        }
    }),
    loginAccount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { username, password } = req.body;
        console.log("Inside the session store get");
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }
        try {
            const findUser = yield userRepo.findUserByUsername(username);
            if (findUser) {
                const compare = yield (0, bcrypt_1.checkHashPassword)(findUser.password, password);
                if (!compare) {
                    return res.status(401).json({ message: "Wrong credentials", user: null });
                }
                else {
                    return res.status(200).json({ message: "Login successful", user: findUser });
                }
            }
            else {
                return res.status(404).json({ message: "User not found" });
            }
        }
        catch (error) {
            console.log("Error during user login:", error);
            return res.status(500).json({ message: "An internal server error occurred" });
        }
    }),
};
