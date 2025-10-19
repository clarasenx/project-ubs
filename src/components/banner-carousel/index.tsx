import Image from "next/image"
import Link from "next/link"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

interface ImageCarouselProps {
  items: {
    src: string
    href: string
    alt?: string
  }[]
}

export const ImageCarousel = ({ items }: ImageCarouselProps) => {
  return (
    <Carousel className="w-full max-w-sm m-auto ">
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index}>
              <Card>
                <CardContent className="flex items-center justify-center py-8">
                  <Link href={item.href} target="_blank">
                    <Image
                      src={item.src}
                      alt={item.alt || `Imagem ${index + 1}`}
                      height={200}
                      width={250}
                      className="object-cover w-full h-full"
                    />
                  </Link>
                </CardContent>
              </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
