import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import { CreateUserController } from './controllers/users/create-user.controller.ts';
import { GetUserByIdController } from './controllers/users/get-user-by-id.controller.ts';
import { UpdateUserController } from './controllers/users/update-user.controller.ts';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/users', async (request, response) => {
  const createUserController = new CreateUserController();
  const { body, statusCode } = await createUserController.execute(request);

  response.status(statusCode).send(body);
});

app.get('/api/users/:userId', async (request, response) => {
  const getUserByIdController = new GetUserByIdController();
  const { body, statusCode } = await getUserByIdController.execute(request);
  response.status(statusCode).send(body);
});

app.patch('/api/users/:userId', async (request, response) => {
  const updateUserController = new UpdateUserController();
  const { body, statusCode } = await updateUserController.execute(request);
  response.status(statusCode).send(body);
});

app.listen(process.env.PORT, () =>
  console.log('listening on port:', process.env.PORT),
);
