/* eslint-disable @next/next/no-img-element */
import { CreateProduct } from "@/components/create-product"
import { EditProduct } from "@/components/edit-product"
import { useProducts, Product } from "@/hooks"
import useSWRMutation from 'swr/mutation'
import { useState, useEffect } from "react"

const DELETE_FETCHER = async (url: string, { arg }: { arg: Pick<Product, 'product_id'> }) => {
  const response = await fetch(url, {
    method: 'DELETE',
    body: JSON.stringify(arg),
  })
  const res = await response.json()
  console.log({ res })
}

export default function Home() {
  const [ token, setToken ] = useState<string|null>(null)
  const { products, error, isLoading } = useProducts()
  const [showEditForm, setShowEditForm] = useState<boolean>(false)
  const [product, setProduct] = useState<Product>()
  const { trigger } = useSWRMutation(process.env.NEXT_PUBLIC_API_URL, DELETE_FETCHER)

  useEffect(() => {
    const access_token = window.location.hash.split("&")[0].split("=")[1]
    if (!access_token) { window.location.href=process.env.NEXT_PUBLIC_COGNITO_URL as string }
    if (access_token) { setToken(access_token) }
  }, [])
  
  if (isLoading) {
    return (
      <div>
        loading...
      </div>
    )
  }

  const deleteProduct = (id: string) => {
    trigger({ product_id: id })
  }

  console.log({ product })

  return (
    <>
      {products?.map((product) => (
        <div key={product.product_id} className="flex flex-col items-stretch justify-between p-4 border border-gray-200 rounded-md shadow cursor-pointer">
          <img src={product.image} alt={product.product_name + ' image'} className='object-cover w-full h-auto rounded-md aspect-square' />
          <h1 className="text-lg font-semibold">{product.product_name} ~ <span className="font-normal">x{product.stock}</span></h1>
          <p className="text-sm text-gray-600">{product.description}</p>
          <fieldset className="flex flex-col mt-6 gap-y-2">
            <button
              className="w-full px-3 py-1 text-white transition-opacity bg-indigo-500 rounded-md hover:opacity-80 foucs:outline-none"
              onClick={() => {
                setShowEditForm(true)
                setProduct(product)
              }}>
              Edit product
            </button>
            <button
              className="w-full px-3 py-1 text-white transition-opacity rounded-md bg-rose-500 hover:opacity-80 foucs:outline-none"

              onClick={() => deleteProduct(product.product_id)}>
              Delete product
            </button>
          </fieldset>
        </div>
      ))}
      {
        showEditForm && product
          ? <EditProduct product={product} updateState={setShowEditForm} token={token as string} />
          : <CreateProduct token={token as string} />
      }
    </>
  )
}
