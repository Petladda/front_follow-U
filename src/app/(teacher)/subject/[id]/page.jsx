"use client"
import axios from "axios"
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useState,useEffect} from "react"
import Swal from 'sweetalert2'

export default function({params}){
    const swal = require('sweetalert2')
    const client = axios.create({
        baseURL: "http://127.0.0.1:8000"
      });
    const router = useRouter()
    //const params = useParams()
    const [project, setProject] = useState([])
    const [subject, setSubject] = useState([])
    const id = params.id
    

    const getProject= ()=> {
        client.get(`/api/subject/${id}/`)
        .then((res)=>{
            setProject(res.data.project_set)
            setSubject(res.data)
        })

    }
    
    
    useEffect(() => {
        getProject()
    }, []);
    

    return (
        <main className="px-10 h-screen">
            <div className="flex flex-row justify-between">
                <p className="font-extrabold my-3">โปรเจกต์ในรายวิชาทั้งหมด</p>
                <button onClick={()=>router.push(`/subject/${id}/create`)} className=" w-36 h-12 text-mid-grey rounded-3xl border block  sticky inset-x-0 bottom-0 z-10  border-mid-grey drop-shadow-lg font-extrabold">+ สร้างโปรเจกต์</button>    
            </div>
            
        <div className="mt-7">
            {project.map((e) => {
                return (
                    <div key={e.id} {...e} className="border mb-2 rounded-lg my-2  px-5 w-full h-11 flex flex-row justify-between">
                        <div onClick={()=> router.push(`/subject/${e.id}/project/${e.id}/`)}   className="my-2 cursor-pointer"> id: {e.id}  ชื่อ {e.project_name}  </div>
                        <div className="flex flex-row justify-end ">
                            

                            <svg   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 my-2" >
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
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