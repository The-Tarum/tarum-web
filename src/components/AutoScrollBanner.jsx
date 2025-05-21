// src/components/AutoScrollBanner.jsx
"use client"

import React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const slideImage = [
  "https://tarumimagebucket.s3.us-east-1.amazonaws.com/banner-images/a.png",
  "https://tarumimagebucket.s3.us-east-1.amazonaws.com/banner-images/b.jpg",
  "https://tarumimagebucket.s3.us-east-1.amazonaws.com/banner-images/c.jpg",
]

export default function AutoScrollBanner() {
  return (
    <Carousel
      plugins={[Autoplay({ delay: 2000, stopOnInteraction: true })]}
      className="w-full overflow-hidden relative group rounded-xl"
      opts={{ loop: true }}
    >
      <CarouselContent>
        {slideImage.map((src, i) => (
          <CarouselItem
            key={i}
            className="flex-shrink-0"
            style={{ width: `${100 / slideImage.length}%` }}
          >
            <div className="h-[150px] mx-3 flex items-center justify-center rounded-xl overflow-hidden">
              <img
                src={src}
                alt={`Slide ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}