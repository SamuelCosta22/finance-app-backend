import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { PostgresCreateUserRepository } from '../../repositories/postgres/users/create-user.repository.ts';
import { PostgresGetUserByEmailRepository } from '../../repositories/postgres/users/get-user-by-email.repository.ts';

export class CreateUserUseCase {
  async execute(input: CreateUserUseCaseInput) {
    //TODO: verificar se o email já está em uso
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
    const userWithProvidedEmail = await getUserByEmailRepository.execute(
      input.email,
    );

    if (userWithProvidedEmail) {
      throw new Error('The provided email is already in use.');
    }

    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(input.password, 10);

    const user = {
      ...input,
      id: userId,
      password: hashedPassword,
    };

    const postgresCreateUserRepository = new PostgresCreateUserRepository();
    const createdUser = await postgresCreateUserRepository.execute(user);

    return createdUser;
  }
}

export type CreateUserUseCaseInput = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};
