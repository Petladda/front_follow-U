"use client"
import { useAuth } from "@/app/context/authentication";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function(){
    const [profileuser, setProfileUser] = useState(true)
    const router = useRouter()
    
    const {currentUser,submitlogout} = useAuth()
  

  
  const logout = (e) => {
    submitlogout(e)
    router.replace("/login_users")
  }
 
    return (
      <main className="flex flex-col my-8 h-screen px-16" >
        
        <p className="font-extrabold ">โปรไฟล์</p>
        <div className="flex flex-col w-full mt-80">
             
            <p className="mb-3">ชื่อผู้ใช้</p>
            <p className="border w-25 h-12  px-3 py-2  rounded-2xl mb-5">{currentUser?.username}</p>
            <div className="">
              <a onClick={()=>router.push(`changepassword`)} className="ml-24 cursor-pointer  text-mid-grey text-sm  underline underline-offset-2">เปลี่ยนรหัสผ่าน ?</a>  
            </div>
        </div>
        <button onClick={logout} className="w-44 h-12 border justify-center mt-28 rounded-xl ml-14 mr-5 sm:mr-24 bg-primary hover:bg-secondary text-center text-white">ออกจากระบบ</button>
      </main>
    )
}