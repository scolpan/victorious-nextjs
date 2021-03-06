import 'reactjs-popup/dist/index.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {MoralisProvider} from 'react-moralis'
import {VictoriousProvider} from '../context/VictoriousContext'

function MyApp({ Component, pageProps }: AppProps) {
  
  return (

    <MoralisProvider 
      serverUrl={process.env.NEXT_PUBLIC_SERVER ?? "ServerUrl Undefined Fallback"} 
      appId={process.env.NEXT_PUBLIC_APP_ID ?? "AppId Undefined Fallback"}
      >

      <VictoriousProvider>
        <Component {...pageProps} />

      </VictoriousProvider>
      
      
    </MoralisProvider>

    

  )
}

export default MyApp
