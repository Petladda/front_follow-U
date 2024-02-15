
"use client";

import Button from "../shared/button";
import Select from "react-select"
import React, { useState,useEffect } from 'react';
import { useForm } from "react-hook-form"
import Link from "next/link";
import { useAuth } from "@/app/context/authentication";
import { useRouter } from "next/navigation";


const RegisterUsers = () =>{
   
    const {submitRegister} = useAuth()
    const router = useRouter()
      
    const Groupid = [
        {value: '1',label: "P01"},
        {value: '2',label: "P02"},
        {value: '3',label: "P03"},
        {value: '4',label: "P04"},
        {value: '5',label: "P05"},

    ]

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
      } = useForm()
    
   
    
    const handleSelectGroups = (e) =>{
        setValue('Groupid',e.value)
        console.log("setValue",setValue);
    }
   
    
    return (
        <form className="flex flex-col border rounded-xl p-5 mt-4  "onSubmit={handleSubmit(submitRegister)}>
            <div className="mb-8">
                <p className="text-xl font-extrabold text-center">ลงทะเบียน</p>
            </div>
            <div className="flex flex-col ">
                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 pb-3">ชื่อผู้ใช้</label>
                <input placeholder="ชื่อผู้ใช้"  className="shadow px-5 w-full h-12 rounded-xl sm:w-auto lg:w-auto "{...register("username",{required: "* กรุณากรอกข้อมูล"})} aria-invalid={errors.username? "true":"false"}></input>
                {errors.username && <p  role="alert" className="text-red-500 ">{errors.username?.message}</p>}


                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 pb-3 pt-4">รหัสผ่าน</label>
                <input type="password" placeholder="รหัสผ่าน"  className="shadow px-5 w-full  h-12 rounded-xl sm:w-auto lg:w-auto"{...register("password",{required: "* กรุณากรอกข้อมูล"})} aria-invalid={errors.password? "true":"false"}></input>
                {errors.password && <p  role="alert" className="text-red-500 ">{errors.password?.message}</p>}
                
                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 pt-4 pb-3">รหัสนิสิต</label>
                <input placeholder="รหัสนิสิต"  className="shadow px-5 w-full  h-12 rounded-xl sm:w-auto lg:w-auto " {...register("id_student",{required: "* กรุณากรอกข้อมูล"})} aria-invalid={errors.id_student? "true":"false"}></input>
                {errors.id_student && <p  role="alert" className="text-red-500 ">{errors.id_student?.message}</p>}

                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 pb-3 pt-4">ชื่อจริง</label>
                <input placeholder="ชื่อจริง"  className="shadow px-5 w-full  h-12 rounded-xl sm:w-auto lg:w-auto "  {...register("first_name",{required: "* กรุณากรอกข้อมูล"})} aria-invalid={errors.first_name? "true":"false"}></input>
                {errors.first_name && <p  role="alert" className="text-red-500 ">{errors.first_name?.message}</p>}

                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 pb-3 pt-4">นามสกุล</label>
                <input placeholder="นามสกุล" className="px-5 shadow w-full  h-12 rounded-xl sm:w-auto lg:w-auto"{...register("last_name",{required: "* กรุณากรอกข้อมูล"})} aria-invalid={errors.last_name? "true":"false"}></input>
                {errors.last_name && <p  role="alert" className="text-red-500 ">{errors.last_name?.message}</p>}

                
            </div>
            <div className="mt-3">
              <span>มีบัญชีแล้ว ?</span><a onClick={()=>router.push('login_users')} className="ml-3 text-success underline underline-offset-2">เข้าสู่ระบบ</a>  
            </div>
            <div className="border-b-2 mt-7 mb-10 border-extar-light-grey "></div>
           
            <Button  color="primary" title="ลงทะเบียน"/>
            <div className="font-medium text-center mt-4 ">
                <p className="mb-2  text-mid-grey">การสร้างบัญชีหรือการเข้าใช้งาน หมายถึงคุณได้อ่านและยอมรับ</p>
                <p>เงื่อนไขข้อกำหนด <span className="text-mid-grey">และ</span> นโยบายความเป็นส่วนตัว</p>
            </div>
           

        </form>
        
    )
}

export default RegisterUsers;

/*<div >
                <p className="after:content-['*'] after:ml-0.5 after:text-red-500 mb-3 mt-4">รหัสกลุ่ม</p>
                <Select 
                
                options={Groupid}
                {...register("Groupid",{required: "* กรุณากรอกข้อมูล"})} aria-invalid={errors.Groupid? "true":"false"}
                onChange={handleSelectGroups}
                ></Select>
                {errors.Groupid && <p  role="alert" className="text-red-500 ">{errors.Groupid?.message}</p>}
            </div>
             <div className="pt-4 pb-3">
                <input type="checkbox" className="border w-4 h-4 accent-black  " {...register("checkbox",{required: "* กรุณากรอกข้อมูล"})} aria-invalid={errors.checkbox? "true":"false"}></input>
                <label className="ml-2 after:content-['*'] after:ml-0.5 after:text-red-500">ฉันได้อ่านและยอมรับเงื่อนไขการเป็นสมาชิกและนโยบายความเป็นส่วนตัว</label>
                {errors.checkbox && <p  role="alert" className="text-red-500 ">{errors.checkbox?.message}</p>}
            </div>
            */ 