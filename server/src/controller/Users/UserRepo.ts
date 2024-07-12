import { Prisma, PrismaClient, User } from "@prisma/client";

export default class UserRepository {
    constructor(private prisma: PrismaClient) { }
    
    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        try {
            return await this.prisma.user.create({ data });
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    async findUserById(id: number): Promise<User | null> {
        try {
            return await this.prisma.user.findUnique({ where: { id } });
        } catch (error) {
            console.error('Error finding user by ID:', error);
            throw error;
        }
    }

    async findUsers(): Promise<User[]> {
        try {
            return await this.prisma.user.findMany();
        } catch (error) {
            console.error('Error finding users:', error);
            throw error;
        }
    }

    async deleteUser(id: number): Promise<User | null> {
        try {
            return await this.prisma.user.delete({ where: { id } });
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }

    async findUserByUsername(username:string): Promise<User | null>{
        try {
            return await this.prisma.user.findUnique({ where: { username } });
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }

    async findUserAccount(username:string, password:string): Promise<User | null>{
        try {
            return await this.prisma.user.findFirst({
                where: {
                    username: username,
                    password: password
                }
            });
        } catch (error) {
            console.error("Error finding user account:", error);
            throw error;
        }
    }

    
}
