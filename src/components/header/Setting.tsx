import React, { useEffect, useState, useContext } from "react";
import { AppContext } from '@/pages/_app';
import { SettingProps } from "@/types/types";
import Link from "next/link";
import SelectBlockchain from "./SelectBlockchain";
import Image from "next/image";


export  default function  Setting(props: SettingProps) {


  const appContext = useContext(AppContext);
  const { state, dispatch } = appContext ?? { state: null, dispatch: ()=> {} }

  const { openSetting, setOpenSetting, display, setDisplay } = props;
  const [theme, setTheme] = useState('');
  const [isOpenLanguage, setIsOpenLenguage] = useState(false);

  useEffect(() => {
    const themeMode = localStorage.getItem('themeMode')
    if(themeMode!==null){
      const themeModeObj = JSON.parse(themeMode)
      setTheme(themeModeObj.theme)
    }

  }, [theme])


  const handleSetting = () => {
    setOpenSetting(false);
    setTimeout(()=>{
      setDisplay(false)
  },500);
  }

  const handleThemeChange = (newTheme: string) => {
    let theme, dark;
    if (newTheme === "light") {
        dispatch({type: 'themeMode', payload: false})
        theme = 'light';
        dark = false;
    } else if (newTheme === "dark") {
        dispatch({type: 'themeMode', payload: true})
        theme = 'dark';
        dark = true;
    } else {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      dispatch({type: 'themeMode', payload: mediaQuery.matches})
      theme = 'system';
      dark = mediaQuery.matches;
    }
    const themeMode = {theme, dark}
    setTheme(theme)
    localStorage.setItem('themeMode', JSON.stringify(themeMode))
  };

  const handleLanguage = () => {
    isOpenLanguage ? setIsOpenLenguage(false) : setIsOpenLenguage(true);

  }

  const languages = ['English', 'Arabic', 'Urdu', 'Bengali']

  useEffect(() => {
    if(isOpenLanguage){
      const handleClickOutside = (e: PointerEvent) => {
        const target = e.target as HTMLElement;
        if(!target.closest('.language__list') && !target.closest('.language')){
          setIsOpenLenguage(false);
        }
      }
      document.addEventListener('pointerdown', handleClickOutside);
      return () => document.removeEventListener('pointerdown', handleClickOutside);
    }

},[isOpenLanguage])



  return (
    <div className={`setting__menu ${display ? '' : 'display'} ${openSetting ? 'open' : ''}  ${state?.mobileMode ? 'mob': ''}`}>
      {state?.mobileMode ? (
        <div className='setting__item'>
          <p>Select Blockchain</p>
          <SelectBlockchain />
        </div>
      ):(
      <div className='close' onClick={handleSetting}>
        <svg width="20" height="20" id='icon' >
          <use href="/img/assets/x.svg#icon"></use>
        </svg>
      </div>
      )}
      <div className='setting__item'>
        <p>Theme</p>
        <div className="themeMode">
          <div onClick={() => handleThemeChange("light")} className={`themeMode__item ${theme === "light" ? "active" : ""}`}>Light</div>
          <div onClick={() => handleThemeChange("dark")} className={`themeMode__item ${theme === "dark" ? "active" : ""}`}>Dark</div>
          <div onClick={() => handleThemeChange("system")} className={`themeMode__item ${theme === "system" ? "active" : ""}`}>System</div>
        </div>

      </div>

      <div className='setting__item'>
        <p>Language</p>
        <div className="language" onClick={handleLanguage}>
          <p>English  
            <svg width="14" height="14" id='icon'>
              <use href="/img/assets/chevron-expand.svg#icon"></use>
            </svg>
          </p>
          {isOpenLanguage &&
          <div className="language__list">        
          {
            languages.map((item, index) => (
              <div className={`language__item ${item === "English" ? "active" : ""} ${item !== "English" ? "disabled" : ""}`} key={index} onClick={() => handleLanguage()}>{item}</div>
            ))
          }
          </div>
          }
        </div>
      </div>


      

      <div className='setting__item'>
        <Link href='https://docs.anetabtc.io/docs/user-guides/wrapping' target="_blank" className="item__link">
          <p>
            <svg width="14" height="14" id='icon'>
              <use href="/img/assets/question-circle.svg#icon"></use>
            </svg>
          How to use
          </p>
        </Link>  
      </div>

      {state?.mobileMode ? (
        <div className='setting__item'>
          <Link href='/feedback'>
          <p>
          {state?.darkMode ? (
              <Image src='/img/assets/feedback-dark.png' width={14} height={14} alt='feedback' />
            ): (
              <Image src='/img/assets/feedback-light.png' width={14} height={14} alt='feedback' />
            )}
            Feedback</p>
          </Link>
        </div>
      ):('')}

      <div className='setting__item'>
        <Link href='https://docs.anetabtc.io/' target="_blank">
        <p>
            <svg width="14" height="14" id='icon'>
              <use href="/img/assets/file-earmark-text.svg#icon"></use>
            </svg>
          Docs
        </p>
        </Link>
      </div>

      <div className='setting__item'>
        <Link href='https://github.com/anetabtc' target='_blank'>
          <p>
              <svg width="14" height="14" id='icon'>
                <use href="/img/assets/github.svg#icon"></use>
              </svg>
            GitHub
          </p>
        </Link>  
      </div>
      

    </div>
  )
}