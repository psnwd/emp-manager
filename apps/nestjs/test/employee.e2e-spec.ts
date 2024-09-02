import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";

import { AppModule } from "./../src/app.module";

describe("AppController (e2e)", () => {
  let app: INestApplication;
  let empId: number;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/ (GET)", () => {
    return request(app.getHttpServer())
      .get("/")
      .expect(200)
      .expect("Hello World!");
  });

  it("/employee (POST)", async () => {
    return request(app.getHttpServer())
      .post("/employee")
      .send({
        first_name: "John",
        last_name: "Doe",
        email: "some@example.com",
        number: "+94710000000",
        gender: "M",
        photo: "https://randomuser.me/api/portraits/men/86.jpg",
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toMatchObject({
          firstName: "John",
          lastName: "Doe",
          email: "some@example.com",
          number: "+94710000000",
          gender: "M",
          photo: "https://randomuser.me/api/portraits/men/86.jpg",
          deleted: false,
          deletedAt: null,
        });

        empId = response.body.employeeId;

        expect(response.body.id).toMatch(/^[0-9a-fA-F]{24}$/);
        expect(response.body.employeeId).toBeGreaterThan(0);
        expect(new Date(response.body.createdAt)).toBeInstanceOf(Date);
        expect(new Date(response.body.updatedAt)).toBeInstanceOf(Date);
      });
  });

  it("/employee/1 (PUT)", async () => {
    const response = await request(app.getHttpServer())
      .put(`/employee/${empId}`)
      .send({
        first_name: "John",
        last_name: "Doe",
        email: "some@example.com",
        number: "+94000000000",
        gender: "M",
        photo: "https://randomuser.me/api/portraits/men/85.jpg",
      })
      .expect(200);

    expect(response.body).toMatchObject({
      firstName: "John",
      lastName: "Doe",
      email: "some@example.com",
      number: "+94000000000",
      gender: "M",
      photo: "https://randomuser.me/api/portraits/men/85.jpg",
    });

    expect(response.body.updatedAt).toBeTruthy();
    expect(new Date(response.body.updatedAt)).toBeInstanceOf(Date);
  });

  it("/employee (GET)", async () => {
    const response = await request(app.getHttpServer())
      .get("/employee")
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);

    response.body.forEach(
      (employee: {
        photo: any;
        id: any;
        employeeId: any;
        createdAt: string | number | Date;
        updatedAt: string | number | Date;
        deletedAt: string | number | Date;
      }) => {
        expect(employee).toMatchObject({
          firstName: expect.any(String),
          lastName: expect.any(String),
          email: expect.any(String),
          number: expect.any(String),
          gender: expect.stringMatching(/M|F/),
          deleted: expect.any(Boolean),
        });

        expect(employee.photo).toMatch(/^https?:\/\/.+\..+/);

        expect(employee.id).toMatch(/^[0-9a-fA-F]{24}$/);

        expect(employee.employeeId).toBeGreaterThan(0);

        expect(new Date(employee.createdAt)).toBeInstanceOf(Date);
        expect(new Date(employee.updatedAt)).toBeInstanceOf(Date);

        if (employee.deletedAt !== null) {
          expect(new Date(employee.deletedAt)).toBeInstanceOf(Date);
        } else {
          expect(employee.deletedAt).toBeNull();
        }
      },
    );
  });

  it("/employee/search (GET)", async () => {
    const response = await request(app.getHttpServer())
      .get("/employee/search")
      .query({ empId })
      .expect(200);

    expect(response.body).toMatchObject({
      firstName: expect.any(String),
      lastName: expect.any(String),
      email: expect.any(String),
      number: expect.any(String),
      gender: expect.stringMatching(/M|F/),
      photo: expect.stringMatching(/^https?:\/\/.+\..+/),
      deleted: expect.any(Boolean),
    });

    expect(response.body.id).toMatch(/^[0-9a-fA-F]{24}$/);
    expect(response.body.employeeId).toBe(empId);
    expect(new Date(response.body.createdAt)).toBeInstanceOf(Date);
    expect(new Date(response.body.updatedAt)).toBeInstanceOf(Date);

    if (response.body.deletedAt !== null) {
      expect(new Date(response.body.deletedAt)).toBeInstanceOf(Date);
    } else {
      expect(response.body.deletedAt).toBeNull();
    }
  });

  it("/employee/search (GET)", async () => {
    const response = await request(app.getHttpServer())
      .get("/employee/search")
      .query({ email: "some@example.com" })
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);

    response.body.forEach(
      (employee: {
        id: any;
        employeeId: any;
        createdAt: string | number | Date;
        updatedAt: string | number | Date;
        deletedAt: string | number | Date;
      }) => {
        expect(employee).toMatchObject({
          firstName: expect.any(String),
          lastName: expect.any(String),
          email: expect.stringMatching("some@example.com"),
          number: expect.any(String),
          gender: expect.stringMatching(/M|F/),
          photo: expect.stringMatching(/^https?:\/\/.+\..+/),
          deleted: expect.any(Boolean),
        });

        expect(employee.id).toMatch(/^[0-9a-fA-F]{24}$/);
        expect(employee.employeeId).toBeGreaterThan(0);

        expect(new Date(employee.createdAt)).toBeInstanceOf(Date);
        expect(new Date(employee.updatedAt)).toBeInstanceOf(Date);

        if (employee.deletedAt !== null) {
          expect(new Date(employee.deletedAt)).toBeInstanceOf(Date);
        } else {
          expect(employee.deletedAt).toBeNull();
        }
      },
    );
  });

  it("/employee/:empId (DELETE)", async () => {
    const deleteResponse = await request(app.getHttpServer())
      .delete(`/employee/${empId}`)
      .expect(200);

    expect(deleteResponse.body).toMatchObject({
      error: false,
      message: `Employee with ID "${empId}" has been marked as deleted.`,
    });

    await request(app.getHttpServer()).get(`/employee/${empId}`).expect(404);
  });

  afterAll(async () => {
    await app.close();
  });
});
