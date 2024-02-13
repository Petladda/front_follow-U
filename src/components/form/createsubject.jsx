import Button from "../shared/button"
import Select from "react-select"
import * as React from "react"
import { useForm } from "react-hook-form"



const FromCreateSubject = () => {

    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
      } = useForm()
    
    
    const handleCreatesubject = (data) => {
        console.log(data)
      }

    const handleSelect = (e) => {
        setValue('Quantitygroup',e.value)
        console.log("handleSelect");
        
    }

    return (
        <form className="flex flex-col border rounded-xl  px-8 pb-10 " onSubmit={handleSubmit(handleCreatesubject)}>
            <div className="mb-4 mt-6">
                <p className="text-xl font-extrabold text-center">สร้างวิชา</p>
            </div>
            <div className="flex flex-col mt-6 mb-10  ">
                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 pb-3">วิชา</label>
                <input placeholder="โปรเจกต์ 1"  className="shadow px-5 w-full h-12 rounded-xl sm:w-auto lg:w-auto " {...register("subject_name",{required: "* กรุณากรอกข้อมูล"})} aria-invalid={errors.subject_name? "true":"false"}></input>
                {errors.subject_name && <p  role="alert" className="text-red-500 ">{errors.subject_name?.message}</p>}
                
            </div>
            
            <div className="border-b-2 mt-14 mb-8 border-extar-light-grey "></div>
            
            <Button color="primary" title="สร้างวิชา"/>
           
        </form>
    );
}

export default FromCreateSubject;