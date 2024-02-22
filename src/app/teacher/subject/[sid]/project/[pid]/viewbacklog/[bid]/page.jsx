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
            {task.status === false ? ( 
            <div className="border border-danger rounded-lg my-5 px-5 w-full h-11 flex flex-row justify-between">
              <p className="my-2" onClick={() => handleSelectTask(task)}>{task.task_id}</p>
              <div className="flex flex-row justify-end ">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 my-2 mr-5 " onClick={() => handleSelectTask(task)}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 my-2" >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
              </div>
            </div>
            ) : (
              <div className="border border-success rounded-lg my-5 px-5 w-full h-11 flex flex-row justify-between">
                <p className="my-2">{task.task_id}</p>
                <div className="flex flex-row justify-end ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 my-2 mr-5 " onClick={() => handleSelectTask(task)}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 my-2" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
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