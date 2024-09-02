import { PrismaService } from "../prisma/prisma.service";

export async function getNextEmployeeId(
  prisma: PrismaService,
): Promise<number> {
  const lastEmployee = await prisma.employee.findFirst({
    orderBy: {
      employeeId: "desc",
    },
  });

  return lastEmployee ? lastEmployee.employeeId + 1 : 1;
}
