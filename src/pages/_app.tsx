import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className="grid w-full grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] p-4 mx-auto gap-4 max-w-screen-2xl max-auto">
      <Component {...pageProps} />
    </main>
  )
}
