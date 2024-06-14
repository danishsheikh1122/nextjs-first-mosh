import { z } from "zod";

const schema=z.object({
  id: z.string(),
  name: z.string().min(1, "Invalid name"),
  age: z.number().min(0, "Invalid age"),
  country: z.string().min(3, "Invalid country"),
});

export default schema