"use client"

import { useState, useEffect } from "react";
import { useAuth } from "./context/authentication";
import { useRouter } from "next/navigation";

export default function Home() {
  const {currentUser} = useAuth()
  const router = useRouter()

  useEffect(()=>{
        
    if (currentUser === null){
      router.replace('/login_users')
    }else{
      router.replace('/student/yourproject')
    }

  },[router.asPath,currentUser])
  
  return (
    <main>
       

      <main className=" px-10 my-10 h-screen" >
        
      
      
      </main>

    
            
    </main>
  );
}
