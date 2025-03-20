'use client'
import { useQuery } from "@tanstack/react-query"
import { Product } from "../products/page"
import Link from "next/link"
import Image from "next/image";

const Products = () => {
  
  const {data:products, isLoading, isFetching} = useQuery({
    queryKey:["products"],
    queryFn:async () => {
      const res = await fetch("http://localhost:4001/products")
      const data:Product[] = await res.json()
      return {data}
    },
    staleTime:1000,
    gcTime:2000
  })

  
  return (
    <section className="flex flex-col gap-4">
    <h2 className="text-lg font-bold">Products</h2>
    {products?.data?.map((product) => (
      <div className="flex border gap-4 rounded-md" key={product.id}>
        <div className="flex flex-col p-4 justify-between">
          <div>
            <h2 className="text-xl font-bold line-clamp-2">
              {product.title}
            </h2>
            <p className="text-sm line-clamp-3">{product.description}</p>
            <div className="flex gap-2 mt-4 items-center">
              <p className="text-2xl">{product.price.amount}$</p>
              <Link
                href={`/product/${product.id}/view`}
                className="flex flex-col justify-center"
              >
                <button className="bg-gray-800 text-white px-4 py-2 rounded-md">
                  View Product
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    ))}
  </section>
  )
}
export default Products