"use client"
import { useRouter } from "next/navigation";
import React from "react";

const NavigationMenu = () => {
    
  const router = useRouter()
    
    
    return (
        <section
        id="bottom-navigation"
        className="block sticky inset-x-0 bottom-0 z-10  bg-primary shadow "
      >
        <div id="tabs" className="w-full flex justify-between">
          <a
            onClick={()=>router.replace(`/subject`)}
            className="w-full cursor-pointer text-white focus:text-secondary hover:text-secondary justify-center inline-block text-center pt-2 pb-1"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 42 42"
              className="inline-block mb-1 "
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-slot="icon" className="w-6 h-6">
               <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>

            </svg>

            
            <span className="tab tab-kategori block text-xs">โปรเจกต์ฉัน</span>
          </a>
   
          <a
            onClick={()=>router.push(`/subject`)}
            
            className="w-full cursor-pointer text-white focus:text-secondary hover:text-secondary justify-center inline-block text-center pt-2 pb-1"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 42 42"
              className="inline-block mb-1"
            >

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-slot="icon" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
              
            </svg>

            </svg>
            <span className="tab tab-whishlist block text-xs">โปรเจกต์</span>
          </a>
          <a
            href="dailyscrum"
            className="w-full text-white focus:text-secondary hover:text-secondary justify-center inline-block text-center pt-2 pb-1"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 42 42"
              className="inline-block mb-1"
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-slot="icon" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            

            </svg>
            <span className="tab tab-account block text-xs">Daily Scrum</span>
            
          </a>
        </div>
      </section>
    )
}

export default NavigationMenu;