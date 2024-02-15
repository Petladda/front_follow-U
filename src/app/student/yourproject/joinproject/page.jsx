"use client"


import { useAuth } from "@/app/context/authentication";
import JoinProject from "@/components/form/joinproject";
import { useEffect, useState } from "react";

export default function({params}){


    return (
        <main className="w-full h-screen px-10 mt-24">
            
            <JoinProject/>

        </main>
    
    )
}