import React, { useEffect, useState, useContext } from "react";
import { AppContext } from '@/pages/_app';

export default function  WrongAddress() {

  const appContext = useContext(AppContext);
  const { state} = appContext ?? { state: null }



  return (
    <section className={`wrong-address ${state?.mobileMode ? 'mob': ''}`}>
      <div className="wrong-address__pop">
        <div className="popUp">
          <p>Please enter a valid BTC Destination Address</p>
          <button>Ok</button>
        </div>
      </div>
    </section>

  )
}