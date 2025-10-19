import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function POST() {
  (await cookies()).set("auth", "", { httpOnly: true, path: "/", maxAge: 0 });
  return NextResponse.json({ ok: true });
}
