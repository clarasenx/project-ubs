import Image from "next/image"

export const Header = () => {
  return (
    <header className="bg-[#0A8271] p-4">
      <div className="max-w-6xl flex gap-4 items-center m-auto">
        <Image
          height={50}
          width={50}
          src={'/icon.jpg'}
          alt="Logo"
          className="rounded-full"
        />
        <h1 className="font-bold text-white text-lg">
          UBS Conecta
        </h1>
      </div>
    </header>
  )
}