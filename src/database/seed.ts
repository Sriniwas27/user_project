import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import { Role } from '../users/enums/role.enum';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  for (let i = 0; i < 1000; i++) {
    await usersService.createUser({
      email: `user${i}@test.com`,
      password: 'password123',
      role: Role.VIEWER,
    });
  }

  await app.close();
}
seed();
