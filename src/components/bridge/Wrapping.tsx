import { WrappingProps } from "@/types/types";
import React, { useEffect, useState, useContext } from "react";
import { AppContext } from '@/pages/_app';
import { BLOCKCHAIN } from "@/utils/blockchain";



export default function Wrapping(props: WrappingProps) {

  const { bridgeWrapActive, setBridgeWrapActive } = props;

  if (bridgeWrapActive) {
    return (<Wrap />)

  }else{
    return (<Unwrap />)
  }

};

/* --------------- */
/* FUNCTION WRAP  */
/* ------------- */

function Wrap(){

  const appContext = useContext(AppContext);
  const { state, dispatch } = appContext ?? { state: null, dispatch: ()=> {} }

  const [valueInput, setValueInput] = useState<string>("");
  const [usdInput, setUsdInput] = useState<string>("");
  const [tokenWrap, setTokenWrap] = useState<string>("");
  const [checkInput, setCheckInput] = useState<boolean>(false);
  const [tokenReceive, setTokenReceive] = useState<string>("0.00");
  const [usdReceive, setUsdReceive] = useState<string>("");
  const [tokenFee, setTokenFee] = useState<string>("0.00");
  const [usdFee, setUsdFee] = useState<string>("");

 useEffect(() => {
  if(valueInput==='' || state?.usdBtc === '0.00'){
    setUsdInput('');
    setTokenReceive('0.00');
    setUsdReceive('');
    setTokenFee('0.00');
    setUsdFee('');
    state?.mobileMode ? setTokenReceive('0') : setTokenReceive('0.00');
  }else{
    const value = Number(valueInput);
    const amount = Number(state?.usdBtc);
    setUsdInput((value * amount).toFixed(2))
    setTokenReceive((value*.995).toFixed(8).replace(/\.?0+$/, ''))
    setUsdReceive((value*.995*amount).toFixed(2))
    setTokenFee((value*.005).toFixed(8).replace(/\.?0+$/, ''))
    setUsdFee((value*.005*amount).toFixed(2))

  
    }
 },[valueInput, state?.usdBtc, state?.mobileMode])


  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    //const regex = /^[^-+a-zA-ZñÑáéíóúÁÉÍÓÚ]-?\d*\.?\d{0,8}$/;
    //const regex = /^[0-9]-?\d*\.?\d{0,8}$/;
    const regex = /^[0-9]-?\d*\.?\d{0,8}$/;

    if (regex.test(value) || value === "") {
      setValueInput(value);
    }

    parseFloat(value)<0.0006 ? setCheckInput(true) : setCheckInput(false)
    
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if(e.key === '+' || e.key === '-' || e.key === 'ArrowUp' || e.key === 'ArrowDown'){
      e.preventDefault();
    }
  }

  const handleWhell = (e: WheelEvent) => {
    e.preventDefault();

  }

  useEffect(() => {
    const inputElement = document.querySelector('input');
    inputElement?.addEventListener('wheel',  handleWhell,  {passive: false});
    return () => {
      inputElement?.removeEventListener('wheel',  handleWhell);
    
    }
  },[])

  useEffect(() => {

    const blockchain = BLOCKCHAIN.find(block => block.name === state?.blockchain);
  
    if(blockchain){
      setTokenWrap(blockchain?.tokenWrap)
    }
    
    
   },[state?.blockchain])



  return (
    <div className={`wrapping__menu ${state?.mobileMode ? 'mob': ''}`}>
      <p className="title">Mint eBTC</p>
      {state?.mobileMode ? <p className="title__input">Wrap</p> : ''}
      <div className="wrapping__input">
        <input
          type="number"
          value={valueInput}
          placeholder="0" 
          onChange={handleValueChange}
          onKeyDown={handleKeyDown}
        />

        <div className={`token__input ${usdInput=== ''? '':'active'}`}>
          <div className="token__name">
            <svg width="30" height="30" id='icon' >
              <use href='/img/crypto/bitcoin-logo.svg#Layer_1'></use>
            </svg>
            <p>BTC</p>
          </div>
          
          {usdInput === '' ? (''): <p className="token__value">~ $ {usdInput}</p>}
          
        </div>

        {checkInput ? (
          <div className='warning__input'>
            <svg width="14" height="14" id='icon' >
              <use href='/img/assets/exclamation-circle-fill.svg#icon'></use>
            </svg>
            <p>You can mint a minimum of 0.0006 BTC.</p>
          </div>
        ):('')}

      </div>

      {state?.mobileMode ? (
      <div className="arrow__section">
        <svg width="32" height="32" id='icon' >
          <use href='/img/assets/arrow-down-short.svg#icon'></use>
        </svg>
      </div>
      ):('')}

      {state?.mobileMode ? (
      <>
      <p className="title__section">You Will Receive</p>
      <section className="wrapping__section">

        <div className="token__section">
          <p className='token__input'>{tokenReceive}</p>
          <div className={`token__name ${usdInput=== ''? '':'active'}`}>
            <svg width="30" height="30" id='icon' >
              <use href='/img/crypto/wbtc-logo.svg#Layer_1'></use>
            </svg>
            <p>{tokenWrap}</p>

          </div>
          {usdInput === '' ? '': <p className="value__section">= $ {usdReceive}</p>}
        </div>

      </section>

      </>) : 
      (<section className="wrapping__section">
        <p className="title__section">You Will Receive</p>

        <div className="token__section">
          <svg width="30" height="30" id='icon' >
            <use href='/img/crypto/wbtc-logo.svg#Layer_1'></use>
          </svg>
          <p>{tokenReceive}</p>
          <p>{tokenWrap}</p>
        {usdInput === '' ? '': <p className="value__section">= $ {usdReceive}</p>}
        </div>
      </section>)
      }

      <section className="fee__section">

        <p className="title__section">Bridge fee (0.5%) </p>
        <div className="token__section">
          <div>
            <svg width="26" height="26" id='icon' >
              <use href='/img/crypto/bitcoin-logo.svg#Layer_1'></use>
            </svg>

            <p>{tokenFee}</p>
            <p>BTC</p>
          </div>


        </div>
        {usdInput === '' ? '': <p className="value__section">= $ {usdFee}</p>}

      </section>

      {state?.walletConnected ?
        usdInput === '' ? (
        <button className="wrapping__button disabled">
          Enter an Amount
        </button>
        ) : checkInput ? (
        <div>
          <button className="wrapping__button disabled">
            Invalid Amount
          </button>
        </div>
        ) : (
          <button className="wrapping__button" /* onClick={handleWrap} */>
            Wrap BTC
          </button>
          )
          :
          <button className="wrapping__button disabled">
            Connect Wallet
          </button>
        }






    </div>
  );
}

