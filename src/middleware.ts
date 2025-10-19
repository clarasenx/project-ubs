// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode("ubs"); // use env em produção

async function isValidToken(token?: string) {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, SECRET, {
      algorithms: ["HS256"],
    });
    return payload.email && payload.password;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Rotas liberadas (login, estáticos e uma eventual API pública)
  const isPrivate = pathname === '/'

  const token = req.cookies.get("auth")?.value;
  const ok = await isValidToken(token);

  if (!isPrivate) {
    return NextResponse.next();
  }

  if (!ok) {
    const url = new URL("/login", req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Protege tudo, exceto caminhos estáticos e o próprio /login e /api/auth.
// Ajuste conforme suas pastas de estáticos.
export const config = {
  matcher: ["/((?!_next/|favicon|assets/|images/|public/|login|api/auth).*)"],
};
