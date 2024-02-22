'use client'
import { useAuth } from "@/app/context/authentication";
import NavigationMenu from "@/components/layouts/navigationmanu";
import NavigationTop from "@/components/layouts/navigationtop";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function({children}){
    const {currentUser} = useAuth()
    const router = useRouter()
    
    useEffect(()=>{
        if (currentUser != null){
            
            if (currentUser.role == "STD" || currentUser.role == undefined || currentUser.role == null) {

            }else {
                
                router.replace('/teacher/subject')
            }
        }
    },[router.asPath,currentUser])

    return (
        <>
            <NavigationTop/>
            <div className="px-3">
            {children}
            
            </div>
            <NavigationMenu/>
        </>
    )
}