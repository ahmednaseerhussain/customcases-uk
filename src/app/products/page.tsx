/**
 * v0 by Vercel.
 * @see https://v0.dev/t/jOoRpswN4Ga
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { buttonVariants } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Component() {
  return (
    <div className="w-full">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto py-12 md:py-24">
        <div>
          <img
            src="/placeholder.svg"
            alt="Phone Case"
            width={600}
            height={600}
            className="w-full rounded-lg overflow-hidden"
            style={{ aspectRatio: "600/600", objectFit: "cover" }}
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">Sleek Phone Case</h1>
          <p className="text-muted-foreground text-lg">
            Protect your phone in style with our premium phone case. Crafted from durable materials, this case offers
            superior protection without compromising on design.
          </p>
        </div>
      </section>
      <section className="bg-muted py-12 md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Product Details</h2>
              <div className="space-y-2">
                <div>
                  <h3 className="text-lg font-medium">Material</h3>
                  <p>Polycarbonate</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Color</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-black" />
                    <div className="w-6 h-6 rounded-full bg-white" />
                    <div className="w-6 h-6 rounded-full bg-blue-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Price</h3>
                  <p className="text-2xl font-bold">$19.99</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <form className="space-y-4 w-full max-w-md">
                <div className="grid grid-cols-2 gap-4">
                  <Label htmlFor="quantity" className="text-base">
                    Quantity
                  </Label>
                  <Select id="quantity" defaultValue="1">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Link
                href='configure/design'
                className={buttonVariants({
                  size: 'lg',
                  variant: 'gradient',
                  className: 'text-white flex items-center',
                })}
              >
                Discover Now <ArrowRight className='h-4 w-4 ml-1.5' />
              </Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}