import { WrappingProps } from "@/types/types";
import React from "react";
import Wrap from "./Wrap";
import UnWrap from "./UnWrap";



export default function Wrapping(props: WrappingProps) {

  const { bridgeWrapActive, setBridgeWrapActive } = props;

  if (bridgeWrapActive) {
    return (<Wrap />)

  }else{
    return (<UnWrap />)
  }

};

/* --------------- */
/* FUNCTION WRAP  */
/* ------------- */






/* ----------------- */
/* FUNCTION UNWRAP  */
/* --------------- */

