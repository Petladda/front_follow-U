
"use client"

import { useAuth } from "@/app/context/authentication";
import { useRouter } from "next/navigation";
import React, { useState ,useEffect} from "react";

const ProfilePage = () => {
    const [profileuser, setProfileUser] = useState(true)
    const {currentUser,client} = useAuth()
    const [meetingdetail, setMeetngDetail] = useState()
    const router = useRouter()

    
    const loadStandUpMeeting =()=>{
        client.get(`/api/user/stand-up-meeting`
        ).then((res)=>{
            console.log(res.data);
            setMeetngDetail(res.data)
        })
        
    }
    console.log("meetingdetail",meetingdetail);
    
    useEffect(()=>{
        loadStandUpMeeting()
    },[currentUser,router.asPath])
 
    return (
      <main className="flex flex-col h-screen px-6" >
        
        <p className="font-extrabold">Standup up Meeting</p>
        <div>
        
        </div>
       
      </main>
    )
  }
  
  export default ProfilePage;