"use client"

import { useForm } from "react-hook-form"
import { useState,useEffect } from "react"
import axios from "axios";
import Swal from 'sweetalert2'
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/authentication";
import { DataSubject } from "@/app/context/useDatasubject";
import Select from "react-select"
import ModalDetailTask from "@/components/modal/modaldetailtask";


export default function(params){
  const swal = require('sweetalert2')
  const router = useRouter()
  const {client} = useAuth()
  const {subject,subjectID} = DataSubject()
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [backlogdetail, setBacklogDetail] = useState([])
  const [task_set, setTask_Set] = useState([])
  const [members , setMembers] = useState([])
  const [openModalTask, setModalTask] = useState(false);
  const [selecttask,setSelectTask] = useState()
  
 // console.log("params",task_set);
  const pid = params.params.pid
  const bid = params.params.bid
  

  const Status = [
      {value: 'todo',label: "todo"},
      {value: 'doing',label: "doing"},
      {value: 'done',label: "done"},
      
  ]

  const Priority = [
      {value: 'low',label: "low"},
      {value: 'midium',label: "midium"},
      {value: 'high',label: "high"},
      
  ]

  useEffect(() => {
   const loadProjectDetail = () => {
     if (subjectID.length > 0 && client && pid) {
       client.get(`/api/subject/${subjectID[0]}/project/${pid}/productbacklog/${bid}`)
         .then((res) => {
            setBacklogDetail(res.data);
            setTask_Set(res.data.task_set);
            setMembers(res.data.members);
         })
         .catch((error) => {
           console.error('Error loading project detail:', error);
         });
     }
   };

   loadProjectDetail();
 }, [subjectID, client,pid],router.asPath);

  const handleSelectStatus = (e) =>{
      setValue('Status',e.value)
      console.log("setValue",e);
  }

    

  
  

  const handleSelectTask =(task)=>{
    setModalTask(true)
    setSelectTask(task)
  }
   

  const handleAddTodo = () => (
    setTodos([...todos, inputValue])
  );

  return (
    <main className=" px-6 mt-7 mb-3" >
      
        <div className="flex flex-col">
            <div className="text-xl font-extrabold text-center">
                <p>Product backlog : {bid} </p>
            </div>
            <div className="flex flex-col mt-4">
                <p className=" mb-2">ชื่อ product backlog</p>
                <p   className="shadow px-5 w-auto pt-3 h-11 rounded-xl sm:w-auto lg:w-auto border-gray-700"  >{backlogdetail.title_product}</p>
            </div>
            <div className="flex flex-col mt-4">
                <p className=" mb-2">คำอธิบายสำหรับ product backlog </p>
                <p placeholder="คำอธิบาย"  className="shadow px-5 w-auto pt-3  h-11 rounded-xl sm:w-auto lg:w-auto border-gray-700" >{backlogdetail.description}</p>
            </div>
            <div className="flex flex-col mt-4">
                <label className=" mb-2">วันที่คาดว่าจะทำงานเสร็จ</label>
                <p placeholder="วันที่"  type="date" className="px-5 shadow pt-3  w-auto h-11 rounded-xl sm:w-auto lg:w-auto border-gray-700" >{backlogdetail.date_to_do}</p>
            </div>
            <div className="flex flex-col  mt-4 ">
                <p className=" mb-2">เวลาที่คาดว่าจะทำงานเสร็จ / ชั่วโมง</p>
                <p placeholder="กี่ชั่วโมง" className="shadow pt-3  px-5 w-auto h-11 rounded-xl sm:w-auto lg:w-auto border-gray-700"  >{backlogdetail.hour_todo}</p>
            </div>
            <div className="" >
                <p className=" mb-2 mt-4">สถานะ</p>
                <p  className="shadow pt-3  px-5 w-auto h-11 rounded-xl sm:w-auto lg:w-auto border-gray-700"  >{backlogdetail.status}</p>
                    
            </div>
            <div className="" >
                <p className=" mb-2 mt-4 ">ความสำคัญ</p>
                <p className="shadow pt-3  px-5 w-auto h-11 rounded-xl sm:w-auto lg:w-auto border-gray-700"  >{backlogdetail.important}</p>

                    
            </div>
            <div className="flex flex-col mt-4">
                <label className="mb-2">วันที่ทำงานเสร็จ</label>
                <p placeholder="วันที่" type="date" className="px-5 pt-3 shadow w-auto h-11 rounded-xl sm:w-auto lg:w-auto " >{backlogdetail.date_done}</p>
            </div>
            
            <div className="flex flex-col  mt-4 ">
                <p className="mb-2">เวลาที่ทำงานเสร็จ / ชั่วโมง</p>
                <p placeholder="กี่ชั่วโมง" className="shadow px-5 pt-3 w-auto h-11 rounded-xl sm:w-auto lg:w-auto border-gray-700"  >{backlogdetail.hour_done}</p>
            </div>
        </div>
   

      <div className="border-b-2 my-6 border-extar-light-grey "></div>
      <p className="">Tasks</p>
      
      <form   >
        <div className=" form-control my-2 flex flex-row">
          <div className="w-full pr-2">
          <input name="taskname"   type="text" placeholder="เพิ่มtask" className="h-8 w-full border rounded-lg pl-2 text-sm"  />
          </div>
          <button type="submit" className="h-8 w-12  bg-primary rounded-lg text-white" >เพิ่ม</button>
        </div>
      </form>
      <ul>
        {task_set.map((task,index) => (
          
          <div key={task.id} {...task} >
            {task.status === "done" ? ( 
            <div className="border border-success rounded-lg my-5 px-5 w-full h-11 flex flex-row justify-between">
              <p className="my-2" onClick={() => handleSelectTask(task)}>{task.task_id}</p>
              <div className="flex flex-row justify-end ">
                  <svg onClick={() => handleSelectTask(task)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 my-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>

                 
              </div>
            </div>
            ) : (
              <div className="border border-danger  rounded-lg my-5 px-5 w-full h-11 flex flex-row justify-between">
                <p className="my-2" onClick={() => handleSelectTask(task)} >{task.task_id}</p>
                <div className="flex flex-row justify-end ">
                    <svg onClick={() => handleSelectTask(task)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 my-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                   
                </div>
              </div>
            )}
            
            
          </div>
        ))}
      </ul>
      {openModalTask && <ModalDetailTask tid={selecttask} closetask={setModalTask}
      
      />}
    </main>
  )
}

// reload page when create or delete object
// เลือกรหัสนิสิต จาก members
// show status 