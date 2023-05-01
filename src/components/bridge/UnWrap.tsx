import React, { useEffect, useState, useContext } from "react";
import { AppContext } from '@/pages/_app';
import { BLOCKCHAIN } from "@/utils/blockchain";
import { validate } from 'multicoin-address-validator';


export default function UnWrap(){

  const appContext = useContext(AppContext);
  const { state, dispatch } = appContext ?? { state: null, dispatch: ()=> {} }

  const [valueInput, setValueInput] = useState<string>("");
  const [addressInput, setAddressInput] = useState<string>("");
  const [usdInput, setUsdInput] = useState<string>("");
  const [tokenWrap, setTokenWrap] = useState<string>("");
  const [chainWrap, setChainWrap] = useState<string>("");
  const [svgChainWrap, setSvgChainWrap] = useState<string>("");
  const [checkInput, setCheckInput] = useState<boolean>(false);
  const [checkAddress, setCheckAddress] = useState<boolean>(false);
  const [tokenReceive, setTokenReceive] = useState<string>("0.00");
  const [usdReceive, setUsdReceive] = useState<string>("");
  const [tokenFee, setTokenFee] = useState<string>("0.00");
  const [usdFee, setUsdFee] = useState<string>("");
  const [usdChainFee, setUsdChainFee] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);


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
    setChainWrap(blockchain?.ticker)
    setSvgChainWrap(blockchain?.svg)
  }
  
  
 },[state?.blockchain])

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
    const priceBtc = Number(state?.usdBtc);
    const priceAda = Number(state?.usdAda);
    const priceErg = Number(state?.usdErg);
    if(chainWrap === 'ERG'){
      setUsdChainFee(0.05*priceErg)
    }else if(chainWrap === 'ADA'){
      setUsdChainFee(0.5*priceAda)
    }
    setUsdInput((value * priceBtc).toFixed(2))
    setTokenReceive(((value*.995)-0.0001).toFixed(8).replace(/\.?0+$/, ''))
    setUsdReceive((((value*.995)-0.0001)*priceBtc).toFixed(2))
    setTokenFee(((value*.005)+0.0001).toFixed(8).replace(/\.?0+$/, ''))
    setUsdFee(((((value*.005)+0.0001)*priceBtc)+usdChainFee).toFixed(2))
  
    }
 },[valueInput, state?.usdBtc, state?.mobileMode, state?.usdAda, state?.usdErg, chainWrap, usdChainFee])


  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^[0-9]-?\d*\.?\d{0,8}$/;


    if (regex.test(value) || value === "") {
      setValueInput(value);
    }

    parseFloat(value)<0.0006 ? setCheckInput(true) : setCheckInput(false)
    
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const address = e.target.value;
    setAddressInput(address); 
  };

  const handleUnwrap = () => {
    setIsLoading(true);
    setTimeout(()=>{
      setIsLoading(false);
      const validAdrres = validate(addressInput, 'BTC', 'testnet');
      setAddressInput(validAdrres ? "true": 'false')
      validAdrres ? setCheckAddress(true) : setCheckAddress(false);
  },2000);


  }

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

      {
        state?.mobileMode ? (''):(
          <div className="section__address">
            <p className="title__address">BTC Destination Address</p>
            <input
              type="text"
              value={addressInput}
              placeholder="Enter Your BTC Destination Address" 
              onChange={handleAddressChange}
        />
          </div>
        )
      }

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
              <use href='/img/crypto/bitcoin-logo.svg#Layer_1'></use>
            </svg>
            <p>BTC</p>

          </div>
          {usdInput === '' ? '': <p className="value__section">= $ {usdReceive}</p>}
        </div>

      </section>

      </>) : 
      (<section className="wrapping__section">
        <p className="title__section">You Will Receive</p>

        <div className="token__section">
            <svg width="30" height="30" id='icon' >
              <use href='/img/crypto/bitcoin-logo.svg#Layer_1'></use>
            </svg>
          <p>{tokenReceive}</p>
          <p>BTC</p>
        {usdInput === '' ? '': <p className="value__section">= $ {usdReceive}</p>}
        </div>
      </section>)
      }

      <section className="fee__section">

        <p className="title__section">Bridge fee</p>
        <div className="token__section">
        <div>
          <svg width="26" height="26" id='icon' >
              <use href='/img/crypto/wbtc-logo.svg#Layer_1'></use>
          </svg>
          <p>{tokenFee}</p>
          <p>{tokenWrap}</p>
          <p>+</p>
          <svg width="26" height="26" id='icon' >
              <use href={svgChainWrap}></use>
          </svg>
          <p>{chainWrap === 'ERG' ? '0.05' : chainWrap === 'ADA' ? '0.5' : ''}</p>
          <p>{chainWrap}</p>
        </div>


        </div>
        {usdInput === '' ? '': <p className="value__section">= $ {usdFee}</p>}

      </section>


      {
        state?.mobileMode ? (
          <div className="section__address">
            <p className="title__address">BTC Destination Address</p>
            <input
              type="text"
              value={addressInput}
              placeholder="Enter Your BTC Destination Address" 
              onChange={handleAddressChange}
        />
          </div>
        ): ('')
      }

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
        ) : addressInput === '' ? (
        <div>
          <button className="wrapping__button disabled">
            Enter an BTC Destination Address
          </button>
        </div>
        ) : (
          <button className="wrapping__button" onClick={handleUnwrap}>
            {isLoading ? (<div className='spinner unwrap'></div>):('')}
            Unwrap {tokenWrap}
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

