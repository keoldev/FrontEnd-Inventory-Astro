import { Product } from '@/hooks'
import useSWRMutation from 'swr/mutation'

const POST_FETCHER = async (url: string, { arg }: { arg: Product }) => {
  console.log(arg)
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  })
}

export const CreateProduct = () => {
  const { trigger } = useSWRMutation(process.env.NEXT_PUBLIC_API_URL, POST_FETCHER)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries()) as unknown as Product

    await trigger({ ...data, image: 'https://picsum.photos/200/300' } as Product)
  }

  return (
    <aside className="flex col-span-2 col-start-4 col-end-6 row-span-4 row-start-1 p-4 border border-gray-200 rounded-md shadow">
      <form onSubmit={handleSubmit} className="flex flex-col items-stretch justify-between flex-1 w-full gap-y-4">
        <header>
          <h2 className="text-2xl font-bold text-center">Creaete a Product</h2>
          <span className="block font-semibold text-center text-gray-500">* Please complete all the fields *</span>
        </header>
        <fieldset className="flex flex-col gap-y-4">
          <input className="px-3 py-1 border border-gray-200 rounded-md outline-none focus-within:border-indigo-400" required type="text" name="prooduct_name" placeholder="Product Name" />
          <textarea className="px-3 py-1 border border-gray-200 rounded-md outline-none focus-within:border-indigo-400" required name="product_description" placeholder="Product Description" cols={30} rows={10} />
          <input className="px-3 py-1 border border-gray-200 rounded-md outline-none focus-within:border-indigo-400" required type="number" name="stock" placeholder="Product Stock" />
        </fieldset>
        <input className="px-4 py-2 font-semibold text-white bg-indigo-500 rounded-md cursor-pointer" type="submit" value="Create Product" />
      </form>
    </aside>
  )
}
