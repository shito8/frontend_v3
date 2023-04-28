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
          <span onClick={() => handleThemeChange("light")} style={{cursor: 'pointer'}}>Light</span>
          <span onClick={() => handleThemeChange("dark")} style={{cursor: 'pointer'}}>Dark</span>
          <span onClick={() => handleThemeChange("system")} style={{cursor: 'pointer'}}>System</span>
        </div>
        <p>{state.darkMode ? "Dark Mode" : "Light Mode"}</p>




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