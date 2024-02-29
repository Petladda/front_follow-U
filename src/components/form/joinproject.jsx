"use client"
import Button from "../shared/button"
import Select from "react-select"
import * as React from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/context/authentication"
import { useState } from "react"
import { useEffect } from "react"
import Swal from 'sweetalert2'


const JoinProject = () => {
    const swal = require('sweetalert2')
    const router = useRouter()
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
      } = useForm()


      const {client} = useAuth()
      const [subjects , setSubjects] = useState([])
      const [projects, setProjects] = useState([])
      
  
      useEffect(()=>{
          client.get('/api/subject/').then(r=>{
              let subjectResponse = r.data
              setSubjects(subjectResponse)
          })
      },[])
  
    
    
    const onSubmit = (data) => {
        
        client.post(`/api/subject/${data.subject}/project/${data.project}/join`,data.project
        ).then(r=>{
            if (r.status === 201) {
                router.replace(`/student/yourproject/`)
                swal.fire({
                    title: "เข้าร่วมโปรเจกต์สำเร็จ!!! ",
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

      const handleSubject  = (e) => {
        let subjectId = e.target.value
        client.get(`/api/subject/${subjectId}/`).then(r=>{
            let subjectResponse = r.data
            setProjects(subjectResponse.project_set)
        })
      }

   

    return (
        <form className="flex flex-col border rounded-xl  px-8 pb-10 " onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 mt-3">
                <p className="text-xl font-extrabold text-center text-dark-grey">เข้าร่วมโปรเจกต์</p>
            </div>
            <div className="flex flex-col mt-6 mb-12  ">
                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 pb-3">วิชา</label>

                <select className="shadow px-5 mb-6 w-full h-12 rounded-xl sm:w-auto lg:w-auto " name="subject" {...register("subject", { onChange:handleSubject})}>
                    {subjects.map(s => <option key={s.id} value={s.id} >{s.subject_name}</option>)}
                </select>

                {/* <input placeholder="วิชา"  className="shadow px-5 mb-6 w-full h-12 rounded-xl sm:w-auto lg:w-auto " {...register("subject",{required: "* กรุณากรอกข้อมูล"})} aria-invalid={errors.subject? "true":"false"}></input> */}
                
                
                
                {errors.subject && <p  role="alert" className="text-red-500 ">{errors.subject?.message}</p>}
                
                
                <label className="after:content-['*'] after:ml-0.5  after:text-red-500 pb-3">รหัสโปรเจกต์</label>

                <select  name="project" {...register("project")} className="shadow px-5 mb-6 w-full h-12 rounded-xl sm:w-auto lg:w-auto ">
                    {projects.length > 0  && projects.map(p => <option  key={p.id} value={p.id} >{p.id}</option>)}
                    {projects.length == 0 && <option>ไม่มีข้อมูล</option>}
                </select>
                
                
                
                
                {errors.id_project && <p  role="alert" className="text-red-500 ">{errors.id_project?.message}</p>}
                
           
            </div>
            
            <div className="border-b-2 mt-14 mb-10 border-extar-light-grey "></div>
            
            <Button color="primary" type="submit" title="เข้าร่วมโปรเจกต์"/>
           
        </form>
    );
}

export default JoinProject;