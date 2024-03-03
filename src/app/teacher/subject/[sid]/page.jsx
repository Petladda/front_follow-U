"use client"
import { useAuth } from "@/app/context/authentication";
import axios from "axios"
import { useRouter } from "next/navigation";
import { useState,useEffect} from "react"
import Swal from 'sweetalert2'

export default function({params}){
    const swal = require('sweetalert2')
    const {client} = useAuth()
    const router = useRouter()

    const [project, setProject] = useState([])
    const [subject, setSubject] = useState([])
    
    


    const getProject= ()=> {
        client.get(`/api/subject/${params.sid}/`)
        .then((res)=>{
            setProject(res.data.project_set)
            setSubject(res.data)
        })

    }

    async function deleteProject(e) {
        await client.delete(`/api/subject/${params.sid}/project-delete/${e.id}/`)
        Swal.fire({
            title: "คุณต้องการลบวิชานี้หรือไม่ ?",
            icon: "warning",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonColor: "#3085d6",
            cancelButtonText: "ยกเลิก",
            confirmButtonText: "ตกลง",
            
        })
        .then((result) => {
            if (result.isConfirmed) {
                  Swal.fire({
                    title: "ลบวิชานี้สำเร็จ!",
                    icon: "success"
                  });
                }
              });         
       
    }
    
    
    useEffect(() => {
        getProject()
    }, []);
    

    return (
        <main className="px-4 h-screen ">
            <div className="flex mt-8 flex-row justify-between">
                <p className="font-extrabold my-3">โปรเจกต์ทั้งหมดในรายวิชา</p>
                <button onClick={()=>router.push(`${params.sid}/create`)} className=" w-36 h-12 text-mid-grey rounded-3xl border block  sticky inset-x-0 bottom-0 z-10  border-mid-grey drop-shadow-lg font-extrabold">+ สร้างโปรเจกต์</button>    
            </div>
            
            <div className="mt-7">
                {project.map((e) => {
                    return (
                        <div key={e.id} {...e} className="border mb-2 rounded-lg my-2  px-5 w-full h-11 flex flex-row justify-between">
                            <div onClick={()=> router.push(`/teacher/subject/${params.sid}/project/${e.id}/`)}   className="my-2 cursor-pointer"> id: {e.id}  ชื่อโปรเจกต์ : {e.project_name}  </div>
                            <div className="flex flex-row justify-end ">
                                

                                <svg onClick={()=>deleteProject(e)}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 my-2" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </div>
                            
                        </div>
                    )
                })}
                {project.length === 0 && <div>ไม่มีโปรเจกต์</div>}
            </div>


        </main>
    
    )
}