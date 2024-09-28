'use client'
import React, { useState } from 'react';
import { useParams } from "next/navigation";
import { products } from "@/config/products";
import Link from "next/link";
import { Star, Heart, ShoppingCart, Truck, Package, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Box } from 'lucide-react';
import '@google/model-viewer';

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((product) => product.id === parseInt(id as string));

  if (!product) {
    return <p>Product not found</p>;
  }

  const [currentImage, setCurrentImage] = useState(0);
  const [loading3D, setLoading3D] = useState(true); // Loading state for 3D model

  const images = [
    product.productsimg1,
    product.productsimg2,
    product.productsimg3,
    <div className="w-full flex items-center justify-center h-full">
      {loading3D && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div>
        </div>
      )}
      <model-viewer
        src="/iPhone15Pro-FlexCase-2face4.glb"
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        tone-mapping="neutral"
        poster="/poster.webp"
        shadow-intensity="1"
        style={{ width: '100%', height: '350px' }}
        onLoad={() => setLoading3D(false)} // Remove loader once the model loads
        className='w-full h-full'
      >
        <div className="progress-bar hide" slot="progress-bar">
          <div className="update-bar"></div>
        </div>
        <button slot="ar-button" id="ar-button">
          View in your space
        </button>
        <div id="ar-prompt" className='pt-0 px-10'>
          <img src="https://modelviewer.dev/shared-assets/icons/hand.png" alt="AR Prompt" />
        </div>
      </model-viewer>
    </div>
  ];

  return (
    <MaxWidthWrapper>
      <div className="min-h-screen pt-8">
        <div className="text-sm breadcrumbs mb-4 px-8">
          <ul>
            <li className='inline-block pr-2'><Link href="/">Home &gt;</Link></li>
            <li className='inline-block'><Link href='/collections'>All Products</Link></li>
          </ul>
        </div>
        <main className="container mx-auto py-8 pt-8 border-t">
          <div className="flex flex-col lg:flex-row gap-8 justify-between bg-white">
            {/* Product Images */}
            <div className="lg:w-2/4 ">
              <div className="relative flex items-center justify-center">
                {typeof images[currentImage] === 'string' ? (
                  <img
                    src={images[currentImage] as string}
                    alt={`Product image ${currentImage + 1}`}
                    className="w-full items-center flex flex-col rounded-lg"
                  />
                ) : (
                  <div className="w-full h-[435px]">
                    {images[currentImage]}
                  </div>
                )}
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80"
                  onClick={() => setCurrentImage((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80"
                  onClick={() => setCurrentImage((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex mt-4 gap-2 overflow-x-auto">
                {images.map((img, index) => (
                  <div key={index} onClick={() => setCurrentImage(index)}>
                    {typeof img === 'string' ? (
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className={`w-20 h-20 object-cover rounded-md cursor-pointer ${index === currentImage ? 'border-2 border-pink-300' : ''}`}
                      />
                    ) : (
                      <div className={`w-20 h-20 rounded-md cursor-pointer items-center justify-center flex bg-white/90  border-blue-200/5 bg-gradient-to-tr from-blue-300/5 to-pink-300/5 backdrop-blur-lg transition-all shadow-md ${index === currentImage ? 'border-2 border-pink-300' : ''}`}>
                        <Box size={15}
                        className='relative -top-6 -left-1 !px-0'/>
                        <img src='/poster.webp' alt="3D Model Thumbnail -left-2" className=" h-full" >
                        </img>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="px-8 lg:w-2/3 py-10 border rounded-[10px] bg-white/90 border-blue-200/5 bg-gradient-to-tr from-blue-300/5 to-pink-300/5 backdrop-blur-lg transition-all shadow-md">
              <h1 className="text-4xl font-[200] mb-2">{product.title}</h1>
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-pink-400 text-pink-300" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">(1,234)</span>
              </div>
              <div className="text-3xl font-[400] mb-4">{product.price}</div>
              <Select>
                <option>Select size</option>
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </Select>
              <div className="flex gap-2 mb-4">
                <Link href={`/configure/upload?id=${product.id}`}>
                  <Button className="flex-1 bg-pink-400 text-white hover:bg-pink-300">
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to cart
                  </Button>
                </Link>
                <Button variant="outline" className="border-[#222222] text-[#222222] hover:bg-gray-100">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  <span>Free shipping to India</span>
                </div>
                <div className="flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  <span>Estimated delivery: 2-4 weeks</span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <h2 className="font-semibold mb-2">About this item</h2>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Handmade ceramic mug</li>
                  <li>Unique design</li>
                  <li>Microwave and dishwasher safe</li>
                  <li>Perfect gift for coffee lovers</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </MaxWidthWrapper>
  );
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}
