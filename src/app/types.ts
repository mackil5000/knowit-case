export interface Book {
  id: number;
  title: string;
  author: string;
  publish_date: string;
  genre: string;
}

export type BookInput = Omit<Book, "id">;
