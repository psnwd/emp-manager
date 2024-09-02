import { ValidationPipe, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { PrismaClient } from "@emp/db";

import { AppModule } from "./app.module";
import { PrismaService } from "./prisma/prisma.service";

export const prisma = new PrismaClient();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(PrismaService);
  await prismaService.$connect();

  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4000);
  console.log("Local: http://localhost:4000");
}
bootstrap();
