"use client"
import React from "react";
import { useForm } from "react-hook-form"
import Select from "react-select"
import axios from "axios";
import { useAuth } from "@/app/context/authentication";
import { DataSubject } from "@/app/context/useDatasubject";
import { useState } from "react"
import { useRouter } from "next/navigation";

const FormStandupMeeting = () =>{

    const {currentUser,client} = useAuth()
    const {subject} = DataSubject()
    const [projects, setProjects] = useState([])
    const swal = require('sweetalert2')
    const router = useRouter()

    const note = [
        {value: 'วันนี้ทำงาน',label: "วันนี้ทำงาน"},
        {value: 'ป่วย',label: "ป่วย"},
        {value: 'ติดธุระ',label: "ติดธุระ"},
        {value: 'ตกลงกันว่าวันนี้ไม่ทำงาน',label: "ตกลงกันว่าวันนี้ไม่ทำงาน"},
    ]

    

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        clearErrors,
        getValues,
        formState: { errors },
      } = useForm()

    const onSubmit = (data) => {
        console.log(data)
        client.post(`/api/subject/${data.subject}/project/${data.project}/stand_up_meeting-create`,
            data
        ).then((res)=>{
            console.log(res)
            if (res.status === 201) {
                reset();
                swal.fire({
                    title: "บันทึก Stand up Meeting สำเร็จ!!! ",
                    icon: "success",
                    toast: true,
                    timer: 2000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                })
            }
        })
    }
      
    
    const handleSelectNote = (e) =>{
        setValue('note',e.value)
        clearErrors("note")
        
    }

    

    const get_currentUser_fullname = () => {
      return `${currentUser?.first_name ?? "first_name"} ${currentUser?.last_name ?? "last_name"}`
    }

    const handleSubject  = (e) => {
        let subjectId = e.target.value
        client.get(`/api/subject/${subjectId}/`).then(r=>{
            let subjectResponse = r.data
            setProjects(subjectResponse.project_set)
        })
      }

    
    return (
        <form className="mt-5 rounded-xl p-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <p className="text-dark-grey font-extrabold">Stand up Meeting </p>
            </div>
            <div>
              <div className="flex flex-col   ">
                
                <label className="  pb-3 pt-4">ชื่อ - สกุล</label>
                <input value={get_currentUser_fullname()} disabled className="shadow px-5 w-auto h-12 rounded-xl sm:w-auto lg:w-auto "  ></input>
               
                <label className="  pb-3 pt-4">รหัสนิสิต</label>
                <input value={currentUser?.id_student} disabled className="px-5 shadow w-auto h-12 rounded-xl  sm:w-auto lg:w-auto"></input>

                <label className="  pb-3 pt-4">ชื่อวิชา</label>
                <select className="shadow px-5 mb-6 w-full h-12 rounded-xl sm:w-auto lg:w-auto " name="subject" {...register("subject", { onChange:handleSubject})}>
                    {subject.map(s => <option key={s.id} value={s.id} >{s.subject_name}</option>)}
                </select>
                

                <label className="  pb-3 pt-4">รหัสโปรเจกต์</label>
                <select  name="project" {...register("project")} className="shadow px-5 mb-6 w-full h-12 rounded-xl sm:w-auto lg:w-auto ">
                    {projects.length > 0  && projects.map(p => <option  key={p.id} value={p.id} >{p.id}</option>)}
                    {projects.length == 0 && <option>ไม่มีข้อมูล</option>}
                </select>
                

                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 pb-3 pt-4">วันที่</label>
                <input placeholder="วันที่" type="date" className="px-5 shadow w-auto h-12 rounded-xl sm:w-auto lg:w-auto"{...register("date",{required: "* กรุณากรอกข้อมูล"})} aria-invalid={errors.date? "true":"false"}></input>
                {errors.date && <p  role="alert" className="text-red-500 ">{errors.date?.message}</p>}

                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 pb-3 pt-4">เมื่อวานทำอะไร</label>
                <input placeholder="เมื่อวานทำอะไร" className="px-5 shadow w-auto h-12 rounded-xl sm:w-auto lg:w-auto"{...register("yesterday",{required: "* กรุณากรอกข้อมูล"})} aria-invalid={errors.yesterday?"true":"false"}></input>
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
                    placeholder='ระบุหมายเหตุ...'
                    options={note}
                    {...register("note",{required: "* กรุณากรอกข้อมูล"})} aria-invalid={errors.note? "true":"false"}
                    onChange={handleSelectNote}
                    checked={getValues()}
                    ></Select>
                    {errors.note && <p  role="alert" className="text-red-500 ">{errors.note?.message}</p>}
                
            </div>
            <div className="flex flex-col mb-5">
                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 pb-3 pt-4">อื่น ๆ</label>
                <input placeholder="อื่น ๆ" className="px-5  shadow w-auto h-28 rounded-xl sm:w-auto lg:w-auto"{...register("others",{required: "* กรุณากรอกข้อมูล"})} aria-invalid={errors.others? "true":"false"}></input>
                {errors.others && <p  role="alert" className="text-red-500 ">{errors.others?.message}</p>}
            </div>
            <div className="flex flex-row justify-between ">
                <button onClick={()=>router.replace(`/student/yourproject`)} className="w-44 h-12 border rounded-xl border-danger hover:bg-danger hover:text-white text-danger text-center  ml-5 sm:ml-24 md:mr-9 ">ยกเลิก</button>
                <button  className="w-44 h-12 border rounded-xl ml-5 mr-5 sm:mr-24 bg-primary hover:bg-secondary text-center text-white">ตกลง</button>
            </div>
            </div>
            
        </form>
        )
}

export default FormStandupMeeting;

/*<select className="shadow px-5 mb-6 w-full h-12 rounded-xl sm:w-auto lg:w-auto " name="note" {...register("note")}>
                    {note.map(n => <option key={n.id} value={n.value} >{n.label}</option>)}
                </select> */