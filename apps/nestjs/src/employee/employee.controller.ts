import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";

import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { GetEmployeeDto, SearchEmployeeDto } from "./dto/get-employee.dto";
import { EmployeeService } from "./employee.service";

@Controller({ version: "1", path: "employee" })
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get()
  async findAll(@Query() query: GetEmployeeDto) {
    const { page = 1, items = 10, sort } = query;
    if (page < 1) {
      throw new BadRequestException("Page must be 1 or greater than 1");
    }
    if (items < 5) {
      throw new BadRequestException("Items must be 5 or greater than 5");
    }
    return this.employeeService.findAll(page, items, sort);
  }

  @Get("/search")
  async findOne(@Query() query: SearchEmployeeDto) {
    return this.employeeService.findOne(query.empId, query.email);
  }

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Put(":empId")
  async update(
    @Param("empId", ParseIntPipe) empId: number,
    @Body() updateEmployeeDto: CreateEmployeeDto,
  ) {
    return this.employeeService.update(empId, updateEmployeeDto);
  }

  @Delete(":empId")
  async remove(@Param("empId", ParseIntPipe) empId: number) {
    return this.employeeService.remove(empId);
  }
}
