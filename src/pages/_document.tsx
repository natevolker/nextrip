import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className='preload' lang='en'>
      <Head/>
      <body>
        <Main />
        <NextScript />
        <script dangerouslySetInnerHTML={{__html: `setTimeout(() => { document.documentElement.classList.remove('preload') }, 1000)`}}></script>
      </body>
    </Html>
  )
}