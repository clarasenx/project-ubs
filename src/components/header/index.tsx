import Image from "next/image"
import { ReactNode } from "react"

interface HeaderProps {
  children?: ReactNode
}

export const Header = ({ children }: HeaderProps) => {
  return (
    <header className="bg-[#0A8271] p-4">
      <div className="max-w-6xl flex justify-between items-center m-auto">
        <div className="flex gap-4 items-center">
          <Image
            height={50}
            width={50}
            src="/icon.jpg"
            alt="Logo"
            className="rounded-full"
          />
          <h1 className="font-bold text-white text-lg">
            UBS Conecta
          </h1>
        </div>

        {/* Área para links de navegação */}
        <nav className="flex gap-6 items-center text-white font-medium">
          {children}
        </nav>
      </div>
    </header>
  )
}
