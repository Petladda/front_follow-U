"use client";

import Button from "../shared/button";
import * as React from "react"
import { useForm } from "react-hook-form"
import axios from "axios";
import { useAuth } from "@/app/context/authentication";


const LoginUsers= () =>{

  const {register,handleSubmit,setError,formState: { errors },} = useForm()

  const {submitlogin,currentUser} = useAuth()
    
  

    return (
        <form className="flex flex-col border rounded-xl p-5 mt-14 " onSubmit={handleSubmit(submitlogin)}>
            <div className="mb-8">
                <p className="text-xl font-extrabold text-center">เข้าสู่ระบบ</p>
            </div>
            <div className="flex flex-col pb-6 ">
                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 pb-3">ชื่อผู้ใช้</label>
                <input placeholder="ชื่อผู้ใช้"  className="shadow px-5 w-full  h-12 rounded-xl sm:w-auto lg:w-auto "{...register("username",{required: "* กรุณากรอกข้อมูล"})} aria-invalid={errors.username? "true":"false"}></input>
                {errors.username && <p  role="alert" className="text-red-500 ">{errors.username?.message}</p>}


                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 pb-3 pt-4">รหัสผ่าน</label>
                <input type="password" placeholder="รหัสผ่าน"  className="shadow px-5 w-full  h-12 rounded-xl sm:w-auto lg:w-auto"{...register("password",{required: "* กรุณากรอกข้อมูล"})} aria-invalid={errors.password? "true":"false"}></input>
                {errors.password && <p  role="alert" className="text-red-500 ">{errors.password?.message}</p>}

            </div>
            <div className="">
              <span>ยังไม่มีบัญชี ?</span><a href="register_users" className="ml-3 text-success underline underline-offset-2">ลงทะเบียน</a>  
            </div>
            <div className="border-b-2 my-8 border-extar-light-grey  "></div>
            
           
            <Button  color="primary" title="เข้าสู่ระบบ"/>
            
      
            <div className="font-medium text-center mt-4 ">
                <p className="mb-2  text-mid-grey">การสร้างบัญชีหรือการเข้าใช้งาน หมายถึงคุณได้อ่านและยอมรับ</p>
                <p>เงื่อนไขข้อกำหนด <span className="text-mid-grey">และ</span> นโยบายความเป็นส่วนตัว</p>
            </div>
        </form>
    )
}

export default LoginUsers;
