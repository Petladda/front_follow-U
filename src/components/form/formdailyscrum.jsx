"use client"
import React from "react";
import { useForm } from "react-hook-form"
import Select from "react-select"
import axios from "axios";
import { useAuth } from "@/app/context/authentication";

const FormDailyScrum = () =>{
    const url = "http://127.0.0.1:8000"

    const {currentUser} = useAuth()
    
    const note = [
        {value: 'work',label: "วันนี้ทำงาน"},
        {value: 'sick',label: "ป่วย"},
        {value: 'busy',label: "ติดธุระ"},
        {value: 'pass',label: "ตกลงกันว่าวันนี้ไม่ทำงาน"},
    ]

    async function getScrumDaily() {
        try {
          const response = await axios.get();
          //console.log(response);
        } catch (error) {
          console.error(error);
        }
      }
      getScrumDaily()

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        clearErrors,
        getValues,
        formState: { errors },
      } = useForm()

    const onSubmit = async(data) => {
        console.log(data)
        try {
            const response = await axios.post();
            console.log(response);
          } catch (error) {
            console.error(error);
          }
        }
      
    
    const handleSelectNote = (e) =>{
        setValue('note',e.value)
        clearErrors("note")
        
    }

    

    const get_currentUser_fullname = () => {
      return `${currentUser?.first_name ?? "first_name"} ${currentUser?.last_name ?? "last_name"}`
    }



    
    return (
        <form className="mt-5 mb-96 h-screen rounded-xl p-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <p className="text-dark-grey font-extrabold">Daily Scrum</p>
            </div>
            <div>
              <div className="flex flex-col   ">
                
                <label className="  pb-3 pt-4">ชื่อ - สกุล</label>
                <input value={get_currentUser_fullname()} placeholder="ชื่อ"  className="shadow px-5 w-auto h-12 rounded-xl sm:w-auto lg:w-auto "  ></input>
               
                <label className="  pb-3 pt-4">รหัสนิสิต</label>
                <input value={currentUser?.id_student} placeholder="รหัสนิสิต" className="px-5 shadow w-auto h-12 rounded-xl  sm:w-auto lg:w-auto"></input>

                <label className="  pb-3 pt-4">ชื่อวิชา</label>
                <input placeholder="ชื่อวิชา" className="px-5 shadow w-auto h-12 rounded-xl  sm:w-auto lg:w-auto"></input>

                <label className="  pb-3 pt-4">รหัสโปรเจกต์</label>
                <input placeholder="รหัสโปรเจกต์" className="px-5 shadow w-auto h-12 rounded-xl  sm:w-auto lg:w-auto"></input>

                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 pb-3 pt-4">วันที่</label>
                <input placeholder="วันที่" type="date" className="px-5 shadow w-auto h-12 rounded-xl sm:w-auto lg:w-auto"{...register("date",{required: "* กรุณากรอกข้อมูล"})} aria-invalid={errors.date? "true":"false"}></input>
                {errors.date && <p  role="alert" className="text-red-500 ">{errors.date?.message}</p>}

                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 pb-3 pt-4">เมื่อวานทำอะไร</label>
                <input placeholder="เมื่อวานทำอะไร" className="px-5 shadow w-auto h-12 rounded-xl sm:w-auto lg:w-auto"{...register("yesterday",{required: "* กรุณากรอกข้อมูล"})} aria-invalid={errors.yesterday? "true":"false"}yesterday></input>
                {errors.yesterday && <p  role="alert" className="text-red-500 ">{errors.yesterday?.message}</p>}

                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 pb-3 pt-4">วันนี้จะทำอะไร</label>
                <input placeholder="วันนี้จะทำอะไร" className="px-5 shadow w-auto h-12 rounded-xl sm:w-auto lg:w-auto"{...register("today",{required: "* กรุณากรอกข้อมูล"})} aria-invalid={errors.today? "true":"false"}></input>
                {errors.today && <p  role="alert" className="text-red-500 ">{errors.today?.message}</p>}

                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 pb-3 pt-4">ติดปัญหาตรงไหน</label>
                <input placeholder="ติดปัญหาตรงไหน" className="px-5 shadow w-auto h-12 rounded-xl sm:w-auto lg:w-auto"{...register("problem",{required: "* กรุณากรอกข้อมูล"})} aria-invalid={errors.problem? "true":"false"}></input>
                {errors.problem && <p  role="alert" className="text-red-500 ">{errors.problem?.message}</p>}
            </div>
            <div className="mb-4">
                <p className="after:content-['*'] after:ml-0.5 after:text-red-500 mb-3 mt-4">หมายเหตุ</p>
                <Select
        
                    options={note}
                    {...register("note",{required: "* กรุณากรอกข้อมูล"})} aria-invalid={errors.note? "true":"false"}
                    onChange={handleSelectNote}
                    checked={getValues()}
                    ></Select>
                    {errors.note && <p  role="alert" className="text-red-500 ">{errors.note?.message}</p>}
                
            </div>
            <div className="flex flex-col mb-5">
                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 pb-3 pt-4">อื่น ๆ</label>
                <input placeholder="อื่น ๆ" className="px-5 shadow w-auto h-12 rounded-xl sm:w-auto lg:w-auto"{...register("others",{required: "* กรุณากรอกข้อมูล"})} aria-invalid={errors.others? "true":"false"}></input>
                {errors.others && <p  role="alert" className="text-red-500 ">{errors.others?.message}</p>}
            </div>
            <div className="flex flex-row justify-between ">
                <button className="w-44 h-12 border rounded-xl border-danger hover:bg-danger hover:text-white text-danger text-center  ml-5 sm:ml-24 md:mr-9 ">ยกเลิก</button>
                <button  className="w-44 h-12 border rounded-xl ml-5 mr-5 sm:mr-24 bg-primary hover:bg-secondary text-center text-white">ตกลง</button>
            </div>
            </div>
            
        </form>
        )
}

export default FormDailyScrum;