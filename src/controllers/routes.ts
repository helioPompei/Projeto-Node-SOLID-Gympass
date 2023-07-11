import { register } from "@/controllers/user/RegisterController";
import { FastifyInstance } from "fastify";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register);
}