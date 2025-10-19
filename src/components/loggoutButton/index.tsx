"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function LogoutButton() {
  const router = useRouter();

  const onLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST", cache: "no-store" });
    } finally {
      // garante que o middleware bloqueie após remoção do cookie
      router.replace("/login");
    }
  };

  return (
    <Button onClick={onLogout} variant="outline">
      Sair
    </Button>
  );
}
