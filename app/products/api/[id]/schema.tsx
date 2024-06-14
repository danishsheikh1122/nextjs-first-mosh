import { z } from "zod";

const schema = z.object({
  id: z.number().min(0, "Invalid Id"),
  name: z.string().min(2, "Invalid Product Name"),
  price: z.number().min(0, "Price Can't Be Negative"),
});

export default schema;
