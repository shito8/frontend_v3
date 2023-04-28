import Image from "next/image"
import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "@/pages/_app";
import { Action, Blockchain } from '@/types/types';
import { BLOCKCHAIN } from "@/utils/blockchain";

export default function SelectBlockchain() {

  const appContext = useContext(AppContext);
  const { state, dispatch } = appContext ?? { state: null, dispatch: ()=> {} }

  const [isOpenList, setIsOpenList] = useState(false);
  const [isDisplay, setIsDisplay] = useState(false);

  const handleMenuClick = () => {
    if(isDisplay){
      setIsOpenList(!isOpenList);
      setTimeout(()=>{
        setIsDisplay(false)
      },500);
    }else{
      setIsDisplay(true);
      setTimeout(()=>{
        setIsOpenList(!isOpenList);
      },0);
    }
  }

  const handleDivClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const payload = e.currentTarget.dataset.blockchain as Blockchain;
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
    setIsOpenList(false);
    setTimeout(()=>{
      setIsDisplay(false)
    },500);

  }; 


  return (
    <div className={`blockchain__menu ${state?.mobileMode ? 'mob': ''}`}>

      <div className="blockchain__selected" onClick={handleMenuClick}>
      {BLOCKCHAIN.map((item, index) => {
        return (
          <div key={index} >
            {state?.blockchain === item.name ? (
            <div className="selected__item">
              <div className="selected__item__icon">
                <svg width="20" height="20" id='icon' >
                  <use href={item.svg}></use>
                </svg>
                <p>{item.name}</p>
              </div>
              <div>
                <svg width="14" height="14" id="icon">
                  <use href="/img/assets/chevron-down.svg#icon"></use>
                </svg>
              </div>

            </div>):
            ('')
            }
          </div>)
      })
      }
      </div>







        <div className={`blockchain__list ${isOpenList ? 'open' : ''} ${isDisplay ? '': 'displayOff'}`}>
  
        {BLOCKCHAIN.map((item, index) => {
          return (
            <div key={index} className="blockchain__item" onClick={handleDivClick} data-blockchain={item.name}>
              <svg width="20" height="20" id='icon' >
                <use href={item.svg}></use>
              </svg>
              <p>{item.name}</p>

            </div>
      )})}
  
        </div>


      

    </div>
  )
}