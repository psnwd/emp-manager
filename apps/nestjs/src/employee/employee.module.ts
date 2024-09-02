import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";

import { PrismaModule } from "../prisma/prisma.module";
import { EmployeeController } from "./employee.controller";
import { EmployeeService } from "./employee.service";

@Module({
  imports: [PrismaModule],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes(
        { path: "employee", method: RequestMethod.GET },
        { path: "employee/:empId", method: RequestMethod.GET },
        { path: "employee", method: RequestMethod.POST },
        { path: "employee/:empId", method: RequestMethod.PUT },
        { path: "employee/:empId", method: RequestMethod.DELETE },
      );
  }
}
