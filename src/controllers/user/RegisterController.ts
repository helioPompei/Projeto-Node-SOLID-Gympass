import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { RegisterService } from "@/services/RegisterService";
import { PrismaUsersRepository } from "@/repositories/UserRepository";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const userRepository = new PrismaUsersRepository();
    const registerService = new RegisterService(userRepository);

    await registerService.execute({
      name,
      email,
      password,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError)
      return reply.status(409).send({ message: error.message });

    throw error;
  }

  return reply.status(201).send();
};
