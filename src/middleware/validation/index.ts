import { ZodSchema } from "zod";
import { handleResponse } from "../../utils";

export const validationSchema = <T>(
  res,
  schema: ZodSchema<T>,
  body: T,
  next
) => {
  const validation = schema.safeParse(body);
  if (!validation.success) {
    const message = validation.error.errors;
    console.log("Validation schema caught");

    return handleResponse(res, 400, "validation failed", message);
  }
  next();
};
