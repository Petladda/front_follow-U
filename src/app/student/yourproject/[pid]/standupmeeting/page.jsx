
"use client"

import { useAuth } from "@/app/context/authentication";
import { useRouter } from "next/navigation";
import React, { useState ,useEffect} from "react";


export default function({params}) {
    const [profileuser, setProfileUser] = useState(true)
    const {currentUser,client} = useAuth()
    const [meetingdetail, setMeetngDetail] = useState()
    const router = useRouter()
    const swal = require('sweetalert2')
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    

    
    const loadStandUpMeeting =()=>{
        client.get(`/api/user/stand-up-meeting/${params.pid}`
        ).then((res)=>{
          console.log("res",res)
            setMeetngDetail(res.data)
        })
        
    }
    //console.log("meetingdetail",meetingdetail);

    const handleDeleteMeeting =(e)=>{
      client.delete(`/api/stand_up_meeting-delete/${e}`)
      .then((res)=>{
        if (res.status === 201) {
          swal.fire({
              title: "ลบ Stand up Meeting สำเร็จ!!! ",
              icon: "success",
              toast: true,
              timer: 2000,
              position: 'top-right',
              timerProgressBar: true,
              showConfirmButton: false,
          })
      }
      })
    }
    
    useEffect(()=>{
        loadStandUpMeeting()
    },[currentUser,router.asPath])

    const filteredMeetings = meetingdetail?.filter((meeting) => {
      const meetingDate = new Date(meeting.date);
      const filterStartDate = startDate ? new Date(startDate) : null;
      const filterEndDate = endDate ? new Date(endDate) : null;

      if (filterStartDate && meetingDate < filterStartDate) {
          return false;
      }

      if (filterEndDate && meetingDate > filterEndDate) {
          return false;
      }

      return true;
    });
 
    return (
      <main className="flex flex-col h-screen px-3" >
        
        <p className="font-extrabold mb-2">Stand up Meeting</p>
        
        <div className="mb-2 flex flex-row justify-between " >
          เริ่ม : <input type="date" 
          value={startDate} 
          onChange={e => setStartDate(e.target.value)}  className="border rounded-lg px-1 " />
          ถึง : <input type="date" 
          value={endDate} 
          onChange={e => setEndDate(e.target.value)} className="border rounded-lg px-1 "/>
          
       
        </div>
        {filteredMeetings && filteredMeetings.map((e) => {
            return (
                
                <div key={e.id} {...e} className="border mb-2 rounded-lg my-2 px-5 w-full h-11 flex flex-row justify-between">
                <div onClick={()=> router.push(`/student/yourproject/${params.pid}/standupmeeting/${e.id}`)}   className="my-2 cursor-pointer">วันที่ : {e.date}  ชื่อ : {e.student.first_name} {e.student.last_name}   </div>
                <div className="flex flex-row justify-end ">
                    
                <svg onClick={()=>handleDeleteMeeting(e.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 my-2" >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
                </div>
                
            </div>
            )
        })}
       
      </main>
    )
  }
  
