'use client'
import React, { useState } from 'react';
import { useParams } from "next/navigation";
import { products } from "@/config/products";
import Link from "next/link";
import { Star, Heart, ShoppingCart, Truck, Package, ArrowLeft, ArrowRight, Box } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import '@google/model-viewer';
import dynamic from 'next/dynamic';
import { ModelViewer } from '@/components/ModelViewer';
// const ModelViewer = dynamic(() => import('@/components/ModelViewer'), { ssr: false });

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((product) => product.id === parseInt(id as string));
  const [currentImage, setCurrentImage] = useState(0);

  if (!product) {
    return <p>Product not found</p>;
  }

  const images = [
    product.productsimg1,
    product.productsimg2,
    product.productsimg3,
    <ModelViewer key="3d-model" src={product.productsimg4} poster={product.posterimg3d} />
  ];

  // Find related products based on category
  const relatedProducts = products.filter((p) =>
    p.id !== product.id && p.category.device === product.category.device
  );

  return (
    <MaxWidthWrapper className=''>
      <div className="min-h-screen pt-8">
        <div className="text-sm breadcrumbs mb-4 px-8">
          <ul>
            <li className='inline-block pr-2'><Link href="/">Home &gt;</Link></li>
            <li className='inline-block'><Link href='/collections'>All Products</Link></li>
          </ul>
        </div>
        <main className="container mx-auto py-8 pt-8 border-t">
          <div className="flex flex-col lg:flex-row gap-8 justify-between bg-white/50 backdrop-blur-lg">
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
                      <div className={`w-20 h-20 rounded-md cursor-pointer items-center justify-center flex bg-white/90 border-blue-200/5 bg-gradient-to-tr from-blue-300/5 to-pink-300/5 backdrop-blur-lg transition-all shadow-md ${index === currentImage ? 'border-2 border-pink-300' : ''}`}>
                        <Box size={15} className='relative -top-6 -left-1 !px-0'/>
                        <img src={product.posterimg3d} alt="3D Model Thumbnail" className="h-full" />
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

          {/* Related Products Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedProducts
              .sort(() => 0.5 - Math.random()) // Shuffle the array
              .slice(0, 6) // Get 4 random products
              .map((relatedProduct) => (
                <div key={relatedProduct.id} className="border rounded-md p-4 bg-white shadow-md">
                  <Link href={`/products/${relatedProduct.id}`}>
                    <img src={relatedProduct.productsimg1} alt={relatedProduct.title} className="  object-cover rounded-md mb-2" />
                    <h3 className="text-lg font-semibold">{relatedProduct.title}</h3>
                    <p className="text-sm text-gray-600">{relatedProduct.price}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </MaxWidthWrapper>
  );
}
