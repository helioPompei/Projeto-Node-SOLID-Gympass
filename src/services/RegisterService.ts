import { UserAlreadyExistsError } from "@/controllers/errors/user-already-exists-error";
import { UsersRepository } from "@/repositories/Interfaces/UserRepository";
import { hash } from "bcryptjs";

interface RegisterServiceParams {
  name: string;
  email: string;
  password: string;
}

export class RegisterService {
  private prismaUsersRepository;

  constructor(prismaUsersRepository: UsersRepository) {
    this.prismaUsersRepository = prismaUsersRepository;
  }

  async execute({ name, email, password }: RegisterServiceParams) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.prismaUsersRepository.findByEmail(
      email
    );

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    this.prismaUsersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
