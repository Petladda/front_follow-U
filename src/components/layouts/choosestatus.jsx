"use client"
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ChooseStatus = () => {
    const router = useRouter()
    return(
        <section className="px-24 my-20 ">
            <div className="text-base">
               <button onClick={()=>router.push('student/yourproject')} className="w-56 h-20 rounded-full text-center hover:text-white hover:bg-primary bg-light-green " >
                นิสิต
                </button> 
            </div>
            
            
            <div className="pt-8  text-base ">
            <button onClick={()=>router.push('teacher/subject')}  className="w-56 h-20 text-center rounded-full  hover:text-white hover:bg-primary  bg-light-green">
                อาจารย์
                </button> 
            </div>
          
            

            
        </section>
    )
}

export default ChooseStatus;