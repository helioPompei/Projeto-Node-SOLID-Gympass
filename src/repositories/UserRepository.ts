import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { UsersRepository } from "./Interfaces/UserRepository";

export class PrismaUsersRepository implements UsersRepository {
  // Prisma Create user
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  // Prisma Find user by email
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  }
}
