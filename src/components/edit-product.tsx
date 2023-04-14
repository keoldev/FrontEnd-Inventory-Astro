/* eslint-disable @next/next/no-img-element */
import { Product } from "@/hooks";
import useSWRMutation from 'swr/mutation'
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

interface Props {
  updateState: Dispatch<SetStateAction<boolean>>
  product: Product
}

const PUT_FETCHER = async (url: string, { arg }: { arg: Product }) => {
  const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(arg),
  })
  const res = await response.json()
  console.log(res)
}

export const EditProduct = ({ updateState, product }: Props) => {
  const { trigger } = useSWRMutation(process.env.NEXT_PUBLIC_API_URL, PUT_FETCHER)
  const [productImage, setProductImage] = useState(product.image as string)

  const handlePicker = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const file = e.target.files[0]

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => setProductImage(reader.result as string)
    reader.onloadend = () => e.target.value = ''
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement

    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries()) as unknown as Partial<Product>

    if (data.image?.startsWith('https')) {
      delete data.image
    }

    await trigger({ ...data, image: productImage.split(',')[1] } as Product)
    form.reset()
    updateState(false)
  }

  return (
    <aside className="flex col-span-2 col-start-4 col-end-6 row-span-4 row-start-1 p-4 border border-gray-200 rounded-md shadow">
      <form onSubmit={handleSubmit} className="flex flex-col items-stretch justify-between flex-1 w-full gap-y-4">
        <header>
          <h2 className="text-2xl font-bold text-center">Edit Product</h2>
          <span className="block font-semibold text-center text-gray-500">* Please complete all the fields *</span>
        </header>
        <fieldset>
          <input type="text" value={productImage} className='hidden' required readOnly name="image" />
          <label htmlFor="imgPicker" className='flex overflow-hidden transition-all border border-gray-300 rounded-md cursor-pointer hover:opacity-50 hover:brightness-95'>
            <input onChange={handlePicker} type="file" id='imgPicker' accept="image/png, image/jpeg" readOnly required className='hidden' />
            <img src={productImage} alt="product image" />
          </label>
        </fieldset>
        <fieldset className="flex flex-col gap-y-4">
          <input value={product.product_id} className="hidden" readOnly type="text" name="product_id" placeholder="Product Name" />
          <input defaultValue={product.product_name} className="px-3 py-1 border border-gray-200 rounded-md outline-none focus-within:border-indigo-400" required type="text" name="product_name" placeholder="Product Name" />
          <textarea defaultValue={product.description} className="px-3 py-1 border border-gray-200 rounded-md outline-none focus-within:border-indigo-400" required name="description" placeholder="Product Description" cols={30} rows={10} />
          <input defaultValue={product.stock} className="px-3 py-1 border border-gray-200 rounded-md outline-none focus-within:border-indigo-400" required type="number" name="stock" placeholder="Product Stock" />
        </fieldset>
        <input className="px-4 py-2 font-semibold text-white bg-indigo-500 rounded-md cursor-pointer" type="submit" value="Edit Product" />
      </form>
    </aside>
  )
}