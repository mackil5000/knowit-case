"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateBook } from "@/app/hooks/use-books";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AddBookForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const createBook = useCreateBook();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    createBook.mutate(
      {
        title: formData.get("title") as string,
        author: formData.get("author") as string,
        publish_date: formData.get("publish_date") as string,
        genre: formData.get("genre") as string,
      },
      { onSuccess: () => formRef.current?.reset() },
    );
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Add a New Book</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input id="author" name="author" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="publish_date">Publish Date</Label>
            <Input id="publish_date" name="publish_date" type="date" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="genre">Genre</Label>
            <Input id="genre" name="genre" required />
          </div>
          <div className="col-span-2 lg:col-span-4">
            <Button
              type="submit"
              disabled={createBook.isPending}
              className="w-full"
            >
              {createBook.isPending ? "Adding..." : "Add Book"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
