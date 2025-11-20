// app/api/newsletters/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const newslettersDirectory = path.join(
      process.cwd(),
      "public/images/newsletters"
    );
    const filenames = fs.readdirSync(newslettersDirectory);

    const newsletters = filenames
      .filter((filename) => /\.(jpg|jpeg|png|gif|webp|pdf)$/i.test(filename))
      .map((filename) => ({
        name: filename.replace(/\.[^/.]+$/, "").replace(/-|_/g, " "),
        path: `/images/newsletters/${filename}`,
      }));

    return NextResponse.json(newsletters);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read newsletters directory" },
      { status: 500 }
    );
  }
}
