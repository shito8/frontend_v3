import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState, useContext } from "react";
import { AppContext } from './_app';
import { Action, Blockchain } from '@/types/types';
import Link from 'next/link';



export default function Prueba() {

  const appContext = useContext(AppContext);
  const { state, dispatch } = appContext ?? { state: null, dispatch: ()=> {} }

  const handleToggle = () => {
    dispatch({type: 'themeMode', payload: !state?.darkMode})
    localStorage.setItem('dark-mode', (!state?.darkMode).toString())
  }

  




  const handleThemeChange = (newTheme: string) => {

    if (newTheme === "light") {
        dispatch({type: 'themeMode', payload: false})
        localStorage.setItem('dark-mode', 'false')
    } else if (newTheme === "dark") {
        dispatch({type: 'themeMode', payload: true})
        localStorage.setItem('dark-mode', 'true')
    } else {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      dispatch({type: 'themeMode', payload: mediaQuery.matches})
      localStorage.setItem('dark-mode', mediaQuery.matches.toString())
    }
  };




   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const payload = e.target.value as Blockchain;
    const action: Action = { type: 'selectBlockchain', payload };
    dispatch(action);
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
        <button onClick={handleToggle}>BotoM</button>
        <p>{state.darkMode ? "Dark Mode" : "Light Mode"}</p>

        <p>Otra cosa</p>
        <select value={state.blockchain} onChange={handleSelectChange}>
          <option value={Blockchain.ERG}>Ergo</option>
          <option value={Blockchain.ADA}>Cardano</option>
          <option value={Blockchain.ETH}>Ethereum</option>
        </select>
        <p>Seleccion: {state.blockchain}</p>
        <Link href='/'>A HOME</Link>
      </main>
    </>
  )
}