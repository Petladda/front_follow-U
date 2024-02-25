"use client"

import React from "react";
import Select from "react-select"
import { useForm } from "react-hook-form";
import { useState,useEffect } from "react"

const ModalDetailTask = ({tid, closetask })=>{

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm()
    const [taskdetail, setTaskDetail] = useState([])


    useEffect(() => {
        setTaskDetail(tid)
      }, [tid]);

  
    return(
        <>
          <div className="justify-center fixed overflow-y-auto inset-0 top-2/4 z-10 -translate-y-2/4 -translate-x-2/4 left-2/4 w-96 h-4/5 border 
            rounded-xl drop-shadow-xl bg-white">
                <form>
                    <div className="flex flex-col pd-25 px-4">
                        <div className="text-center text-2xl font-extrabold my-9">
                            <h1>รายละเอียด Task</h1>
                        </div>
                        <div className="flex flex-col  ">
                            <p className="">Task ID</p>
                            <input value={taskdetail.task_id} disabled placeholder="ชื่อ task" className="shadow px-5 w-auto h-12 rounded-xl sm:w-auto lg:w-auto border-gray-700"  ></input>
                        </div>
                        <div className="flex flex-col mt-4">
                            <p className="">คำอธิบายสำหรับ Task </p>
                            <input value={taskdetail.task_name} disabled placeholder="คำอธิบาย"  className="shadow px-5 w-auto h-12 rounded-xl sm:w-auto lg:w-auto border-gray-700" ></input>
                        </div>
                        <div className="flex flex-col mt-4">
                            <p className="">รหัสนิสิต</p>
                            <input value={taskdetail.id_student} disabled placeholder="รหัสนิสิต"  className="shadow px-5 w-auto h-12 rounded-xl sm:w-auto lg:w-auto border-gray-700" ></input>
                        </div>
                        <div className="flex flex-col mt-4" >
                            <p className="">สถานะ</p>
                            <input value={taskdetail.status} disabled placeholder="สถานะ"  className="shadow px-5 w-auto h-12 rounded-xl sm:w-auto lg:w-auto border-gray-700" ></input>
                            
                        </div>
                        
                        <div className="flex flex-col mt-4">
                            <label className=" pb-3 pt-4">วันที่คาดว่าจะทำงานเสร็จ</label>
                            <input value={taskdetail.date_to_do} disabled placeholder="วันที่"  type="date" className="px-5 shadow w-auto h-12 rounded-xl sm:w-auto lg:w-auto " ></input>
                    
                        </div>
                        
                        <div className="flex flex-col mt-4">
                            <label className=" pb-3 pt-4">วันที่ทำงานเสร็จ</label>
                            <input value={taskdetail.date_done} disabled placeholder="วันที่" type="date" className="px-5 shadow w-auto h-12 rounded-xl sm:w-auto lg:w-auto " ></input>
                    
                        </div>
                        <div className="flex flex-col  mt-4 ">
                            <p className="pb-3 pt-4">เวลาที่คาดว่าจะทำงานเสร็จ</p>
                            <input value={taskdetail.hour_todo} disabled placeholder="กี่ชั่วโมง" className="shadow px-5 w-auto h-12 rounded-xl sm:w-auto lg:w-auto border-gray-700"  ></input>
                        </div>
                        <div className="flex flex-col  mt-4 ">
                            <p className="pb-3 pt-4">เวลาที่ทำงานเสร็จ</p>
                            <input value={taskdetail.hour_done} disabled placeholder="กี่ชั่วโมง" className="shadow px-5 w-auto h-12 rounded-xl sm:w-auto lg:w-auto border-gray-700"  ></input>
                        </div>
                        
                        <div className="my-8 justify-center ml-32 ">
                            <button className="h-12 w-24 border bg-primary rounded-md text-white" onClick={() => closetask(false)}>ปิด</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="fixed top-0 left-0 w-full h-full backdrop-blur-none"></div>
            <div className="fixed top-0 left-0  bg-black w-full h-full opacity-40 backdrop-blur-3xl" onClick={() => closetask(false)}></div>
        </>
    );
}

export default ModalDetailTask;