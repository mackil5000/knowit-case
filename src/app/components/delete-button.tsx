"use client";

import { Button } from "@/components/ui/button";
import { useDeleteBook } from "@/app/hooks/use-books";

export function DeleteButton({ bookId }: { bookId: number }) {
  const deleteBook = useDeleteBook();

  return (
    <Button
      variant="destructive"
      className="w-full"
      disabled={deleteBook.isPending}
      onClick={() => deleteBook.mutate(bookId)}
    >
      {deleteBook.isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}
