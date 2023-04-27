import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState, useContext } from "react";
import { AppContext } from './_app';
import { Action, Blockchain } from '@/types/types';
import Link from 'next/link';



export default function Prueba() {

  const appContext = useContext(AppContext);
  const { state, dispatch } = appContext ?? { state: null, dispatch: ()=> {} }

  const [theme, setTheme] = useState('');

  useEffect(() => {
    const themeMode = localStorage.getItem('themeMode')
    if(themeMode!==null){
      const themeModeObj = JSON.parse(themeMode)
      setTheme(themeModeObj.theme)
    }

  }, [theme])



  const handleThemeChange = (newTheme: string) => {
    let theme, dark;
    if (newTheme === "light") {
        dispatch({type: 'themeMode', payload: false})
        theme = 'light';
        dark = false;
    } else if (newTheme === "dark") {
        dispatch({type: 'themeMode', payload: true})
        theme = 'dark';
        dark = true;
    } else {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      dispatch({type: 'themeMode', payload: mediaQuery.matches})
      theme = 'system';
      dark = mediaQuery.matches;
    }
    const themeMode = {theme, dark}
    setTheme(theme)
    localStorage.setItem('themeMode', JSON.stringify(themeMode))
  };




   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const payload = e.target.value as Blockchain;
    const action: Action = { type: 'selectBlockchain', payload };
    const appConfig = JSON.parse(sessionStorage.getItem("appConfig")!);
    
    for(let key in appConfig){
      if(appConfig.hasOwnProperty(key) && appConfig[key].name === payload){
        dispatch({ type: "selectBlockchain", payload: payload });
        dispatch({ type: "walletConnected", payload: state?.walletConnected ?? false });
        dispatch({ type: "walletName", payload: state?.walletName ?? '' });

        appConfig[key].active = true;
      }
      else{
        appConfig[key].active = false;
      }
      
    }

    sessionStorage.setItem('appConfig', JSON.stringify(appConfig))

  }; 

  if (!state) {
    return <div>Cargando...</div>;
  }
  return (
    <>
      <Head>
        <title>Prueba</title>
        <meta name="description" content="Esto es una prueba" />
      </Head>
      <main>
        <h1>Bienvenido</h1>
        <h2>Aneta</h2>
        <div>
          <button onClick={() => handleThemeChange("light")}>Light</button>
          <button onClick={() => handleThemeChange("dark")}>Dark</button>
          <button onClick={() => handleThemeChange("system")}>System</button>
        </div>
        <div>{state.darkMode}</div>
        <p>{state.darkMode ? "Dark Mode" : "Light Mode"}</p>

        <p>Otra cosa</p>
        <select value={state.blockchain} onChange={handleSelectChange}>
          <option value={Blockchain.ERG}>Ergo</option>
          <option value={Blockchain.ADA}>Cardano</option>
          <option value={Blockchain.ETH}>Ethereum</option>
        </select>
        <p>Seleccion: {state.blockchain}</p>
        <Link href='/'>A HOME</Link>

        <p>Selected BlockChain</p>
        <p>{state.blockchain}</p>
        <p>Wallet Connected</p>
        <p>{state.walletConnected?'true':"false"}</p>
        <p>Wallet Name</p>
        <p>{state.walletName === '' ? 'vacio' : state.walletName}</p>
        <p>Address Ergo</p>
        <p>{state.walletAddressErg === '' ? 'Address vacio': state.walletAddressErg}</p>
        <p>Balance Ergo</p>
        <p>{state.walletBalanceErg === ''? 'Balance vacio': state.walletBalanceErg}</p>
      </main>
    </>
  )
}