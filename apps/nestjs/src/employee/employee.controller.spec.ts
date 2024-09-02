import { Test, TestingModule } from "@nestjs/testing";

import { $Enums } from "@emp/db";

import { PrismaModule } from "../prisma/prisma.module";
import { Gender } from "./dto/create-employee.dto";
import { SortOrder } from "./dto/get-employee.dto";
import { EmployeeController } from "./employee.controller";
import { EmployeeService } from "./employee.service";

describe("EmployeeController", () => {
  let employeeController: EmployeeController;
  let empId: number;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [EmployeeController],
      providers: [EmployeeService],
    }).compile();

    employeeController = app.get<EmployeeController>(EmployeeController);
  });

  it("should be defined", () => {
    expect(employeeController).toBeDefined();
  });

  describe("root", () => {
    it("/employee (GET) should return an array of employees", async () => {
      const result = await employeeController.findAll({
        page: 1,
        items: 10,
        sort: SortOrder.ASC,
      });

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);

      result.forEach((employee) => {
        expect(employee).toHaveProperty("id");
        expect(employee).toHaveProperty("employeeId");
        expect(employee).toHaveProperty("firstName");
        expect(employee).toHaveProperty("lastName");
        expect(employee).toHaveProperty("email");
        expect(employee).toHaveProperty("number");
        expect(employee).toHaveProperty("gender");
        expect(employee).toHaveProperty("photo");
        expect(employee).toHaveProperty("deleted");
        expect(employee).toHaveProperty("deletedAt");
        expect(employee).toHaveProperty("createdAt");
        expect(employee).toHaveProperty("updatedAt");
      });
    });

    it("/employee (GET) should return an array of employees", async () => {
      const response = await employeeController.findAll({
        page: 1,
        items: 10,
        sort: SortOrder.ASC,
      });

      expect(response).toBeInstanceOf(Array);

      response.forEach(
        (employee: {
          id: string;
          employeeId: number;
          firstName: string;
          lastName: string;
          email: string;
          number: string;
          gender: string;
          photo: string;
          deleted: boolean;
          deletedAt: Date | string | null;
          createdAt: Date | string;
          updatedAt: Date | string;
        }) => {
          expect(employee).toMatchObject({
            firstName: expect.any(String),
            lastName: expect.any(String),
            email: expect.any(String),
            number: expect.any(String),
            gender: expect.any(String),
            deleted: expect.any(Boolean),
          });

          expect(employee.photo).toMatch(/^https?:\/\/.+\..+/);

          expect(employee.id).toMatch(/^[0-9a-fA-F]{24}$/);

          expect(employee.employeeId).toBeGreaterThan(0);

          expect(employee.createdAt).toBeInstanceOf(Date);
          expect(employee.updatedAt).toBeInstanceOf(Date);

          if (employee.deletedAt !== null) {
            expect(employee.deletedAt).toBeInstanceOf(Date);
          } else {
            expect(employee.deletedAt).toBeNull();
          }
        },
      );
    });

    it("/employee (POST) should create a new employee", async () => {
      const response: {
        id: string;
        employeeId: number;
        firstName: string;
        lastName: string;
        email: string;
        number: string;
        gender: $Enums.Gender;
        photo: string;
        deleted: boolean;
        deletedAt: Date | string | null;
        createdAt: Date | string;
        updatedAt: Date | string;
      } = await employeeController.create({
        first_name: "John",
        last_name: "Doe",
        email: "some@example.com",
        number: "+94710000000",
        gender: "M" as Gender,
        photo: "https://randomuser.me/api/portraits/men/86.jpg",
      });

      expect(response).toMatchObject({
        firstName: "John",
        lastName: "Doe",
        email: "some@example.com",
        number: "+94710000000",
        gender: "M",
        photo: "https://randomuser.me/api/portraits/men/86.jpg",
        deleted: false,
        deletedAt: null,
      });

      empId = response.employeeId;

      expect(response.id).toMatch(/^[0-9a-fA-F]{24}$/);
      expect(response.employeeId).toBeGreaterThan(0);
      expect(response.createdAt).toBeInstanceOf(Date);
      expect(response.updatedAt).toBeInstanceOf(Date);
    });

    it("/employee (PUT) should update an existing employee", async () => {
      const updateResponse = await employeeController.update(empId, {
        first_name: "John",
        last_name: "Doe",
        email: "some@example.com",
        number: "+94710000000",
        gender: "M" as Gender,
        photo: "https://randomuser.me/api/portraits/men/86.jpg",
      });

      expect(updateResponse).toMatchObject({
        id: expect.any(String),
        employeeId: empId,
        firstName: "John",
        lastName: "Doe",
        email: "some@example.com",
        number: "+94710000000",
        gender: "M",
        photo: "https://randomuser.me/api/portraits/men/86.jpg",
        deleted: false,
        deletedAt: null,
      });

      expect(updateResponse.id).toMatch(/^[0-9a-fA-F]{24}$/);
      expect(updateResponse.employeeId).toBe(empId);
      expect(new Date(updateResponse.createdAt)).toBeInstanceOf(Date);
      expect(new Date(updateResponse.updatedAt)).toBeInstanceOf(Date);
    });

    it("/employee (DELETE) should mark the employee as deleted", async () => {
      const deleteResponse = await employeeController.remove(empId);

      expect(deleteResponse).toMatchObject({
        error: false,
        message: `Employee with ID "${empId}" has been marked as deleted.`,
      });
    });
  });
});
