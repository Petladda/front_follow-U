
"use client"


import * as React from "react"
import { useForm } from "react-hook-form"
import axios from "axios";
import { useAuth } from "@/app/context/authentication";
import Button from "@/components/shared/button";

const ChangePasswordPage = () => {

  const {register,handleSubmit,setError,formState: { errors },} = useForm()

  const {submitlogin,currentUser} = useAuth()
    
  const onSubmit = (data) => {
    console.log(data)
  }
    
 
  return (
    <form className="flex flex-col  rounded-xl  p-5 mt-14 h-screen" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-8">
            <p className="text-xl font-extrabold text-center">เปลี่ยนรหัสผ่าน</p>
        </div>
        <div className="flex flex-col pb-60">
            
            <label className="after:content-['*'] after:ml-0.5 after:text-red-500 pb-3">รหัสผ่านเดิม</label>
            <input placeholder="รหัสผ่านเดิม"  className="shadow px-5 w-full h-12 rounded-xl sm:w-auto lg:w-auto mb-6"{...register("oldpassword",{required: "* กรุณากรอกข้อมูล"})} aria-invalid={errors.oldpassword? "true":"false"}></input>
            {errors.oldpassword && <p  role="alert" className="text-red-500 ">{errors.oldpassword?.message}</p>}

            <label className="after:content-['*'] after:ml-0.5 after:text-red-500 pb-3">รหัสผ่านใหม่</label>
            <input type="password"  placeholder="รหัสผ่านใหม่"  className="shadow px-5 w-full h-12 rounded-xl sm:w-auto lg:w-auto mb-6"{...register("newpassword",{required: "* กรุณากรอกข้อมูล"})} aria-invalid={errors.newpassword? "true":"false"}></input>
            {errors.newpassword && <p  role="alert" className="text-red-500 ">{errors.newpassword?.message}</p>}

            <label className="after:content-['*'] after:ml-0.5 after:text-red-500 pb-3 pt-3">ยืนยันรหัสผ่านใหม่</label>
            <input type="password" placeholder="ยืนยันรหัสผ่านใหม่"  className="shadow px-5 w-full h-12 rounded-xl sm:w-auto lg:w-auto mb-6"{...register("confirmpassword",{required: "* กรุณากรอกข้อมูล"})} aria-invalid={errors.confirmpassword? "true":"false"}></input>
            {errors.confirmpassword && <p  role="alert" className="text-red-500 ">{errors.confirmpassword?.message}</p>}

        </div>
        <Button  color="primary" onClick={onSubmit} title="ยืนยันการเปลี่ยนรหัสผ่าน"/>
        
        
    </form>
)
  }
  
  export default ChangePasswordPage;