"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AddBookForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const res = await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.get("title"),
        author: formData.get("author"),
        publish_date: formData.get("publish_date"),
        genre: formData.get("genre"),
      }),
    });

    if (res.ok) {
      form.reset();
      router.refresh();
    }
    setIsSubmitting(false);
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Add a New Book</CardTitle>
      </CardHeader>
      <CardContent>
        <form
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
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Adding..." : "Add Book"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