/* ----------------- */
/* FUNCTION UNWRAP  */
/* --------------- */

function Unwrap(){


  const appContext = useContext(AppContext);
  const { state, dispatch } = appContext ?? { state: null, dispatch: ()=> {} }

  const [valueInput, setValueInput] = useState<string>("");
  const [usdInput, setUsdInput] = useState<string>("");
  const [tokenWrap, setTokenWrap] = useState<string>("");
  const [checkInput, setCheckInput] = useState<boolean>(false);

 useEffect(() => {
  if(valueInput==='' || state?.usdBtc === '0.00'){
    setUsdInput('')
  }else{
    const value = Number(valueInput);
    const amount = Number(state?.usdBtc);
    setUsdInput((value * amount).toFixed(2))
    }
 },[valueInput, state?.usdBtc])

 useEffect(() => {

  const blockchain = BLOCKCHAIN.find(block => block.name === state?.blockchain);

  if(blockchain){
    setTokenWrap(blockchain?.tokenWrap)
  }
  
  
 },[state?.blockchain])


  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^[0-9]-?\d*\.?\d{0,8}$/;


    if (regex.test(value) || value === "") {
      setValueInput(value);
    }

    parseFloat(value)<0.0006 ? setCheckInput(true) : setCheckInput(false)
    
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if(e.key === '+' || e.key === '-' || e.key === 'ArrowUp' || e.key === 'ArrowDown'){
      e.preventDefault();
    }
  }

  const handleWhell = (e: WheelEvent) => {
    e.preventDefault();

  }

  useEffect(() => {
    const inputElement = document.querySelector('input');
    inputElement?.addEventListener('wheel',  handleWhell,  {passive: false});
    return () => {
      inputElement?.removeEventListener('wheel',  handleWhell);
    
    }
  },[])

  return (
    <div className={`wrapping__menu ${state?.mobileMode ? 'mob': ''}`}>
      <p className="title">Redeem BTC</p>
      {state?.mobileMode ? <p className="title__input">Wrap</p> : ''}
      <div className="wrapping__input">
        <input
          type="number"
          value={valueInput}
          placeholder="0" 
          onChange={handleValueChange}
          onKeyDown={handleKeyDown}
        />

        <div className={`token__input ${usdInput=== ''? '':'active'}`}>
          <div className="token__name">
            <svg width="30" height="30" id='icon' >
              <use href='/img/crypto/wbtc-logo.svg#Layer_1'></use>
            </svg>
            <p>{tokenWrap}</p>
          </div>
          
          {usdInput === '' ? (''): <p className="token__value">~ $ {usdInput}</p>}
        </div>

        {checkInput ? (
          <div className='warning__input'>
            <svg width="14" height="14" id='icon' >
              <use href='/img/assets/exclamation-circle-fill.svg#icon'></use>
            </svg>
            <p>You can mint a minimum of 0.0006 BTC.</p>
          </div>
        ):('')}
      </div>


    </div>
  );
}