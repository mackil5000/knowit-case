"use client";

import { useBooks } from "./hooks/use-books";
import { EditableBookCard } from "./components/editable-book-card";
import { AddBookForm } from "./components/add-book-form";

export default function Home() {
  const { data: books = [], isLoading } = useBooks();

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="container mx-auto max-w-7xl">
        <AddBookForm />
        {isLoading ? (
          <p className="text-center text-muted-foreground">Loading books...</p>
        ) : books.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No books yet — add one above!
          </p>
        ) : (
          <main className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {books.map((book) => (
              <EditableBookCard key={book.id} book={book} />
            ))}
          </main>
        )}
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          Footer
        </footer>
      </div>
    </div>
  );
}
