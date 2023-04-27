import React, { useEffect, useState, useContext } from "react";
import Image from 'next/image';
import { AppContext } from '../../pages/_app';
import Setting from "../header/Setting";
import Connect from "../header/Connect";
import Link from "next/link";
import SelectBlockchain from "../header/SelectBlockchain";
import NavMenu from "../NavMenu";



export default function Header() {



    const appContext = useContext(AppContext);
    const { state, dispatch } = appContext ?? { state: null, dispatch: ()=> {} }

    const [openSetting, setOpenSetting] = useState(false);

    const handleSetting = () => {
        setOpenSetting(!openSetting);
    }



    return (
    <header className="header__main">
        <Link href="/" className="header__logo">
            {
            state?.darkMode ? 
            (<Image src="/img/logo/logo_dark.png" alt="logo" width={786} height={162} priority/>):
            (<Image src="/img/logo/logo.png" alt="logo" width={779} height={162} priority/>)
            }
        </Link>
        <div className="header__nav">


{/*             <Link href='/' target="_blank" className="header__nav__item">
                Get Moonshine
            </Link> */}
            <SelectBlockchain />
            <Connect />
            <div className="setting__button">
                <svg width="20" height="20" id='icon' onClick={handleSetting}>
                    <use href="/img/assets/gear.svg#icon"></use>
                </svg>
                {
                openSetting && <Setting openSetting={openSetting} setOpenSetting={setOpenSetting} />
                }
            </div>

            <NavMenu />
        </div>








    </header>
  );

}