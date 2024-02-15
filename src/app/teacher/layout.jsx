'use client'
import { useAuth } from "@/app/context/authentication";
import NavbarTeacher from "@/components/layouts/navbarteacher";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function({children}){
    const {currentUser} = useAuth()
    const router = useRouter()
    console.log(currentUser)
 
    useEffect(()=>{
        
        if (currentUser != null){
            if (currentUser.role == "TCH") {
                
            }else {
                router.replace('/student/yourproject')
            }
        }
    },[router.asPath,currentUser])
    
    return (
        <>
            
            <div className="h-screen">
            {children}
            </div>
            <NavbarTeacher/>
        </>
    )
}