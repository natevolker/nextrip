import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Layout } from '@components/Layout'
import { LoadingContext } from '@components/LoadingContext'
import { HeaderContext } from '@components/Header'
import '@styles/global'

const MyApp = ({ Component, pageProps: { layout, ...pageProps } }: AppProps) => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
    }
  }, [])

  return (
    <HeaderContext>
      <LoadingContext>
        <Layout layout={layout}>
          <Component {...pageProps} />
        </Layout>
      </LoadingContext>
    </HeaderContext>
  )
}

export default MyApp
