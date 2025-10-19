"use client";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, LogIn } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (res.ok) window.location.href = "/";
    else
      setError(
        "Credenciais inválidas."
      );
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="px-4">
        <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10 py-14 lg:py-20">
          <section className="hidden lg:flex flex-col justify-center">
            <Image
              height={50}
              width={50}
              src="/icon.jpg"
              alt="Logo"
              className="rounded-full"
            />
            <div className="h-1 w-16 rounded-full bg-[#0A8271]" />
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight">
              Painel da <span className="text-[#0A8271]">UBS Conecta</span>
            </h1>
            <p className="mt-4 text-neutral-600 max-w-md">
              Veja agendamentos da UBS e controle a agenda das UBS
            </p>
          </section>
          <section className="flex items-center">
            <form
              onSubmit={submit}
              className="w-full bg-white border border-neutral-200 rounded-2xl shadow-[0_10px_30px_-12px_rgba(0,0,0,0.15)] p-6 md:p-8"
            >
              <div className="mb-6">
                <div className="text-[11px] uppercase tracking-[0.14em] text-neutral-500">
                  Acesso
                </div>
                <h2 className="text-2xl font-semibold mt-1">Login</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-neutral-700">E-mail</label>
                  <Input
                    placeholder="farmacia@exemplo.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-neutral-700">Senha</label>
                  <div className="relative">
                    <Input
                      placeholder="••••••••"
                      type={show ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShow((s) => !s)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md hover:bg-neutral-100 text-neutral-600"
                    >
                      {show ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                {error && (
                  <div className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                    {error}
                  </div>
                )}
                <Button
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-[#0A8271] hover:bg-[#09483F] cursor-pointer "
                >
                  <LogIn size={16} />
                  {loading ? "Entrando..." : "Entrar"}
                </Button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
