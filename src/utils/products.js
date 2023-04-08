export async function getProducts () {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await response.json()
  return data
}