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

const products = [
  {
    id: 1,
    title: "Impact Cases",
    description: "This is the description for Product 1",
    imageUrl: "/case_1.png",
  },
  {
    id: 2,
    title: "Product 2",
    description: "This is the description for Product 2",
    imageUrl: "/case_2.png",
  },
  {
    id: 3,
    title: "Product 3",
    description: "This is the description for Product 3",
    imageUrl: "/case_3.png",
  },
  {
    id: 4,
    title: "Product 4",
    description: "This is the description for Product 3",
    imageUrl: "/case_4.png",
  },
]

export function ProductCards() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4 py-20 justify-items-center">
      {products.map((product) => (
        <Card key={product.id} className="w-[300px] justify-items-center">
          <CardHeader>
            <CardTitle>{product.title}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center" >
            <img src={product.imageUrl} alt={product.title} className="w-[180px] h-[340px] justify-items-center" />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Details</Button>
            <Link
                  href='/configure/upload'
                  
                    
                    className='flex items-center gap-1 rounded-md bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5 shadow-lg'
                    
                  >
                  <button className="flex-1  bg-white px-2 py-1 rounded-md text-sm flex items-center gap-1">
                  Create case
                 <ArrowRight className='ml-1.5 h-5 w-5' />
                </button>
                </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
