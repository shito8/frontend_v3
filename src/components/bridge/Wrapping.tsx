import { WrappingProps } from "@/types/types";
import React, { useEffect, useState } from "react";

export default function Wrapping(props: WrappingProps) {

  const { bridgeWrapActive, setBridgeWrapActive } = props;

  if (bridgeWrapActive) {
    return (<Wrap />)

  }else{
    return (<Unwrap />)
  }

};


function Wrap(){

  const [valueInput, setValueInput] = useState<string>("");

 



  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    //const regex = /^[^-+a-zA-ZñÑáéíóúÁÉÍÓÚ]-?\d*\.?\d{0,8}$/;
    const regex = /^[0-9]-?\d*\.?\d{0,8}$/;



    if (regex.test(value) || value === "") {
      setValueInput(value);
    }
    

  };
  


  return (
    <div className="wrapping__menu">
      <p className="title">Mint eBTC</p>
      <div className="wrapping__input">
        <input
          type="text"
          value={valueInput}
          placeholder="Amount" 
          onChange={handleValueChange}
        />
      </div>
      <p>{valueInput}</p>

    </div>
  );
}

function Unwrap(){

  return (
    <div className="wrapping__menu">
      <p className="title">Redeem BTC</p>
    </div>
  );
}