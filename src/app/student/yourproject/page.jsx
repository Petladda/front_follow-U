"use client"
import { useAuth } from "@/app/context/authentication";
import { DataSubject } from "@/app/context/useDatasubject";
import axios from "axios"
import { useRouter } from "next/navigation";
import { useState,useEffect} from "react"
import Swal from 'sweetalert2'

export default function(){
    const router = useRouter()
    const swal = require('sweetalert2')
    const {subjectID} = DataSubject()
    const {currentUser,client} = useAuth()
    const [myproject , setMyProject] = useState([])

    const loadMyProject = async () =>{
        let result = await client.get(`/api/user/project`).then(
            r => {
                
                setMyProject(r.data)
            }
        )
    }

    
    const removeproject = (e)=>{
        
        Swal.fire({
            text: "คุณต้องการออกจากโปรเจกต์นี้หรือไม่ ?",
            icon: "warning",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonColor: "#4B8D76",
            cancelButtonText: "ยกเลิก",
            confirmButtonText: "ตกลง",
          }) 
          .then(async (result) => {
            if (result.isConfirmed) {
                await client.post(`/api/subject/${subjectID[0]}/project/${e.id}/remove`)
                
                Swal.fire({
                    title: "ออกจากโปรเจกต์นี้สำเร็จ!!",
                    icon: "success",
                });
            }
          });
    }

    useEffect(()=>{
        loadMyProject()
    },[currentUser,router.asPath])

    


    return (

        <main className="h-screen">
            <div className="flex flex-row justify-between mb-5">
                <p className="font-extrabold my-3">โปรเจกต์ของฉัน</p>
                    <div className="">     
                        
                        <button onClick={()=>router.push(`yourproject/joinproject`)} className=" w-36 h-12 text-mid-grey rounded-3xl border block  sticky inset-x-0 bottom-0 z-10  border-mid-grey drop-shadow-lg font-extrabold">+ เข้าร่วมโปรเจกต์</button>
                        
                    </div>
            </div>
        <div>
           {myproject.map((e) => {
                    return (
                        <div key={e.id} {...e} className="border mb-2 rounded-lg my-2 px-5 w-full h-11 flex flex-row justify-between">
                            <div onClick={()=> router.push(`yourproject/${e.id}/`)}   className="my-2 cursor-pointer"> ID : {e.id} ชื่อ : {e.project_name}</div>
                            <div className="flex flex-row justify-end ">
                                
                                <svg onClick={()=>removeproject(e)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 my-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                                </svg>
                            </div>
                            
                        </div>
                    )
                })}
        </div>
            
        
        </main>
        
    )
}