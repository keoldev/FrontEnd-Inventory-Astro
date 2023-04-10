import useSWR from 'swr'

interface DirtyProduct {
  description: {
    S: string
  }
  product_id: {
    S: string
  }
  product_name: {
    S: string
  }
  stock: {
    N: string
  }
}

export interface Product {
  description: string
  product_id: string
  product_name: string
  stock: string
  image: string
}

const GET_FETCHER = (url: string): Promise<DirtyProduct[]> => fetch(url).then((res) => res.json())

export function useProducts() {
  const { data, isLoading, error } = useSWR(process.env.NEXT_PUBLIC_API_URL, GET_FETCHER)

  const products: Product[] | undefined = data?.map((product) => ({
    description: product.description.S,
    product_id: product.product_id.S,
    product_name: product.product_name.S,
    stock: product.stock.N,
    image: `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}${product.product_id.S}.jpg`
  }))

  return {
    products,
    isLoading,
    error
  }
}
