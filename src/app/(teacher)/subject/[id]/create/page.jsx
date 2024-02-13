"use client"

import FromCreateGroup from "@/components/form/createproject";

export default function({params}){
    
    

    return (
        <main className="px-10 h-screen">
            
            <FromCreateGroup sid={params.id}/>
            
            <div>
                <p>Show Subject BY ID : {params.id} โหลดข้อมูลโปรเจคในรายวิชานี้ออกมา </p>
                <p>name : </p>
            </div>
         
        
        </main>
    
    )
}