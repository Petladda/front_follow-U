"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/context/authentication";
import { useRouter } from "next/navigation";
const NavigationTop = ()=>{
    const {currentUser,submitlogout} = useAuth()
    const router = useRouter()

    
    const logout = (e) => {
      submitlogout(e)
      router.replace("/login_users")
    }
    
    return(
      <section id="top-navigation" className="block mb-6 h-12  bg-primary shadow">
      {
        currentUser ? (
          
          
          <div id="tabs" className="w-full flex  ">
           
            <a onClick={()=>router.push(`profile`)}
              className="w-full text-xl my-1 text-white cursor-pointer focus:text-secondary hover:text-secondary justify-center inline-block text-center pt-2 pb-1">
              <span className="tab tab-kategori block text-base ">{currentUser.first_name}</span>
            </a>
            <a
              onClick={logout}
              className="w-full my-1 text-white focus:text-secondary hover:text-secondary justify-center inline-block text-center pt-2 pb-1">  
              <button type="submit" className="tab tab-kategori block text-base ml-16 ">ออกจากระบบ</button>
            </a>
          </div>
        
        ) : (
          
            <div id="tabs" className="w-full flex  ">
            
              <a onClick={()=>router.push(`profile`)}
                className="w-full text-xl my-1 text-white cursor-pointer focus:text-secondary hover:text-secondary justify-center inline-block text-center pt-2 pb-1">
                <span className="tab tab-kategori block text-base ">โปรไฟล์</span>
              </a>
              <a
                href="login_users"
                className="w-full my-1 text-white focus:text-secondary hover:text-secondary justify-center inline-block text-center pt-2 pb-1">  
                <span className="tab tab-kategori block text-base font-extrabold ">เข้าสู่ระบบ</span>
              </a>
            </div>
          
        )
      }
         </section>
    )   
}

export default NavigationTop;

/*onclick to profile page ? */