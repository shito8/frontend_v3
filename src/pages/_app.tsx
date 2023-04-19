import '@/styles/app.scss';
import React, { useReducer, useEffect } from "react";
import { reducer, initialState } from '@/reducers/reducer';
import type { AppProps } from 'next/app';
import { Action, State } from '@/types/types';

export const AppContext = React.createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}|null>(null);

export default function App({ Component, pageProps }: AppProps) {

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(()=>{
    const body = document.body;
    if(localStorage.getItem('dark-mode')==='true'){
      dispatch({type: 'themeMode', payload: true})
      body.classList.add('dark');
    }else{
      dispatch({type: 'themeMode', payload: false})
      body.classList.remove('dark');
    }
  },[state.darkMode])

  useEffect(() => {
    if(window !== undefined){
      if(localStorage.getItem('dark-mode')===null){
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        dispatch({type: 'themeMode', payload: mediaQuery.matches})
        localStorage.setItem('dark-mode', mediaQuery.matches.toString())
      }
    }

  }, [dispatch]);

  return (
        <AppContext.Provider value={{ state, dispatch }}>
          <Component {...pageProps} />
        </AppContext.Provider>  
        );
};
