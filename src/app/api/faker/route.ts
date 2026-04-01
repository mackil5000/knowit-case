import { NextResponse, type NextRequest } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { faker } from "@faker-js/faker";

function generateBooks(count: number) {
  return Array.from({ length: count }, () => ({
    title: faker.book.title(),
    author: faker.book.author(),
    publish_date: faker.date.past({ years: 50 }).toISOString().split("T")[0],
    genre: faker.book.genre(),
  }));
}

export async function POST(request: NextRequest) {
  const { env } = await getCloudflareContext({ async: true });
  const db = env.books;

  const books = generateBooks(100);

  const stmt = db.prepare(
    "INSERT INTO books (title, author, publish_date, genre) VALUES (?, ?, ?, ?)",
  );

  await db.batch(
    books.map((book) =>
      stmt.bind(book.title, book.author, book.publish_date, book.genre),
    ),
  );

  return NextResponse.json({ message: `Inserted ${books.length} books` });
}
