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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const client_1 = require("@prisma/client");
const UserRepo_1 = __importDefault(require("../controller/Users/UserRepo"));
const prisma = new client_1.PrismaClient();
const userRepo = new UserRepo_1.default(prisma);
exports.default = passport_1.default.use(new passport_local_1.Strategy((username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Register account Auth Username: ${username}`);
    console.log(`Register account Auth Password: ${password}`);
    try {
        const findUser = yield userRepo.findUserByUsername(username);
        if (!findUser)
            throw new Error("User not found");
        if (findUser.password !== password)
            throw new Error("Invalid Credentials");
        done(null, findUser);
    }
    catch (error) {
        done(error, undefined);
    }
})));
passport_1.default.serializeUser((user, done) => {
    console.log("This is serialize User");
    console.log(`User in serializeUSER ${JSON.stringify(user)}`);
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("This is deserialize User");
    console.log(`User ID id deserialize User`, user.id);
    try {
        const findUser = yield userRepo.findUserById(user.id);
        if (!findUser)
            throw new Error("User not found in Deserialize User ");
        done(null, findUser);
    }
    catch (error) {
        done(error, null);
    }
}));
