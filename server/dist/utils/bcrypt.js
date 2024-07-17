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
exports.checkHashPassword = exports.hashPassword = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
// Mao ning tig encrypt sa plain basta mag create ug user account
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const saltRound = 10;
        const hash = yield bcrypt_1.default.hash(password, saltRound);
        return hash;
    });
}
exports.hashPassword = hashPassword;
/* mao ning tig compare sa sa plain ug hash password nya
   return niya ang boolean if ang ghe comapare kay pariha sa plain ug hash return sya'g true if dli pariha return sya'g false
*/
function checkHashPassword(hashPassword, plainPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const compareResult = yield bcrypt_1.default.compare(plainPassword, hashPassword);
        return compareResult;
    });
}
exports.checkHashPassword = checkHashPassword;
