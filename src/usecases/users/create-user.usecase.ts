import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { EmailAlreadyInUseError } from '../../errors/user.ts';
import {
  ICreateUserRepository,
  IGetUserByEmailRepository,
} from '../../types/repositories/users.repository.ts';

export class CreateUserUseCase {
  constructor(
    private createUserRepository: ICreateUserRepository,
    private getUserByEmailRepository: IGetUserByEmailRepository,
  ) {
    this.createUserRepository = createUserRepository;
    this.getUserByEmailRepository = getUserByEmailRepository;
  }

  async execute(input: CreateUserUseCaseInput) {
    const userWithProvidedEmail = await this.getUserByEmailRepository.execute(
      input.email,
    );

    if (userWithProvidedEmail) {
      throw new EmailAlreadyInUseError(input.email);
    }

    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(input.password, 10);

    const user = {
      ...input,
      id: userId,
      password: hashedPassword,
    };

    const createdUser = await this.createUserRepository.execute(user);

    return createdUser;
  }
}

export type CreateUserUseCaseInput = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};
