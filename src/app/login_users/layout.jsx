'use client'
import { useAuth } from "@/app/context/authentication";
import NavigationMenu from "@/components/layouts/navigationmanu";
import NavigationTop from "@/components/layouts/navigationtop";
import { useRouter } from "next/navigation";
import { Children, useEffect } from "react";

export default function({children}){
    const {currentUser} = useAuth()
    const router = useRouter()
    
    

    return (
        <>
            <NavigationTop/>
            {children}
            <NavigationMenu/>
        </>
    )
}