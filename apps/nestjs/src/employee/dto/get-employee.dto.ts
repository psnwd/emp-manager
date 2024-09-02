import { Transform, TransformFnParams } from "class-transformer";
import { IsEmail, IsEnum, IsNumber, IsOptional } from "class-validator";

export enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export class GetEmployeeDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  page: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  items: number;

  @IsOptional()
  @Transform((params: TransformFnParams) => params.value.toUpperCase())
  @IsEnum(SortOrder, { message: "sort must be either ASC or DESC" })
  sort: SortOrder;
}

export class SearchEmployeeDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  empId: number;

  @IsOptional()
  @IsEmail()
  email: string;
}
