import { z } from "zod";

export const TodoSchema = z.object({
  id: z.number().optional(),
  todo: z
    .string()
    .min(1, { message: "Todo Content must not be empty." })
    .max(100, { message: "Todo Content must not exceed 100 characters." }),
});

export type Todo = z.infer<typeof TodoSchema>;
