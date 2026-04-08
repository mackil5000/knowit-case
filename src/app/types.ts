import { z } from "zod";

export const bookInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  publish_date: z.string().min(1, "Publish date is required"),
  genre: z.string().min(1, "Genre is required"),
});

export type BookInput = z.infer<typeof bookInputSchema>;

export interface Book extends BookInput {
  id: number;
}
