"use client"

import React from "react";
import Select from "react-select"
import { useState,useEffect } from "react"
import { useForm } from "react-hook-form";
import { useAuth } from "@/app/context/authentication";
import { DataSubject } from "@/app/context/useDatasubject";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'

const ModalUpdateSubject = ({subject,closesubject})=>{

    
    const swal = require('sweetalert2')
    const router = useRouter()
    const {currentUser,client} = useAuth()
    const {subjectID} = DataSubject()
    const [subjectput,setSubjectPut] = useState("")

    const {
        register,
        handleSubmit,
        setValue,
        clearErrors,
        reset,
        formState: { errors },
      } = useForm({
        defaultValues : subject
      })

    useEffect(() => {
        setSubjectPut(subject)
      }, [subject]);

    const putSubject = async(e)=>{
        console.log("e =",e);
        let {data} = await client.put(`/api/subject-update/${subject.id}/`,e
        )
        setSubjectPut({
            ...subjectput,
            
        })
    }


    const handleInputChange = (event) => {
        //console.log(event.target.name,event.target.value);
        const { name, value } = event.target;
        setValue(name, value); 
        setSubjectPut({
            ...subjectput,
            [event.target.name] : event.target.value
        })
        
      };
    


    return(
        <>  <div className="justify-center fixed inset-0 top-2/4 z-10 -translate-y-2/4 -translate-x-2/4 left-2/4 w-80 h-80 border rounded-xl drop-shadow-2xl bg-white">
                <form onSubmit={handleSubmit(putSubject)} >
                    <div className="flex flex-col px-4">
                        <div className="text-center text-2xl font-extrabold my-5">
                            <h1>แก้ไขวิชา</h1>
                        </div>
                        <div className="flex flex-col mt-6 mb-10  ">
                            <label className="after:content-['*'] after:ml-0.5 after:text-red-500 pb-3">วิชา</label>
                            <input 
                            name="subject_name"
                            {...register("subject_name")}
                            value={subjectput.subject_name} 
                            onChange={handleInputChange}
                            placeholder="โปรเจกต์ 1"  
                            className="shadow px-5 w-full h-12 rounded-xl sm:w-auto lg:w-auto " ></input>
                            
                            
                        </div>
                        <div className="my-8 flex flex-row justify-around">
                        <button onClick={() => closesubject(false)} className="h-12 w-24 border border-danger rounded-md text-danger" >ยกเลิก</button>
                        <button type="submit" className="h-12 w-24 border bg-primary rounded-md text-white" >ตกลง</button>
                        </div>
                    </div>
                </form>
            </div>
                
            <div className="fixed top-0 left-0 w-full h-full backdrop-blur-none"></div>
            <div className="fixed top-0 left-0  bg-black w-full h-full opacity-40 backdrop-blur-3xl" onClick={() => closesubject(false)}></div>
        </>
    );
}

export default ModalUpdateSubject;

