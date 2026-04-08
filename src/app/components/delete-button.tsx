"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function DeleteButton({ bookId }: { bookId: number }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    const res = await fetch(`/api/books/${bookId}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    }
    setIsDeleting(false);
  }

  return (
    <Button
      variant="destructive"
      className="w-full"
      disabled={isDeleting}
      onClick={handleDelete}
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </Button>
  );
}
