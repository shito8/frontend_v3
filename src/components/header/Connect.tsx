import React, { useEffect, useState, useContext, useCallback, useRef } from "react";
import { AppContext } from '@/pages/_app';
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

    const [openWallet, setOpenWallet] = useState(false);



    const ergoDisconnect = useCallback(async () => {
        await ergoConnector.nautilus.disconnect();
    },[])

    const appConfigRef = useRef<AppConfig | null>(null);


    const ergoConnect = useCallback(async () => {
        await ergoConnector.nautilus.connect();
        const addressErg = await ergo.get_change_address();
        dispatch({ type: "walletAddressErg", payload: addressErg });
        const balanceErg = await ergo.get_balance();
        dispatch({ type: "walletBalanceErg", payload: (parseFloat(balanceErg)/1000000000).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") });

    },[dispatch])


    async function handleConnect() {
        setOpenWallet(!openWallet);
        await ergoConnector.nautilus.disconnect();
        console.log(await ergoConnector.nautilus.disconnect());
    }

    useEffect(() => {
        appConfigRef.current = JSON.parse(localStorage.getItem("appConfig")!);
        if(appConfigRef!==null){
            if(appConfigRef.current && appConfigRef.current.ergo.active){
                if(appConfigRef.current.ergo.status.connect){
                    ergoConnect();
                }else{
                    ergoDisconnect();
                    console.log('ergo disconnect')
                }

              }
        }
    },[ergoConnect, ergoDisconnect])





    return (
        <div className="connect__menu">
            <>
            {state?.walletConnected ? (
                <>
                {BLOCKCHAIN.map((item, index) => {
                    return (
                    <div key={index}>
                        {state?.blockchain === item.name ?(
                        <div className="connected__wallet">
                            <div className="wallet__balance">
                                <p>{state?.walletBalanceErg}</p>
                                <p dangerouslySetInnerHTML={{__html: item.symbol}}></p>
                            </div>
                            <div className="wallet__address">
                            {item.wallets.map((item, index) => {
                                return (
                                <div className="wallet__item" key={index}>
                                    {
                                        state?.walletName === item.name ? (                                <Image src={item.img} alt="wallet" width={20} height={20} />): (<div>nuell</div>)
                                    }

                                    </div>
                                );
                                })}
                                <p>{state?.walletAddressErg.substring(0,5) + '...' + state?.walletAddressErg.substring(state?.walletAddressErg.length - 6)}</p>
                                <svg width="14" height="14" id="icon">
                                    <use href="/img/assets/chevron-down.svg#icon"></use>
                                </svg>
                            </div>
                        </div>
                        ):null}
                    </div>
                    );
                    })     
                }
                </>
                ):(
                <div className="connect__wallet">
                    <p onClick={handleConnect}>Connect Wallet</p>
                </div>)
            }    
                
            </>
            {openWallet && <WalletConnect openWallet={openWallet} setOpenWallet={setOpenWallet}/>}
        </div>

    )
};

