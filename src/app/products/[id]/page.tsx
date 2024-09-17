'use client'
import { useParams } from "next/navigation";
import { products } from "@/config/products";
import Link from "next/link";


export default function ProductDetails() {
  const { id } = useParams();

  const product = products.find((product) => product.id === parseInt(id as string));

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="w-full">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto py-12 md:py-24">
        <div>
          <img
            src={product.imageUrl}
            alt={product.title}
            width={200}
            height={400}
            className="flex items-center rounded-lg overflow-hidden"
            style={{ aspectRatio: "200/400" }}
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">{product.title}</h1>
          <p className="text-muted-foreground text-lg">
            {product.description}
          </p>
          <p className="text-2xl font-bold">{product.discountedPrice || product.price}</p>
          <Link
                  href={`/configure/upload?id=${product.id}`}
                  
                    
                    className='flex w-32 items-center gap-1 rounded-lg bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5 shadow-lg'
                    
                  >
                  <button className=" flex-1 bg-white px-2 py-1 rounded-lg text-sm flex items-center gap-1">
                  Create case
                 
                </button>
                </Link>

        </div>
          
        
      </section>
    </div>
  );
}
