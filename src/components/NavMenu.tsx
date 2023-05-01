import React, {useEffect, useState, useContext} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AppContext } from "@/pages/_app";
import { useRouter } from "next/router";

export default function NavMenu() {

  const appContext = useContext(AppContext);
  const { state } = appContext ?? { state: null };

  const [active, setActive] = useState('');

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

  const handleMenuClick = (menu: string) =>{
    setActive(menu);
  }




  return (
    <div className="navMenu">
      <div className="chain">
          <p>Testnet</p>
      </div>
      <div className="navigation__group">
        <Link href="/" className={active === '/' ? 'navigation__item active' : 'navigation__item'} onClick={() => handleMenuClick('/')}>
          {state?.darkMode ? (
            <Image src='/img/assets/bridge-dark.png' width={20} height={20} alt='bridge' />
          ): (
            <Image src='/img/assets/bridge-light.png' width={20} height={20} alt='bridge' />
          )}
          <p>Bridge</p>
          
        </Link>
        <Link href="/transactions" className={active === '/transactions' ? 'navigation__item active' : 'navigation__item'} onClick={() => handleMenuClick('/transaction')}>
        {state?.darkMode ? (
            <Image src='/img/assets/transactions-dark.png' width={16} height={16} alt='transactions' />
          ): (
            <Image src='/img/assets/transactions-light.png' width={16} height={16} alt='transactions' />
          )}
          <p>Transactions</p>
        </Link>
        <Link href="/dashboard" className={active === '/dashboard' ? 'navigation__item active' : 'navigation__item'} onClick={() => handleMenuClick('/dashboard')}>
        {state?.darkMode ? (
            <Image src='/img/assets/dashboard-dark.png' width={16} height={16} alt='dashboard' />
          ): (
            <Image src='/img/assets/dashboard-light.png' width={16} height={16} alt='dashboard' />
          )}

          <p>Dashboard</p>
          
        </Link>


        <div className='line'></div>

        <Link href="/feedback" className={active === '/feedback' ? 'navigation__item active' : 'navigation__item'} onClick={() => handleMenuClick('/feedback')}>
        {state?.darkMode ? (
            <Image src='/img/assets/feedback-dark.png' width={20} height={20} alt='feedback' />
          ): (
            <Image src='/img/assets/feedback-light.png' width={20} height={20} alt='feedback' />
          )}
          <p>Feedback</p>
          
        </Link>

        <Link href="https://docs.anetabtc.io" target='_blank' className={'navigation__item'}>
        {state?.darkMode ? (
            <Image src='/img/assets/docs-dark.png' width={20} height={20} alt='feedback' />
          ): (
            <Image src='/img/assets/docs-light.png' width={20} height={20} alt='feedback' />
          )}
          <p>Docs
          {state?.darkMode ? (
            <Image src='/img/assets/link-dark.png' width={8} height={8} alt='link' />
          ): (
            <Image src='/img/assets/link-light.png' width={8} height={8} alt='link' />
          )}
          </p>
          
        </Link>

        <div className='social__media'>

          <Link href='https://twitter.com/anetaBTC' target='_blank'>
              <svg width="16" height="16" id='icon'>
                <use href="/img/assets/twitter.svg#icon"></use>
              </svg>
            </Link>
            <Link href='https://t.me/anetaBTC' target='_blank'>
              <svg width="16" height="16" id='icon'>
                <use href="/img/assets/telegram.svg#icon"></use>
              </svg>
            </Link>
            <Link href='https://discord.com/invite/ScXG76dJXM' target='_blank'>
              <svg width="16" height="16" id='icon'>
                <use href="/img/assets/discord.svg#icon"></use>
              </svg>
            </Link>
            <Link href='https://medium.com/@anetaBTC' target='_blank'>
              <svg width="16" height="16" id='icon'>
                <use href="/img/assets/medium.svg#icon"></use>
              </svg>
            </Link>
            <Link href='https://github.com/anetaBTC' target='_blank'>
              <svg width="16" height="16" id='icon'>
                <use href="/img/assets/github.svg#icon"></use>
              </svg>
            </Link>

        </div>



      </div>
    </div>
  )
}