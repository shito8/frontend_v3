import React, { useEffect, useState, useContext } from "react";
import Image from 'next/image';
import { AppContext } from '../../pages/_app';
import Setting from "../header/Setting";
import Connect from "../header/Connect";



export default function Header() {



    const appContext = useContext(AppContext);
    const { state, dispatch } = appContext ?? { state: null, dispatch: ()=> {} }

    const [openSetting, setOpenSetting] = useState(false);

    const handleSetting = () => {
        setOpenSetting(!openSetting);
    }



    return (
    <header className="header__main">
        <div className="header__logo">
            {
            state?.darkMode ? 
            (<Image src="/img/logo/logo_dark.png" alt="logo" width={786} height={162} priority/>):
            (<Image src="/img/logo/logo.png" alt="logo" width={779} height={162} priority/>)
            }
        </div>
        <div className="header__nav">

            <Connect />
            <div className="setting__button">
                <svg width="20" height="20" id='icon' onClick={handleSetting}>
                    <use href="/img/assets/gear.svg#icon"></use>
                </svg>
                {
                openSetting && <Setting openSetting={openSetting} setOpenSetting={setOpenSetting} />
                }
            </div>
        </div>








    </header>
  );

}