"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DeleteButton } from "./delete-button";
import { type Book } from "@/app/types";

export function EditableBookCard({ book }: { book: Book }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave() {
    setIsSaving(true);
    const res = await fetch(`/api/books/${book.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        author,
        publish_date: book.publish_date,
        genre: book.genre,
      }),
    });

    if (res.ok) {
      setIsEditing(false);
      router.refresh();
    }
    setIsSaving(false);
  }

  function handleCancel() {
    setTitle(book.title);
    setAuthor(book.author);
    setIsEditing(false);
  }

  return (
    <Card className="break-inside-avoid">
      <CardHeader>
        {isEditing ? (
          <>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
          </>
        ) : (
          <>
            <CardTitle>{book.title}</CardTitle>
            <CardDescription>{book.author}</CardDescription>
          </>
        )}
        <CardAction>
          {isEditing ? (
            <Button variant="link" onClick={handleCancel}>
              Cancel
            </Button>
          ) : (
            <Button variant="link" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
        </CardAction>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex-col gap-2">
        {isEditing ? (
          <Button className="w-full" disabled={isSaving} onClick={handleSave}>
            {isSaving ? "Saving..." : "Save"}
          </Button>
        ) : (
          <DeleteButton bookId={book.id} />
        )}
      </CardFooter>
    </Card>
  );
}
