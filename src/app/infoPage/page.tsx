import { ImageCarousel } from '@/components/banner-carousel';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image';

export default function InfoPage() {
  return (
    <div className='min-h-screen bg-gray-100'>
      <Header>
        <a href="/home" className="hover:underline">Início</a>
        <a href="/info" className="hover:underline">Informações</a>
        <a href="/contact" className="hover:underline">Contato</a>
      </Header>

      <section className='w-full flex justify-around mt-10 mb-6 mx-auto max-w-6xl'>
        <ImageCarousel
          items={[
            { src: "/CampanhaOutubroRosa.jpeg", href: "https://www.instagram.com/p/DPoQDZJgNkF/?igsh=c2puYmJqYXdpd3Nk" },
            { src: "/CampanhaMultivacinação.jpeg", href: "https://www.instagram.com/p/DP6i3STjZw3/?igsh=ZWY5YTJpdnJuZnJ2" },
            { src: "/VacinaSarampo.jpeg", href: "https://www.instagram.com/p/DNqIBrOM4YF/?igsh=cWU1ZnMya21ocGMw" },
          ]}
        />

        <Card>
          <CardContent className="flex flex-col items-center justify-center px-4 py-3">
            <Image
              height={150}
              width={450}
              src="/mapa.jpg"
              alt="Logo"
            />
            <Button variant="default" className='bg-[#0A8271] hover:bg-[#09483F] text-white hover:border-[#09483F] border-[#0A8271] mt-4 border-2 cursor-pointer'>Procurar UBS mais perto</Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}