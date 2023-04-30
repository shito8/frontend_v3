import React, { useEffect, useState, useContext, useCallback, useRef } from "react";
import { AppContext } from "@/pages/_app";
import Link from "next/link";
import WalletConnect from "../WalletConnect";
import { BLOCKCHAIN } from "@/utils/blockchain";
import Image from "next/image";
import { AppConfig } from "@/types/types";

declare const ergo: any;
declare const ergoConnector: any;

export default function Connect() {
  const appContext = useContext(AppContext);
  const { state, dispatch } = appContext ?? { state: null, dispatch: () => {} };

  const [btnDisconect, setBtnDisconect] = useState(false);

  const [openWallet, setOpenWallet] = useState(false);

  const ergoDisconnect = useCallback(async () => {
    try{
      await ergoConnector.nautilus.disconnect();
    }catch(e){
    }

  }, []);

  const handleDisconnect = async () => {
    const appConfig = JSON.parse(sessionStorage.getItem("appConfig")!);
    if(state?.blockchain === 'ERGO'){
      ergoDisconnect();
      appConfig.ergo.status.connect = false;
      appConfig.ergo.status.wallet = '',
      dispatch({ type: "walletConnected", payload: false });
      dispatch({ type: "walletAddressErg", payload: "" });
      dispatch({ type: "walletBalanceErg", payload: "" });
      dispatch({ type: "walletName", payload: "" });
      setBtnDisconect(false);

    }

    
    sessionStorage.setItem('appConfig', JSON.stringify(appConfig))
  }
    
  useEffect(() => {
    if(btnDisconect){
      const handleClickOutside = (e: PointerEvent) => {
        const target = e.target as HTMLElement;
        if(!target.closest('.btnDisconnect') && !target.closest('.connected__wallet')){
          setBtnDisconect(false);
        }
      }
      document.addEventListener('pointerdown', handleClickOutside);
      return () => document.removeEventListener('pointerdown', handleClickOutside);
    }

},[btnDisconect])
    

  const handleAdrressClick = () => {
    btnDisconect ? setBtnDisconect(false) : setBtnDisconect(true);
  }

  

  const appConfigRef = useRef<AppConfig | null>(null);

  const ergoConnect = useCallback(async () => {
    await ergoConnector.nautilus.connect();
    const addressErg = await ergo.get_change_address();
    dispatch({ type: "walletAddressErg", payload: addressErg });
    const balanceErg = await ergo.get_balance();
    dispatch({
      type: "walletBalanceErg",
      payload: (parseFloat(balanceErg) / 1000000000)
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    });
  }, [dispatch]);

  async function handleConnect() {
    setOpenWallet(!openWallet);
  }

  useEffect(() => {
    appConfigRef.current = JSON.parse(sessionStorage.getItem("appConfig")!);
    if (appConfigRef !== null) {
      if (appConfigRef.current && appConfigRef.current.ergo.active) {
        if (appConfigRef.current.ergo.status.connect) {
          ergoConnect();
        } else {
          ergoDisconnect();
        }
      }
    }
  }, [ergoConnect, ergoDisconnect]);

  return (
    <div className={`connect__menu ${state?.mobileMode ? 'mob':''}`}>
      <>
        {state?.walletConnected ? (
          <>
            {BLOCKCHAIN.map((item, index) => {
              return (
                <div key={index}>
                  {state?.blockchain === item.name && !state?.mobileMode ? (
                    <div className="connected__wallet">
                      <div className="wallet__balance">
                        <p>{state?.walletBalanceErg}</p>
                        <p
                          dangerouslySetInnerHTML={{ __html: item.symbol }}
                        ></p>
                      </div>
                      <div className="wallet__address" onClick={()=>setBtnDisconect(!btnDisconect)}>
                        {item.wallets.map((item, index) => {
                          return (
                            <div className="wallet__item" key={index}>
                              {state?.walletName === item.name ? (
                                <Image
                                  src={item.img}
                                  alt="wallet"
                                  width={20}
                                  height={20}
                                />
                              ) : ('')}
                            </div>
                          );
                        })}
                        <p>
                          {state?.walletAddressErg.substring(0, 5) +
                            "..." +
                            state?.walletAddressErg.substring(
                              state?.walletAddressErg.length - 6
                            )}
                        </p>
                        <svg width="14" height="14" id="icon">
                          <use href="/img/assets/chevron-down.svg#icon"></use>
                        </svg>
                   
                      </div>
                      {btnDisconect ? (<div className="btnDisconnect" onClick={handleDisconnect}> Disconnect </div>):('')}
                    </div>
                    
                  ) : null}
                </div>
              );
            })}
            {state?.mobileMode ? (
                <div className="connected__wallet" onClick={handleAdrressClick}>
                  <svg width="30" height="30" id="icon">
                    <use href="/img/assets/Wallet_alt.svg#icon"></use>
                  </svg>
                  {btnDisconect ? (<div className="btnDisconnect" onClick={handleDisconnect}> Disconnect </div>):('')}
                </div>
            ):('')}
          </>
        ) : (
          <div className="connect__wallet">
            {state?.mobileMode ? (
              <div onClick={handleConnect}>
                <svg width="30" height="30" id="icon">
                  <use href="/img/assets/Wallet_alt.svg#icon"></use>
                </svg>
              </div>
            ):(
            <p onClick={handleConnect}>Connect Wallet</p>
            )}
            
          </div>
        )}
      </>
      {openWallet && (
        <WalletConnect openWallet={openWallet} setOpenWallet={setOpenWallet} />
      )}
    </div>
  );
}
