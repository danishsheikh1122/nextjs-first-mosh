import { z } from "zod";

const schema=z.object({
  // id: z.string(),
  email:z.string().email(),
  name: z.string().min(1, "Invalid name"),
  followers: z.number().min(0, "Invalid age"),
});

export default schema