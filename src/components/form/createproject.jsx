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
    const id = params.cid
    
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
        {value: 6 ,label: "6"},
        {value: 7 ,label: "7"},
        {value: 8 ,label: "8"},
        {value: 9 ,label: "9"},
        {value: 10 ,label: "10"},
        {value: 11 ,label: "11"},
        {value: 12 ,label: "12"},
        {value: 13 ,label: "13"},
        {value: 14 ,label: "14"},
        {value: 15 ,label: "15"},
        {value: 16 ,label: "16"},
        {value: 17 ,label: "17"},
        {value: 18 ,label: "18"},
        {value: 19 ,label: "19"},
        {value: 20 ,label: "20"},
        {value: 21 ,label: "21"},
        {value: 22 ,label: "22"},
        {value: 23 ,label: "23"},
        {value: 24 ,label: "24"},
        {value: 25 ,label: "25"},
        {value: 26 ,label: "26"},
        {value: 27 ,label: "27"},
        {value: 28 ,label: "28"},
        {value: 29 ,label: "29"},
        {value: 30 ,label: "30"},

    ]

    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
      } = useForm()
    
    
    const handleCreate = (data) => {
        
        client.post(`/api/subject/${id.sid}/create`,data)
        
        .then((res)=>{
            if (res.status === 201){
                router.replace(`/teacher/subject/${id.sid}`)
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
        <form className="flex flex-col border rounded-xl mt-20 px-8 pb-10 " onSubmit={handleSubmit(handleCreate)}>
            <div className="mb-4 mt-6">
                <p className="text-xl font-extrabold text-center">สร้างโปรเจกต์</p>
            </div>
          
            
           
            <div className="mb-20">
                <p className=" mb-5 ">จำนวนที่ต้องการสร้างโปรเจกต์</p>
                
                <Select
                options={count}
                placeholder="เลือกจำนวนที่ต้องการ..."
                onChange={handleSelect}
                ></Select>
 
            </div>
            
            <Button color="primary" title="สร้างโปรเจกต์"/>
           
        </form>
    );
}

export default FromCreateGroup;