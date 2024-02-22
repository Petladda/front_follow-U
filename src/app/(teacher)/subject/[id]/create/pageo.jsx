"use client"

import FromCreateGroup from "@/components/form/createproject";

export default function({params}){
    
    

    return (
        <main className="px-10 h-screen">
            
            <FromCreateGroup sid={params.id}/>
            
            
         
        
        </main>
    
    )
}