import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { type Book, type BookInput } from "@/app/types";
import { toast } from "sonner";

export function useCreateBook() {
  const router = useRouter();
  return useMutation({
    mutationFn: async (book: BookInput) => {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });
      if (!res.ok) throw new Error("Failed to create book");
      return res.json();
    },
    onSuccess: () => {
      router.refresh();
      toast.success("Book added");
    },
    onError: () => toast.error("Failed to add book"),
  });
}

export function useUpdateBook() {
  const router = useRouter();
  return useMutation({
    mutationFn: async ({ id, ...book }: Book) => {
      const res = await fetch(`/api/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });
      if (!res.ok) throw new Error("Failed to update book");
      return res.json();
    },
    onSuccess: () => {
      router.refresh();
      toast.success("Book updated");
    },
    onError: () => toast.error("Failed to update book"),
  });
}

export function useDeleteBook() {
  const router = useRouter();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/books/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete book");
      return res.json();
    },
    onSuccess: () => {
      router.refresh();
      toast.success("Book deleted");
    },
    onError: () => toast.error("Failed to delete book"),
  });
}
