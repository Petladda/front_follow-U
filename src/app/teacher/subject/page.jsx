"use client"
import { useAuth } from "@/app/context/authentication";
import { DataSubject } from "@/app/context/useDatasubject";
import axios from "axios"
import { useRouter } from "next/navigation";
import { useState,useEffect} from "react"
import Swal from 'sweetalert2'



export default function(){
    const swal = require('sweetalert2')
    
    const {client,currentUser} = useAuth()
    const {subject} = DataSubject()
    const router = useRouter()
    const [mysubject , setMySubject] = useState([])

    const loadMySubject= async () =>{
        let result = await client.get(`/api/user/subject`).then(
            r => {
                console.log(r.data);
                setMySubject(r.data)
            }
        )
    }

    useEffect(()=>{
        loadMySubject()
    },[currentUser,router.asPath]) 
    
    async function deleteSubject(e) {
        await client.delete(`/api/subject-delete/${e.id}/`)
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

    const handleEdit = () =>{

    }
    


    return (
    <main className=" px-4 my-8  h-screen " >
    <div className="flex flex-row justify-between mb-5">
    <p className="font-extrabold my-3">รายวิชาทั้งหมด</p>
        <div className="">     
            
            <button onClick={()=>router.push(`subject/createsubject`)} className=" w-36 h-12 text-mid-grey rounded-3xl border block  sticky inset-x-0 bottom-0 z-10  border-mid-grey drop-shadow-lg font-extrabold">+ สร้างวิชา</button>
            
        </div>
    </div>
    <div>
        {mysubject.map((e) => {
            return (
                <div key={e.id} {...e} className="border mb-2 rounded-lg my-2 px-5 w-full h-11 flex flex-row justify-between">
                    <div onClick={()=> router.push(`subject/${e.id}`)}   className="my-2 cursor-pointer">  วิชา {e.subject_name}  id: {e.id} </div>
                    <div className="flex flex-row justify-end ">
                        <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 my-2 mr-5 " >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>

                        <svg onClick={()=>{deleteSubject(e)}}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 my-2" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </div>
                    
                </div>
            )
        })}
    {subject.length === 0 && <div>ไม่มีรายวิชา</div>}
    </div>
    
   </main>)
}

/*ส่งชื่อเข้าไปที่ id วิชาด้วย?
alert เวลาจะลบ
*/