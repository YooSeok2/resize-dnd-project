
import '../styles/home.scss';
import '../styles/globals2.css'
import type { AppProps } from 'next/app'
import GlobalStyle from '../styles/globals'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
     <GlobalStyle/>
     <Component {...pageProps} />
    </>
  )
}
