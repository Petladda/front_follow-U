
"use client"

import { useAuth } from "@/app/context/authentication";
import React, { useState } from "react";

const ProfilePage = () => {
    const [profileuser, setProfileUser] = useState(true)
    const {currentUser} = useAuth()

    
    
 
    return (
      <main className="flex flex-col h-screen px-6" >
        
        <p className="font-extrabold">โปรไฟล์</p>
        <div className="flex flex-col w-full  mt-80">
            <img></img> 
            <p className="mb-3">ชื่อผู้ใช้</p>
            <p className="border w-25 h-12  px-3 py-2  rounded-2xl mb-5">{currentUser?.username}</p>
            <p className="mb-3">รหัสนิสิต</p>
            <p className="border w-25 h-12 px-3 py-2 rounded-2xl mb-5">{currentUser?.id_student}</p>
            <p className="mb-3">ชื่อจริง</p>
            <p className="border w-25 h-12 px-3 py-2 rounded-2xl mb-5">{currentUser?.first_name}</p>
            <p className="mb-3">นามสกุล</p>
            <p className="border w-25 h-12 px-3 rounded-2xl mb-5">{currentUser?.last_name}</p>
        </div>
      </main>
    )
  }
  
  export default ProfilePage;