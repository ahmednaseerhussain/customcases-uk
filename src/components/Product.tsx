import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Icons } from "./Icons"
import { products } from "@/config/products"


export function ProductCards() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4 py-20 justify-items-center px-4">
      {products.map((product) => (
        <Card key={product.id} className="w-[280px] justify-items-center hover:zoom-in-50">
          
          <Link href={`/products/${product.id}`}>
          <CardContent className="flex justify-center items-center py-4" >
            <img src={product.imageUrl} alt={product.title} className="w-[170px] h-[340px] justify-items-center" />
          </CardContent>
          <CardFooter className="flex justify-between ">            
            <span className="hover:underline">{product.title}</span>
            <span className="">{product.discountedPrice} <br/> <span className="text-red-400 line-through ">{product.price}</span></span>
          </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  )
}
