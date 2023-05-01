import React, { useEffect, useState, useContext } from "react";
import { AppContext } from '@/pages/_app';
import { ConfirmProps } from "@/types/types";
import Image from "next/image";


export default function ConfirmDeposit(props: ConfirmProps) {

  const appContext = useContext(AppContext);
  const { state} = appContext ?? { state: null }

  const { valueInput, setValueInput, setOpenDepositMenu, tokenReceive, tokenWrap, setOpenConfirmDeposit } = props;

  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(()=>{
      setIsDisabled(false);
    },2000)
  },[])
 

  const handleClickConfirm = () => {

      setOpenConfirmDeposit(false);
      setOpenDepositMenu(false);
      setValueInput('');
  
}

  return (

    <div className={`confirm__menu ${state?.mobileMode ? 'mob': ''}`}>
      <section className="confirm__section">
        <div className="popUp">
         
            <h2 className="title__pop">BTC Deposit</h2>

              <div className="confirm__body">

              <div className="section__result">

                <div className="token__group">
                  <div className="token__name">
                    <svg width="26" height="26" id='icon' >
                      <use href='/img/crypto/bitcoin-logo.svg#Layer_1'></use>
                    </svg>
                    <h3>BTC</h3>
                  </div>
                  <div className="token__value">
                    <p>{valueInput}</p>
                  </div>
                </div>
                <div className="arrow__group">
                  <Image src='/img/assets/arrow_blue.png' width={83} height={24} alt="arrow" />
                </div>
                <div className="token__group">
                  <div className="token__name">
                    <svg width="26" height="26" id='icon' >
                      <use href='/img/crypto/wbtc-logo.svg#Layer_1'></use>
                    </svg>
                    <h3>{tokenWrap}</h3>
                  </div>
                  <div className="token__value">
                    <p>{tokenReceive}</p>
                  </div>
                </div>

              </div>

              <div className="section__note">
                  <p>Thank you for sending your BTC Deposit.</p>
                  <p>eBTC will be sent to your Cardano wallet once your BTC deposit is confirmed. This process may take up to 24 hours.</p>
              </div>

              <div className="section__info">
                <p>The status and details of this transaction can be found in the “Transactions” tab on the side menu.</p>
              </div>

              <div className="section__info">
                <p>Support</p>
                <p>If you need support, your BTC transaction ID will help us assist you.</p>
              </div>

              <button className={`confirm__button ${isDisabled ? 'disabled':''}`} onClick={handleClickConfirm}>
                {isDisabled ? ('Loading...'):('Close')}
                
              </button>


            </div>


              
            
        </div>  

      </section>

    </div>
    
  )
}