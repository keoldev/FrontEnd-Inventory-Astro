/* eslint-disable @next/next/no-img-element */
import { CreateProduct } from "@/components/create-product"
import { useProducts } from "@/hooks"

export default function Home() {
  const { products, error, isLoading } = useProducts()

  if (isLoading) {
    return (
      <div>
        loading...
      </div>
    )
  }

  return (
    <>
      {products?.map((product) => (
        <div key={product.product_id} className="flex flex-col items-stretch justify-between p-4 border border-gray-200 rounded-md shadow cursor-pointer">
          <img src={`https://d15987hq3bk9v6.cloudfront.net/${product.product_id}.jpg`} alt={product.product_name + ' image'} className='w-full h-auto aspect-square' />
          <h1 className="text-lg font-semibold">{product.product_name} ~ <span className="font-normal">x{product.stock}</span></h1>
          <p className="text-sm text-gray-600">{product.description}</p>

        </div>
      ))}
      <CreateProduct />
    </>
  )
}
