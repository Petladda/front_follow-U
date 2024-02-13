"use client"
import Button from "../shared/button"
import Select from "react-select"
import * as React from "react"
import { useForm } from "react-hook-form"
import { useState,useEffect } from "react"
import axios from "axios";
import Swal from 'sweetalert2'
import { useRouter } from "next/navigation";


const FromCreateGroup = (params) => {
    const id = params.sid
    const swal = require('sweetalert2')
    const router = useRouter()
    const client = axios.create({
        baseURL: "http://127.0.0.1:8000"
    });

    const count = [
        {value: 1 ,label: "1"},
        {value: 2 ,label: "2"},
        {value: 3 ,label: "3"},
        {value: 4 ,label: "4"},
        {value: 5 ,label: "5"},

    ]

    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
      } = useForm()
    
    
    const handleCreate = (data) => {
        console.log(data);
        client.post(`/api/subject/${id}/create`,data)
        .then((res)=>{
            if (res.status === 201){
                router.replace(`/subject/${id}/`)
                swal.fire({
                  title: "สร้างโปรเจกต์สำเร็จ!!! ",
                  icon: "success",
                  toast: true,
                  timer: 3000,
                  position: 'top-right',
                  timerProgressBar: true,
                  showConfirmButton: false,
              })
              }
        })
      }

    const handleSelect = (e) => {
        setValue('count',e.value)
        //console.log("handleSelect");
        
    }

//<p className="mb-5 ">ชื่อวิชา</p>
    return (
        <form className="flex flex-col border rounded-xl mt-6 px-8 pb-10 " onSubmit={handleSubmit(handleCreate)}>
            <div className="mb-4 mt-6">
                <p className="text-xl font-extrabold text-center">สร้างโปรเจกต์</p>
            </div>
          
            
           
            <div >
                <p className=" mb-5 ">จำนวนที่ต้องการสร้างโปรเจกต์</p>
                
                <Select
                options={count}
                onChange={handleSelect}
                ></Select>
 
            </div>
            <div className="border-b-2 mt-14 mb-10 border-extar-light-grey "></div>
            
            <Button color="primary" title="สร้างโปรเจกต์"/>
           
        </form>
    );
}

export default FromCreateGroup;