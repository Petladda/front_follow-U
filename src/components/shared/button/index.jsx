"use client";
import React from "react";



const Button = ({color="secondary",onClick,title})=>{

    return(
        <>
        <button id="btnsubmit" type="submit" onClick={onClick}
        className={`border rounded-xl bg-${color} h-12 text-white disabled:bg-light-grey`}>{title}</button>

        </>
        

    )
}

export default Button;
