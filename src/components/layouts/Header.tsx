import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import { AppContext } from "../../pages/_app";
import Setting from "../header/Setting";
import Connect from "../header/Connect";
import Link from "next/link";
import SelectBlockchain from "../header/SelectBlockchain";
import NavMenu from "../NavMenu";
import { useRouter } from "next/router";



export default function Header() {
  const appContext = useContext(AppContext);
  const { state } = appContext ?? { state: null };

  if (state?.mobileMode) {
    return <HeaderMobile />;
  } else {
    return <HeaderDesktop />;
  }
}

/* --------------------------- */
/* FUNCTION HEADER DESKTOP    */
/* ------------------------- */

function HeaderDesktop() {
  const appContext = useContext(AppContext);
  const { state } = appContext ?? { state: null };

  const [openSetting, setOpenSetting] = useState(false);
  const [display, setDisplay] = useState(false);

  const handleClickMenu = () =>{
    if(display){
        setOpenSetting(false)
        setTimeout(()=>{
            setDisplay(false)
        },500);
    }else{
        setDisplay(true)
        setTimeout(()=>{
            setOpenSetting(true)
        },50);
    }
   
}

  useEffect(() => {
    if(openSetting){
      const handleClickOutside = (e: PointerEvent) => {
        const target = e.target as HTMLElement;
        if(!target.closest('.setting__menu')){
          setOpenSetting(false);
          setTimeout(()=>{
            setDisplay(false)
        },500);
        }
      }
      document.addEventListener('pointerdown', handleClickOutside);
      return () => document.removeEventListener('pointerdown', handleClickOutside);
    }

},[openSetting])

  return (
    <header className="header__main">
      <Link href="/" className="header__logo">
        {state?.darkMode ? (
          <Image
            src="/img/logo/logo_dark.png"
            alt="logo"
            width={786}
            height={162}
            priority
          />
        ) : (
          <Image
            src="/img/logo/logo.png"
            alt="logo"
            width={779}
            height={162}
            priority
          />
        )}
      </Link>
      <div className="header__nav">
        <SelectBlockchain />
        <Connect />
        <div className="setting__button">
          <svg width="20" height="20" id="icon" onClick={handleClickMenu}>
            <use href="/img/assets/gear.svg#icon"></use>
          </svg>
          {openSetting && (
            <Setting
              openSetting={openSetting}
              setOpenSetting={setOpenSetting}
              display={display}
              setDisplay={setDisplay}
            />
          )}
        </div>

        <NavMenu />
      </div>
    </header>
  );
}


/* ------------------------- */
/* FUNCTION HEADER MOBILE   */
/* ----------------------- */

function HeaderMobile() {
  const appContext = useContext(AppContext);
  const { state } = appContext ?? { state: null };

  const [active, setActive] = useState('');

  const [openSetting, setOpenSetting] = useState(false);
  const [display, setDisplay] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      setActive(url);
    }
    setActive(window.location.pathname);
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    }
    
  
  }, [router.events]);





  useEffect(() => {
    if(openSetting){
      const handleClickOutside = (e: PointerEvent) => {
        const target = e.target as HTMLElement;
        if(!target.closest('.setting__menu')){
          setOpenSetting(false);
          setTimeout(()=>{
            setDisplay(false)
        },500);
        }
      }
      document.addEventListener('pointerdown', handleClickOutside);
      return () => document.removeEventListener('pointerdown', handleClickOutside);
    }

},[openSetting])

  const handleMenuClick = (menu: string) =>{
    setActive(menu);
  }

  const handleClickMenu = () =>{
    if(display){
        setOpenSetting(false)
        setTimeout(()=>{
            setDisplay(false)
        },500);
    }else{
        setDisplay(true)
        setTimeout(()=>{
            setOpenSetting(true)
        },50);
    }
   
}

  return (
    <header className="header__main mob">
      <Link href="/" className="header__logo">
        <Image
          src="/img/logo/angel.png"
          alt="logo"
          width={100}
          height={100}
          priority
        />
      </Link>
      <div className="navigation__group">
            <Link href="/" className={active === '/' ? 'navigation__item active' : 'navigation__item'} onClick={() => handleMenuClick('/')}>
                <p>Bridge</p>
            </Link>
            <Link href="/dashboard" className={active === '/dashboard' ? 'navigation__item active' : 'navigation__item'} onClick={() => handleMenuClick('/dashboard')}>
                <p>Overview</p>
            </Link>
            <Link href="/transactions" className={active === '/transactions' ? 'navigation__item active' : 'navigation__item'} onClick={() => handleMenuClick('/transaction')}>
                <p>Order</p>
            </Link>
      </div>
      <div className="setting__group">
        <Connect />
        <div className="setting__button" onClick={handleClickMenu}>
            <button className={`button__menu  ${openSetting ? 'open' : ''}`} >
                <div></div>
                <div></div>
                <div></div>
            </button>
        </div>

        <Setting
                openSetting={openSetting}
                setOpenSetting={setOpenSetting}
                display={display}
                setDisplay={setDisplay}
            />

      </div>


    </header>
  );
}
