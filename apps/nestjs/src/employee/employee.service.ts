import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";

import { Gender } from "@emp/db";

import { PrismaService } from "../prisma/prisma.service";
import { getNextEmployeeId } from "../utils/common";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { SortOrder } from "./dto/get-employee.dto";

@Injectable()
export class EmployeeService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private prisma: PrismaService,
  ) {}

  async create(data: CreateEmployeeDto) {
    try {
      const nextEmployeeId = await getNextEmployeeId(this.prisma);
      const employee = await this.prisma.employee.create({
        data: {
          employeeId: nextEmployeeId,
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          number: data.number,
          gender: data.gender as Gender,
          photo: data.photo,
          deletedAt: null,
        },
      });

      return employee;
    } catch (error) {
      if (error.code === "P2002") {
        throw new ConflictException(
          "An employee with this email already exists.",
        );
      }
      console.log("[EmployeeService] create error", error);
      throw new InternalServerErrorException("An unexpected error occurred.");
    }
  }

  async findAll(page: number, items: number, sort: SortOrder = SortOrder.ASC) {
    try {
      const employees = await this.prisma.employee.findMany({
        skip: (Number(page) - 1) * Number(items),
        take: Number(items),
        where: {
          deleted: false,
        },
        orderBy: {
          employeeId: sort === SortOrder.ASC ? "asc" : "desc",
        },
      });

      return employees;
    } catch (error) {
      if (error.code === "P2021") {
        throw new BadRequestException("Invalid query parameter.");
      }
      console.log("[EmployeeService] findAll error", error);
      throw new InternalServerErrorException(
        "An unexpected error occurred while fetching employees.",
      );
    }
  }

  async findOne(id?: number, email?: string) {
    try {
      const employee = await this.prisma.employee.findUnique({
        where: {
          employeeId: Number(id) || undefined,
          email: email || undefined,
          deleted: false,
        },
      });

      if (!employee) {
        return {
          error: false,
          message: `Employee with ID "${id}" or email "${email}" does not exist.`,
        };
      }

      return employee;
    } catch (error) {
      if (error.code === "P2025") {
        return {
          error: false,
          message: `Employee with ID "${id}" or email "${email}" does not exist.`,
        };
      }
      console.log("[EmployeeService] findOne error", error);
      throw new InternalServerErrorException(
        "An unexpected error occurred while fetching the employee.",
      );
    }
  }

  async update(id: number, updateEmployeeDto: any) {
    try {
      const employee = await this.prisma.employee.update({
        where: { employeeId: Number(id), deleted: false },
        data: {
          firstName: updateEmployeeDto.first_name,
          lastName: updateEmployeeDto.last_name,
          email: updateEmployeeDto.email,
          number: updateEmployeeDto.number,
          gender: updateEmployeeDto.gender,
          photo: updateEmployeeDto.photo,
        },
      });

      return employee;
    } catch (error) {
      if (error.code === "P2025") {
        throw new NotFoundException(`Employee with ID ${id} not found.`);
      }
      if (error.code === "P2002") {
        throw new ConflictException(
          "Update failed due to a unique constraint violation.",
        );
      }
      console.log("[EmployeeService] update error", error);
      throw new InternalServerErrorException(
        "An unexpected error occurred while updating the employee.",
      );
    }
  }

  async remove(id: number) {
    try {
      const employee = await this.prisma.employee.findUnique({
        where: {
          employeeId: Number(id),
          deleted: true,
        },
      });

      if (employee) {
        return {
          error: false,
          message: `Employee with ID "${id}" is already deleted.`,
        };
      }

      await this.prisma.employee.update({
        where: {
          employeeId: Number(id),
        },
        data: { deleted: true, deletedAt: new Date() },
      });

      return {
        error: false,
        message: `Employee with ID "${id}" has been marked as deleted.`,
      };
    } catch (error) {
      if (error.code === "P2025") {
        return {
          error: false,
          message: `Employee with ID "${id}" does not exist.`,
        };
      }
      console.log("[EmployeeService] remove error", error);
      throw new InternalServerErrorException(
        "An unexpected error occurred while removing the employee.",
      );
    }
  }
}
