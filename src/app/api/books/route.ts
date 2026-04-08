import { NextResponse, type NextRequest } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { type BookInput, type Book } from "@/app/types";

export async function getAllBooks() {
  const { env } = await getCloudflareContext({ async: true });
  const db = env.books;

  const result = await db.prepare("SELECT * FROM books").all<Book>();
  return result.results;
}
export async function GET() {
  return NextResponse.json(await getAllBooks());
}

export async function POST(request: NextRequest) {
  const { env } = await getCloudflareContext({ async: true });
  const db = env.books;

  const { title, author, publish_date, genre } =
    (await request.json()) as BookInput;

  const result = await db
    .prepare(
      "INSERT INTO books (title, author, publish_date, genre) VALUES (?, ?, ?, ?)",
    )
    .bind(title, author, publish_date, genre)
    .run();

  return NextResponse.json(
    { id: result.meta.last_row_id, title, author, publish_date, genre },
    { status: 201 },
  );
}
