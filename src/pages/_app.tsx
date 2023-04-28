import "@/styles/app.scss";
import React, { useReducer, useEffect } from "react";
import { reducer, initialState } from "@/reducers/reducer";
import type { AppProps } from "next/app";
import { Action, State } from "@/types/types";
import Header from "@/components/layouts/Header";
import { APPCONFIG } from "@/utils/blockchain";

export const AppContext = React.createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export default function App({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const body = document.body;
    const themeMode = localStorage.getItem("themeMode");
    if (themeMode !== null) {
      const themeModeJson = JSON.parse(themeMode);
      if (themeModeJson.dark) {
        dispatch({ type: "themeMode", payload: true });
        body.classList.add("dark");
      } else {
        dispatch({ type: "themeMode", payload: false });
        body.classList.remove("dark");
      }
    }
  }, [state.darkMode]);

  useEffect(() => {
    if (window !== undefined) {
      if (localStorage.getItem("themeMode") === null) {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        dispatch({ type: "themeMode", payload: mediaQuery.matches });
        const themeMode = { theme: "system", dark: mediaQuery.matches };
        localStorage.setItem("themeMode", JSON.stringify(themeMode));
      }
    }
  }, [dispatch]);



  useEffect(() => {
    if (window !== undefined) {
      if (sessionStorage.getItem("appConfig") === null) {
        sessionStorage.setItem('appConfig', JSON.stringify(APPCONFIG));
      } else {
        const appConfig = JSON.parse(sessionStorage.getItem("appConfig")!);
        for(let key in appConfig){
          if(appConfig.hasOwnProperty(key) && appConfig[key].active){
            dispatch({ type: "selectBlockchain", payload: appConfig[key].name });
            dispatch({ type: "walletConnected", payload: appConfig[key].status.connect  });
            dispatch({ type: "walletName", payload: appConfig[key].status.wallet  });
            
          }
          
        }

     }
    }
  }, [state.blockchain, state.walletConnected, state.walletName]);

  useEffect(() => {
    const handleResize = () => {

      if(typeof window !== undefined){
        const screenWidth = window.innerWidth;
        dispatch({type: 'mobileMode', payload: screenWidth < 1250})
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  },[state?.mobileMode])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Header />
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}
