
"use client"


import * as React from "react"
import { useForm } from "react-hook-form"
import axios from "axios";
import { useAuth } from "@/app/context/authentication";
import Button from "@/components/shared/button";
import { useRouter } from "next/navigation";

const ChangePasswordPage = () => {

  const {register,handleSubmit,setError,formState: { errors },} = useForm()
  const router = useRouter()
  const {client,currentUser} = useAuth()
    
  const onSubmit = (data) => {
    console.log(data)
    client.post(`/api/user/change_password`,data)
    .then((res)=>{
      console.log(res);
      if (res.status === 200) {
        router.replace(`/teacher/profile_teacher`)
        swal.fire({
          title: "เปลี่ยนรหัสผ่านสำเร็จ!!! ",
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
    
 
  return (
    <form className="flex flex-col  rounded-xl  p-5 mt-14 h-screen" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-8">
            <p className="text-xl font-extrabold text-center">เปลี่ยนรหัสผ่าน</p>
        </div>
        <div className="flex flex-col pb-60">
            
            <label className="after:content-['*'] after:ml-0.5 after:text-red-500 pb-3">รหัสผ่านเดิม</label>
            <input placeholder="รหัสผ่านเดิม"  className="shadow px-5 w-full h-12 rounded-xl sm:w-auto lg:w-auto mb-6"{...register("old_password",{required: "* กรุณากรอกข้อมูล"})} aria-invalid={errors.old_password? "true":"false"}></input>
            {errors.old_password && <p  role="alert" className="text-red-500 ">{errors.old_password?.message}</p>}

            <label className="after:content-['*'] after:ml-0.5 after:text-red-500 pb-3">รหัสผ่านใหม่</label>
            <input type="password"  placeholder="รหัสผ่านใหม่"  className="shadow px-5 w-full h-12 rounded-xl sm:w-auto lg:w-auto mb-6"{...register("new_password",{required: "* กรุณากรอกข้อมูล"})} aria-invalid={errors.new_password? "true":"false"}></input>
            {errors.new_password && <p  role="alert" className="text-red-500 ">{errors.new_password?.message}</p>}

            <label className="after:content-['*'] after:ml-0.5 after:text-red-500 pb-3 pt-3">ยืนยันรหัสผ่านใหม่</label>
            <input type="password" placeholder="ยืนยันรหัสผ่านใหม่"  className="shadow px-5 w-full h-12 rounded-xl sm:w-auto lg:w-auto mb-6"{...register("confirm_password",{required: "* กรุณากรอกข้อมูล"})} aria-invalid={errors.confirm_password? "true":"false"}></input>
            {errors.confirm_password && <p  role="alert" className="text-red-500 ">{errors.confirm_password?.message}</p>}

        </div>
        <Button  color="primary"  title="ยืนยันการเปลี่ยนรหัสผ่าน"/>
        
        
    </form>
)
  }
  
  export default ChangePasswordPage;