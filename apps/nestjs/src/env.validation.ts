import { plainToInstance } from "class-transformer";
import { IsString, validateSync } from "class-validator";

class EnvironmentVariables {
  @IsString()
  NEXT_PUBLIC_BASE_API_URL: string;
}

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
