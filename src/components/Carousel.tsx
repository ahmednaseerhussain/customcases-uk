'use client'
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  const images = [
    "https://cdn-stamplib.casetify.com/cms/image/e1460ae054f707c20e349e67b8426499.jpg",
    "https://cdn-stamplib.casetify.com/cms/image/e1460ae054f707c20e349e67b8426499.jpg",
    "https://cdn-stamplib.casetify.com/cms/image/e1460ae054f707c20e349e67b8426499.jpg",
    "https://cdn-stamplib.casetify.com/cms/image/e1460ae054f707c20e349e67b8426499.jpg",
    "https://cdn-stamplib.casetify.com/cms/image/e1460ae054f707c20e349e67b8426499.jpg",
  ];
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full overflow-hidden relative"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index}>
              <div>
                <Card>
                  <CardContent className="flex items-center justify-center relative  pb-0 px-0 overflow-hidden">
                    <img src={src} alt={`Image ${index + 1}`} className="object-cover w-full h-fit "  />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
