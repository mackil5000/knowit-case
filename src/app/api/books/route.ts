import { NextResponse, type NextRequest } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { type Book, bookInputSchema } from "@/app/types";
import z from "zod";

export async function getAllBooks() {
  const { env } = await getCloudflareContext({ async: true });
  const db = env.books;

  const result = await db
    .prepare("SELECT * FROM books ORDER BY id DESC")
    .all<Book>();
  return result.results;
}
export async function GET() {
  return NextResponse.json(await getAllBooks());
}

export async function POST(request: NextRequest) {
  const { env } = await getCloudflareContext({ async: true });
  const db = env.books;

  const parsed = bookInputSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: z.treeifyError(parsed.error) },
      { status: 400 },
    );
  }

  const { title, author, publish_date, genre } = parsed.data;

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
