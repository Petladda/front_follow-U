"use client"
import { useAuth } from "@/app/context/authentication";
import { DataSubject } from "@/app/context/useDatasubject";
import axios from "axios"
import { useRouter } from "next/navigation";
import { useState,useEffect} from "react"
import Swal from 'sweetalert2'

export default function(params){
    const router = useRouter()
    const swal = require('sweetalert2')
    const {subjectID} = DataSubject()
    const {currentUser,client} = useAuth()
    const [meeting , setMeeting] = useState([])
    const mid = params.params.mid

    const loadMeeting = () =>{
        client.get(`/api/stand_up_meeting/${mid}`)
        .then(r => {
                setMeeting(r.data)
            }
        )
    }

    useEffect(()=>{
        loadMeeting()
    },[])

    
    const get_currentUser_fullname = () => {
        return `${currentUser?.first_name ?? "first_name"} ${currentUser?.last_name ?? "last_name"}`
      }

    return (

        <form className="mt-5 rounded-xl p-5" >
            <div className="mb-4">
                <p className="text-dark-grey font-extrabold">Stand up Meeting </p>
            </div>
            <div>
              <div className="flex flex-col   ">
                
                <label className="  pb-3 pt-4">ชื่อ - สกุล</label>
                <input value={get_currentUser_fullname()} disabled className="shadow px-5 w-auto h-12 rounded-xl sm:w-auto lg:w-auto "  ></input>
               
                <label className="  pb-3 pt-4">รหัสนิสิต</label>
                <input value={currentUser?.id_student} disabled className="px-5 shadow w-auto h-12 rounded-xl  sm:w-auto lg:w-auto"></input>

                <label className="  pb-3 pt-4">ชื่อวิชา</label>
                <select className="shadow px-5 mb-6 w-full h-12 rounded-xl sm:w-auto lg:w-auto " name="subject">
                   <option ></option>
                </select>
                

                <label className="  pb-3 pt-4">รหัสโปรเจกต์</label>
                <select  name="project"  className="shadow px-5 mb-6 w-full h-12 rounded-xl sm:w-auto lg:w-auto ">
                   
                  <option>ไม่มีข้อมูล</option>
                </select>
                
 
                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 pb-3 pt-4">วันที่</label>
                <input value={meeting.date} placeholder="วันที่" type="date" className="px-5 shadow w-auto h-12 rounded-xl sm:w-auto lg:w-auto"></input>
                

                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 pb-3 pt-4">เมื่อวานทำอะไร</label>
                <input value={meeting.yesterday} placeholder="เมื่อวานทำอะไร" className="px-5 shadow w-auto h-12 rounded-xl sm:w-auto lg:w-auto" ></input>
                

                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 pb-3 pt-4">วันนี้จะทำอะไร</label>
                <input value={meeting.today}  placeholder="วันนี้จะทำอะไร" className="px-5 shadow w-auto h-12 rounded-xl sm:w-auto lg:w-auto"></input>
                

                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 pb-3 pt-4">ติดปัญหาตรงไหน</label>
                <input value={meeting.problem}  placeholder="ติดปัญหาตรงไหน" className="px-5 shadow w-auto h-12 rounded-xl sm:w-auto lg:w-auto" ></input>
                
            </div>
            <div className="mb-4">
                <p className="after:content-['*'] after:ml-0.5 after:text-red-500 mb-3 mt-4">หมายเหตุ</p>
                <input value={meeting.note} name="note"  className="shadow px-5 mb-6 w-full h-12 rounded-xl sm:w-auto lg:w-auto ">
                   
                 
                </input>
             
            </div>
            <div className="flex flex-col mb-5">
                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 pb-3 pt-4">อื่น ๆ</label>
                <input value={meeting.others} placeholder="อื่น ๆ" className="px-5 shadow w-auto h-12 rounded-xl sm:w-auto lg:w-auto" ></input>
               
            </div>
            <div className="flex flex-row justify-between ">
                <button className="w-44 h-12 border rounded-xl border-danger hover:bg-danger hover:text-white text-danger text-center  ml-5 sm:ml-24 md:mr-9 ">ยกเลิก</button>
                <button  className="w-44 h-12 border rounded-xl ml-5 mr-5 sm:mr-24 bg-primary hover:bg-secondary text-center text-white">ตกลง</button>
            </div>
            </div>
            
        </form>
        
    )
}