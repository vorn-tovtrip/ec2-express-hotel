import { z } from "zod";
import { CreateAmentitiesSchema } from "../utils/schema/amentities";

export type CreateAmentitiesDTO = z.infer<typeof CreateAmentitiesSchema>;
