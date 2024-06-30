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
Object.defineProperty(exports, "__esModule", { value: true });
class UserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.prisma.user.create({ data });
            }
            catch (error) {
                console.error('Error creating user:', error);
                throw error;
            }
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.prisma.user.findUnique({ where: { id } });
            }
            catch (error) {
                console.error('Error finding user by ID:', error);
                throw error;
            }
        });
    }
    findUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.prisma.user.findMany();
            }
            catch (error) {
                console.error('Error finding users:', error);
                throw error;
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.prisma.user.delete({ where: { id } });
            }
            catch (error) {
                console.error('Error deleting user:', error);
                throw error;
            }
        });
    }
    findUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.prisma.user.findUnique({ where: { username } });
            }
            catch (error) {
                console.error('Error deleting user:', error);
                throw error;
            }
        });
    }
}
exports.default = UserRepository;
