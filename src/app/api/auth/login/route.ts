import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

type userType = { email: string; password: string };

const users: userType[] = [
  {
    email: "atendimento@ubs.gov.br",
    password: "portovelho2025",
  },
];

export async function POST(req: Request) {
  const body: userType = await req.json();

  const user = users.find(
    (element) =>
      element.email === body.email && element.password === body.password
  );

  if (user) {
    const token = jwt.sign(user, "ubs", { expiresIn: "1d" });
    (await cookies()).set("auth", token, {
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return NextResponse.json({ ok: true });
  } else {
    return NextResponse.json({ error: "invalid" }, { status: 401 });
  }
}
