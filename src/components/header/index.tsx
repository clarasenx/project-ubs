"use client";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import LogoutButton from "../loggoutButton";
import Link from "next/link";

interface HeaderProps {
  children?: ReactNode;
}

export const Header = ({ children }: HeaderProps) => {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const isAuth = document.cookie.includes("auth=");
    setLogged(isAuth);
  }, []);

  return (
    <header className="bg-[#0A8271] p-4">
      <div className="max-w-6xl flex justify-between items-center m-auto">
        <Link href={"/infoPage"}>
          <div className="flex gap-4 items-center">
            <Image
              height={50}
              width={50}
              src="/icon.jpg"
              alt="Logo"
              className="rounded-full"
            />
            <h1 className="font-bold text-white text-lg">UBS Conecta</h1>
          </div>
        </Link>

        {/* Área para links de navegação */}
        <nav className="hidden md:flex gap-6 items-center text-white font-medium">
          {children}
        </nav>

        {logged ? <LogoutButton /> : null}
      </div>
    </header>
  );
};
