"use client"
import { useAuth } from "@/app/context/authentication";
import { useRouter } from "next/navigation";
import React from "react";

const NavbarTeacher = () => {
    
  const router = useRouter()
  const {currentUser,submitlogout} = useAuth()
  

  
  const logout = (e) => {
    submitlogout(e)
    router.replace("/login_users")
  }
    
    return (
        <section
        id="bottom-navigation"
        className="block sticky inset-x-0 bottom-0 z-10  bg-primary shadow "
      >
        {
        currentUser ? (
          
          
          <div id="tabs" className="w-full flex  ">
           
            <a onClick={()=>router.replace(`/teacher/profile_teacher`)}
              className="w-full text-xl my-1 text-white cursor-pointer focus:text-secondary hover:text-secondary justify-center inline-block text-center pt-2 pb-1">
              <span className="tab tab-kategori block text-base ">{currentUser.first_name}</span>
            </a>

            <a onClick={()=>router.replace(`/teacher/subject`)}
              className="w-full my-1  text-white focus:text-secondary hover:text-secondary justify-center inline-block text-center pt-2 pb-1">  
              <button type="submit" className="tab tab-kategori block text-base ml-16 ">สร้างวิชา</button>
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
                <span className="tab tab-kategori block text-base font-extrabold ">สร้างโปรเจกต์</span>
              </a>
            </div>
          
        )
      }
      </section>
    )
}

export default NavbarTeacher;