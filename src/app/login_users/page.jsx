
"use client"


import LoginUsers from "@/components/register/login";
import { useLineLiff } from "../context/linecontext";
import { useState,useEffect} from "react"


const LoginPage = () => {
  

  return (
    <main className="h-screen px-5" >
      
      <LoginUsers/>
      
    </main>
  )
  }
  
  export default LoginPage;