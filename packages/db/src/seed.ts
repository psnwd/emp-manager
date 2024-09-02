import { employees } from "./data/employee";
import { PrismaClient } from "./index";

export const prisma = new PrismaClient();

async function getNextEmployeeId() {
  const lastEmployee = await prisma.employee.findFirst({
    orderBy: {
      employeeId: "desc",
    },
  });

  return lastEmployee ? lastEmployee.employeeId + 1 : 1;
}

async function main() {
  for (const employee of employees) {
    const nextEmployeeId = await getNextEmployeeId();
    await prisma.employee.upsert({
      where: { email: employee.email },
      update: {},
      create: {
        employeeId: nextEmployeeId,
        firstName: employee.first_name,
        lastName: employee.last_name,
        email: employee.email,
        number: employee.number,
        gender: employee.gender as "M" | "F",
        photo: employee.photo,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
