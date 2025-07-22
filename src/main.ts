import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RolesGuard } from './auth/guards/roles.guard';
import { v4 as uuidv4 } from 'uuid';
import { NextFunction } from 'express';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    app.use((req: Request, res: Response, next: NextFunction) => {
    req['id'] = uuidv4();
    next();
  });

app.useGlobalGuards(new RolesGuard(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('Document Manager')
    .setDescription('API for user and document management')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
