import { NextResponse, type NextRequest } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { bookInputSchema } from "@/app/types";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const { env } = await getCloudflareContext({ async: true });
  const db = env.books;

  const parsed = bookInputSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { title, author, publish_date, genre } = parsed.data;

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

export async function deleteBookById(id: number) {
  const { env } = await getCloudflareContext({ async: true });
  const db = env.books;

  const result = await db
    .prepare("DELETE FROM books WHERE id = ?")
    .bind(id)
    .run();

  return result.meta.changes > 0;
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;

  const deleted = await deleteBookById(Number(id));

  if (!deleted) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Book deleted" });
}
