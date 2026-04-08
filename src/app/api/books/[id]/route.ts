import { NextResponse, type NextRequest } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { type BookInput } from "@/app/types";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const { env } = await getCloudflareContext({ async: true });
  const db = env.books;

  const { title, author, publish_date, genre } =
    (await request.json()) as BookInput;

  const result = await db
    .prepare(
      "UPDATE books SET title = ?, author = ?, publish_date = ?, genre = ? WHERE id = ?",
    )
    .bind(title, author, publish_date, genre, id)
    .run();

  if (!result.meta.changes) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: Number(id),
    title,
    author,
    publish_date,
    genre,
  });
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const { env } = await getCloudflareContext({ async: true });
  const db = env.books;

  const result = await db
    .prepare("DELETE FROM books WHERE id = ?")
    .bind(id)
    .run();

  if (!result.meta.changes) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Book deleted" });
}
