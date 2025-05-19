import { z } from "zod";

export const AmenitySchema = z.object({
  name: z.string().nonempty(),
  iconSvg: z.string().nonempty(),
});

export const CreateAmentitiesSchema = AmenitySchema;
