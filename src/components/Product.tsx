'use client'
import * as React from "react";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { products } from "@/config/products";
import MaxWidthWrapper from "./MaxWidthWrapper";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function ProductCards() {
  useEffect(() => {
    gsap.fromTo(
      ".underline",
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".underline",
          start: "top 80%",
          end: "top 60%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <MaxWidthWrapper className="pt-1 pb-10">
      <h1 className="relative text-start text-[24px] sm:text-[28px] md:text-[32px] lg:text-[38px] font-light">
        Recent Products<span className="font-semibold text-gradient">.</span>
        {/* Animated underline */}
        <span className="absolute left-1 rounded-lg bottom-0 w-[55%] sm:w-[22%] md:w-[50%] lg:w-[25%] h-[5px] bg-gradient-to-tr from-pink-300 to-blue-300 transform scale-x-0 origin-left transition-transform duration-6000 underline"></span>
      </h1>

      <div className="grid pt-10 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {products.map((product) => (
          <Card key={product.id} className="hover:zoom-in-50 w-full max-w-[250px] bg-white/100 border-blue-200/25 bg-gradient-to-tr from-blue-300/15 to-pink-300/5 backdrop-blur-lg transition-all shadow-md">
            <Link href={`/products/${product.id}`}>
              <CardContent className="flex justify-center items-center py-4">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </CardContent>
              <CardFooter className="flex flex-col justify-between text-center px-4">
                <span className="hover:underline">{product.title}</span>
                <span className="mt-2">
                  {product.discountedPrice} <br />
                  <span className="text-red-400 line-through">{product.price}</span>
                </span>
              </CardFooter>
            </Link>
          </Card>
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
