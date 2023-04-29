import Head from 'next/head'
import React, { useEffect, useState, useContext } from "react";
import { AppContext } from './_app';
import Wrapping from '@/components/bridge/Wrapping';




export default function Home() {

  const appContext = useContext(AppContext);
  const { state, dispatch } = appContext ?? { state: null, dispatch: ()=> {} }

  const [bridgeWrapActive, setBridgeWrapActive] = useState(true);




  return (
    <>
      <Head>
        <title>Wrapping | anetaBTC</title>
        <meta name="description" content="A protocol to unlock the value of Bitcoin on Ergo and Cardano" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
	      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
	      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
	      <link rel="shortcut icon" href="/favicon.ico"/>
	      <link rel="manifest" href="/site.webmanifest"/>
	      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#9BD9F2"/>
	      <meta name="msapplication-TileColor" content="#9bd9f2"/>
	      <meta name="theme-color" content="#ffffff"/>
      </Head>
      <main className='bridge__page'>

        <section className={`bridge__section ${bridgeWrapActive ? 'wrap':'unwrap'}`}>

          <div className='bridge__options'>
            <div className='bridge__wrap' onClick={()=> setBridgeWrapActive(true)}>
              <p  className='selection'>Wrap</p>
              <span className={`bridge__wrap__selection ${bridgeWrapActive ? '' : 'unActive'}`} ></span>
            </div>
            <div className='bridge__unwrap' onClick={()=> setBridgeWrapActive(false)}>
              <p  className='selection'>Unwrap</p>
              <span className={`bridge__unwrap__selection ${bridgeWrapActive ? 'unActive' : ''}`} ></span>
            </div>
          </div>

          <Wrapping                 
                bridgeWrapActive={bridgeWrapActive}
                setBridgeWrapActive={setBridgeWrapActive}/>

        </section>

      </main>
    </>
  )
}
