import React, { useEffect, useState, useContext } from "react";
import { DepositProps } from "@/types/types";
import Image from "next/image";
import { AppContext } from '@/pages/_app';
import CountDown from "./CountDown";
import QRCode from "react-qr-code";

export default function DepositMenu(props: DepositProps) {
  const addressBtc = `${process.env.NEXT_PUBLIC_ADDRESS_BTC}`
  const { valueInput, openDepositMenu, setOpenDepositMenu } = props;

  const appContext = useContext(AppContext);
  const { state} = appContext ?? { state: null }

  const [copy, setCopy] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

 

  useEffect(() => {
    if(openDepositMenu){
      const handleClickOutside = (e: PointerEvent) => {
        const target = e.target as HTMLElement;
        if(!target.closest('.deposit__section')){
          setOpenDepositMenu(false);
        }
      }
      document.addEventListener('pointerdown', handleClickOutside);
      return () => document.removeEventListener('pointerdown', handleClickOutside);
    }

},[openDepositMenu, setOpenDepositMenu])

const handleCopy = () => {
  const textCopy = addressBtc;
  navigator.clipboard.writeText(textCopy)
  .then(() => {
    setCopy(true);
    setTimeout(()=>{
      setCopy(false);
  },1000);
  }).catch(err => {
    setCopy(false);
  })
  
}

const handleClose = () => {
  setOpenDepositMenu(false)
}

  return (

    <div className={`deposit__menu ${state?.mobileMode ? 'mob': ''}`}>
      <section className="deposit__section">
        <div className="popUp">

            <div className="title__pop">
              <svg width="35" height="35" id='icon' className="close__pop" onClick={handleClose}>
                <use href="/img/assets/x.svg#icon"></use>
              </svg>
              <svg width="40" height="40" id='icon' className="icon__pop">
                <use href='/img/crypto/bitcoin-logo.svg#Layer_1'></use>
              </svg>

              <h2>BTC Deposit</h2>
              
            </div>
            <div className="deposit__body">
              <div className="title__body">
                <h3>Using Moonshine Wallet,</h3>
                <h3>Send {valueInput} BTC</h3>
              </div>

              <div className="section__transaction">
                {copy ? (<p className="pop__copy">Copied</p>):('')}
                
                <p>In a single transaction to: </p>
                <div className="address__btc" onClick={handleCopy}>
                  <p>{addressBtc}</p>
                  {state?.darkMode ? (
                  <Image src='/img/assets/copy-dark.png' width={14} height={14} alt='copy' />
                  ): (
                  <Image src='/img/assets/copy-light.png' width={14} height={14} alt='copy' />
                  )}
                </div>
                <CountDown />

              </div>

              <div className="section__warning">
                  <h2>Attention:</h2>
                  <p><span>Add your ERG address</span> in the “Message (Optional)” section in your Moonshine Wallet before sending this deposit.</p>
                  <p>This ERG address will receive eBTC. If you do not add your ERG address into the message section of this transaction, you will not receive eBTC. </p>
              </div>

              <div className="section__qr">
                <div style={{ height: "auto", margin: "auto", width: "100%", padding: "10px"}}>
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={addressBtc}
                  viewBox={`0 0 256 256`}
                  bgColor={`#FFFFFF`}
                  />
                </div>
              </div>

              <div className="section__note">
                <p><span>Note: </span>{`Payments may take over 10 minutes to confirm. Don't worry, your funds are safu :)`}</p>

              </div>

              <button className="deposit__button" /* onClick={handleWrap} */>
                {isLoading ? (<div className='spinner wrap'></div>):('')}
                I have sent the deposit
              </button>

            </div>
        </div>  

      </section>

    </div>
    
  )
}