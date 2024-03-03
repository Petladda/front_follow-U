"use client"

import React from "react";
import Select from "react-select"
import { useState,useEffect } from "react"
import { useForm } from "react-hook-form";
import { useAuth } from "@/app/context/authentication";
import { DataSubject } from "@/app/context/useDatasubject";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'

const ModalTask = ({pid,bid,tid, closetask })=>{

    

    const {
        register,
        handleSubmit,
        setValue,
        clearErrors,
        reset,
        formState: { errors },
      } = useForm({
        defaultValues : tid
      })
    const swal = require('sweetalert2')
    const router = useRouter()
    const {currentUser,client} = useAuth()
    const {subjectID} = DataSubject()
    const [taskdetail, setTaskDetail] = useState([])

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
        setTaskDetail(tid)
      }, [tid]);


      //console.log("task: ",taskdetail);
      //console.log("tid:",tid);

    const onSubmit = async (e) => {
        
        let {data} = await client.put(`/api/subject/${subjectID[0]}/project/${pid}/productbacklog/${bid}/task-update/${tid.id}`,e);
        console.log("data =", data);
        setTaskDetail({
            ...taskdetail,
            
        })
        
    }

    const handleInputChange = (event) => {
        console.log(event.target.name,event.target.value);
        const { name, value } = event.target;
        setValue(name, value); 
        setTaskDetail({
            ...taskdetail,
            [event.target.name] : event.target.value
        })
        
      };

    const handleSelectStatus = (e) =>{
        setValue('status',e.value)
        clearErrors("note")
        
    }


    return(
        <>
          <div className="justify-center fixed overflow-y-auto inset-0 top-2/4 z-10 -translate-y-2/4 -translate-x-2/4 left-2/4 w-96 h-4/5 border 
            rounded-xl drop-shadow-xl bg-white">
                <form  onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col pd-25 px-4">
                        <div className="text-center text-2xl font-extrabold my-9">
                            <h1>แก้ไข</h1>
                        </div>
                        <div className="flex flex-col  ">
                            <p className="">task id</p>
                            <input placeholder="id ของ task" 
                            name="task_id" 
                            {...register("task_id")}
                            onChange={handleInputChange}
                            value={taskdetail.task_id}
                            className="shadow px-5 w-auto h-12 rounded-xl sm:w-auto lg:w-auto border-gray-700"  ></input>
                        </div>
                        <div className="flex flex-col mt-4">
                            <p className="">คำอธิบายสำหรับ Task </p>
                            <input placeholder="คำอธิบาย" 
                            name="task_name" 
                            {...register("task_name")}
                            value={taskdetail.task_name}
                            onChange={handleInputChange}
                            className="shadow px-5 w-auto h-12 rounded-xl sm:w-auto lg:w-auto border-gray-700" ></input>
                        </div>
                        <div className="flex flex-col mt-4">
                            <p className="">รหัสนิสิต</p>
                            <input placeholder="รหัสนิสิต" 
                            name="id_student" 
                            value={taskdetail.id_student}
                            {...register("id_student")}
                            onChange={handleInputChange}
                            className="shadow px-5 w-auto h-12 rounded-xl sm:w-auto lg:w-auto border-gray-700" ></input>
                        </div>
                        <div className="" >
                        <p className=" mb-3 mt-4">สถานะ</p>
                        <Select 
                            options={Status}
                            placeholder='เลือกสถานะการทำงาน'
                            value={Status.find(x => x.value == taskdetail?.status)}
                            onChange={handleSelectStatus}
                        ></Select>
                            
                        </div>
                        
                        <div className="flex flex-col mt-4">
                            <label className=" pb-3 pt-4">วันที่คาดว่าจะทำงานเสร็จ</label>
                            <input placeholder="วันที่" 
                            {...register("date_to_do")}
                            onChange={handleInputChange}
                            name="date_to_do" 
                            type="date"
                            value={taskdetail.date_to_do} 
                            className="px-5 shadow w-auto h-12 rounded-xl sm:w-auto lg:w-auto " ></input>
                    
                        </div>
                        
                        <div className="flex flex-col mt-4">
                            <label className=" pb-3 pt-4">วันที่ทำงานเสร็จ</label>
                            <input placeholder="วันที่"
                            {...register("date_done")}
                            value={taskdetail.date_done}
                            onChange={handleInputChange}
                            name="date_done" 
                            type="date" 
                            className="px-5 shadow w-auto h-12 rounded-xl sm:w-auto lg:w-auto " ></input>
                    
                        </div>
                        <div className="flex flex-col  mt-4 ">
                            <p className="pb-3 pt-4">เวลาที่คาดว่าจะทำงานเสร็จ / ชั่วโมง</p>
                            <input placeholder="กี่ชั่วโมง" 
                            {...register("hour_todo")}
                            onChange={handleInputChange}
                            name="hour_todo" 
                            value={taskdetail.hour_todo}
                            className="shadow px-5 w-auto h-12 rounded-xl sm:w-auto lg:w-auto border-gray-700"  ></input>
                        </div>
                        <div className="flex flex-col  mt-4 ">
                            <p className="pb-3 pt-4">เวลาที่ทำงานเสร็จ / ชั่วโมง</p>
                            <input placeholder="กี่ชั่วโมง" 
                            {...register("hour_done")}
                            onChange={handleInputChange}
                            name="hour_done" 
                            value={taskdetail.hour_done}
                            className="shadow px-5 w-auto h-12 rounded-xl sm:w-auto lg:w-auto border-gray-700"  ></input>
                        </div>
                        
                        <div className="my-8 flex flex-row justify-around">
                        <button type="button" className="h-12 w-24 border border-danger rounded-md text-danger" onClick={() => closetask(false)}>ยกเลิก</button>
                        <button className="h-12 w-24 border bg-primary rounded-md text-white" onClick={()=>router.replace(`/student/yourproject/${pid}/backlog/${bid}`)} >ตกลง</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="fixed top-0 left-0 w-full h-full backdrop-blur-none"></div>
            <div className="fixed top-0 left-0  bg-black w-full h-full opacity-40 backdrop-blur-3xl" onClick={() => closetask(false)}></div>
        </>
    );
}

export default ModalTask;

//update task อันเดียว?