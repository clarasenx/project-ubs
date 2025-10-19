import { ImageCarousel } from "@/components/banner-carousel";
import WhatsAppInfoCard from "@/components/call-to-action/WhatsAppInfoCard";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import WhatsAppFloatingButton from "@/components/whatsapp";
import Image from "next/image";

export default function InfoPage() {
  return (
    <div className="bg-gray-50 min-h-screen lg:h-dvh">
      {/* Header fixo na parte de cima */}
      <Header>
        <a className="hover:underline">Início</a>
        <a className="hover:underline">Informações</a>
        <a className="hover:underline">Contato</a>
      </Header>

      {/* Conteúdo: mobile com scroll; desktop ocupa a viewport sem scroll */}
      <main className="
        max-w-6xl mx-auto w-full
        px-4 py-6 sm:p-6
        grid gap-6 grid-cols-1 lg:grid-cols-2
        lg:h-full lg:overflow-hidden lg:items-center
      ">
        {/* Coluna esquerda: Carousel */}
        <section className="h-auto lg:h-full">
          <div className="h-auto lg:h-full rounded-2xl overflow-hidden">
            <div className="h-auto lg:h-full">
              <div className="h-auto lg:h-full flex justify-center">
                {/* No mobile, limita visual com aspect ratio; no desktop preenche a coluna */}
                <div className="w-full max-w-[980px] aspect-video lg:aspect-auto lg:h-full">
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
          </div>
        </section>

        {/* Coluna direita: dois cards empilhados */}
        <section className="
          h-auto lg:h-full
          flex flex-col gap-6
          lg:overflow-hidden
        ">
          {/* Card CTA WhatsApp */}
          <div className="bg-white rounded-2xl shadow border border-gray-100 p-0 overflow-hidden">
            <div className="h-full flex items-center justify-center p-4 sm:p-6">
              <div className="w-full max-w-md">
                <WhatsAppInfoCard />
              </div>
            </div>
          </div>

          {/* Card Mapa + Botão (não alteramos o ícone/imagem do botão) */}
          <Card className="overflow-hidden">
            <CardContent className="h-full flex flex-col items-center justify-between p-4">
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

      {/* Botão flutuante permanece fixo */}
      <WhatsAppFloatingButton />
    </div>
  );
}