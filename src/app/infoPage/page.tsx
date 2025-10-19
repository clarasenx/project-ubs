import { ImageCarousel } from "@/components/banner-carousel";
import WhatsAppInfoCard from "@/components/call-to-action/WhatsAppInfoCard";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import WhatsAppFloatingButton from "@/components/whatsapp";
import Image from "next/image";

export default function InfoPage() {
  return (
    <div className="bg-gray-50 h-dvh overflow-hidden">
      {/* Header fixo na parte de cima */}
      <Header>
        <a className="hover:underline">
          Início
        </a>
        <a className="hover:underline">
          Informações
        </a>
        <a className="hover:underline">
          Contato
        </a>
      </Header>

      {/* Conteúdo ocupa o restante da viewport sem criar scroll */}
      <main className="max-w-6xl mx-auto w-full p-6 grid gap-6 lg:grid-cols-2 items-center grid-cols-1 h-full overflow-hidden">
        {/* Coluna esquerda: Carousel em card com altura controlada */}
        <section className="h-full">
          <div className="h-full rounded-2xl overflow-hidden">
            <div className="h-full">
              {/* Wrapper com altura limitada para evitar overflow */}
              <div className="h-full flex  justify-center">
                <ImageCarousel
                  items={[
                    {
                      src: "/CampanhaOutubroRosa.jpeg",
                      href: "https://www.instagram.com/p/DPoQDZJgNkF/?igsh=c2puYmJqYXdpd3Nk",
                    },
                    {
                      src: "/CampanhaMultivacinação.jpeg",
                      href: "https://www.instagram.com/p/DP6i3STjZw3/?igsh=ZWY5YTJpdnJuZnJ2",
                    },
                    {
                      src: "/VacinaSarampo.jpeg",
                      href: "https://www.instagram.com/p/DNqIBrOM4YF/?igsh=cWU1ZnMya21ocGMw",
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Coluna direita: dois cards empilhados, cada um ocupando metade da coluna */}
        <section className="h-full flex flex-col gap-6 overflow-hidden">
          {/* Card CTA WhatsApp */}
          <div className="bg-white rounded-2xl shadow border border-gray-100 p-0 overflow-hidden">
            <div className="h-full flex items-center justify-center p-6">
              {/* Mantém o conteúdo centralizado e sem estourar */}
              <div className="w-full max-w-md">
                <WhatsAppInfoCard />
              </div>
            </div>
          </div>

          {/* Card Mapa + Botão */}
          <Card className="overflow-hidden">
            <CardContent className="h-full flex flex-col items-center justify-between p-4">
              {/* Imagem com altura limitada para não criar scroll */}
              <div className="w-full rounded-xl overflow-hidden border border-gray-100">
                <Image
                  height={150}
                  width={450}
                  src="/mapa.jpg"
                  alt="Logo"
                  className="w-full h-48 object-cover md:h-56"
                />
              </div>

              <Button
                variant="default"
                className="bg-[#0A8271] hover:bg-[#09483F] text-white hover:border-[#09483F] border-[#0A8271] mt-4 border-2 cursor-pointer"
              >
                Procurar UBS mais perto
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Botão flutuante permanece fixo e não interfere no layout/scroll */}
      <WhatsAppFloatingButton />
    </div>
  );
}
