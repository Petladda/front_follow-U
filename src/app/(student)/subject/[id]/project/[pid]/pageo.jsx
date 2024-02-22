
"use client"
import ModalBacklog from "@/components/modal/modalbacklog";
import { useForm } from "react-hook-form"
import { useState,useEffect } from "react"
import axios from "axios";
import Swal from 'sweetalert2'
import { useRouter } from "next/navigation";

export default function({params}){

 
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm()

  const [openModalBacklog, setModalBacklog] = useState(false);
  
  //const id = params.pid
  const swal = require('sweetalert2')
  const router = useRouter()
  const client = axios.create({
      baseURL: "http://127.0.0.1:8000"
  });
  const [projectdetail, setProjectDetail] = useState([])
  const [productbacklog_set, setProductBacklog_Set] = useState([])
  const [members , setMembers] = useState([])

  const loadProjectDetail = () =>{
    client.get(`/api/subject/${params.id}/project/${params.pid}/`)
    .then((res)=>{
      setProjectDetail(res.data)
      setProductBacklog_Set(res.data.productbacklog_set)
      setMembers(res.data.members)
  })
  }
 
  useEffect(() => {
    loadProjectDetail()
  }, []);

  const handleCreatebacklog = (e) =>{
    console.log("data",e);
    client.post(`/api/subject/${params.id}/project/${params.pid}/productbacklog-create/`,e)
    .then((res)=>{
      //console.log("respone backlig = ",res);
      if (res.status === 201) {
        router.replace(`/subject/${params.id}/project/${params.pid}/`)
        swal.fire({
          title: "สร้าง Product Backlog สำเร็จ!!! ",
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
      <main className="h-screen px-6" >
       <div className="">
          <p className="text-xl font-extrabold text-center">รหัสโปรเจกต์ : {params.pid} </p>
          {members.map((e,index)=>{
            return (
              <div key={index} className="flex flex-row justify-between">

                <p className="pt-2">{index+1}. {e.id_student} {e.first_name} {e.last_name}</p> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 mt-3 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </div>
            )
          })}
          
          
          
        </div>
        <div className="border-b-2 my-6 border-extar-light-grey "></div>
        <form>
          
          <div className="flex justify-between">
            <p className="pt-2 w-32">ชื่อโปรเจกต์ : </p>
            <input value={projectdetail.project_name} placeholder="ชื่อโปรเจกต์" className="shadow px-5 w-full h-8 rounded-xl lg:w-11/12  border-gray-700 ml-2" ></input>
          </div>
          <div className="flex justify-between">
            <p className="pt-2 w-20">Trello : </p>
            <input value={projectdetail.trello_link} placeholder="Trello link" className="shadow px-5 w-full h-8 rounded-xl lg:w-11/12  border-gray-700 ml-2 mt-2" ></input>
          </div>
          <div className="flex justify-between">
            <p className="pt-2 w-20">Figma : </p>
            <input value={projectdetail.figma_link} placeholder="Figma link" className="shadow px-5 w-full h-8 rounded-xl lg:w-11/12  border-gray-700 ml-2 mt-2" ></input>
          </div>
        </form>
        
        <p className="pt-2">Stand up Meeting :
          <a href="register_users" className="ml-3 underline underline-offset-2">View</a> 
        </p>
        <form onSubmit={handleSubmit(handleCreatebacklog)}>
            <p className="pt-2">Product backlogs : 
            <input placeholder="จำนวน" type="number" {...register("count", {
                valueAsNumber: true,
                pattern:{
                  value: /^(0|[1-9]\d*)(\.\d+)?$/
                },})}  className="shadow px-4 w-24 h-8 rounded-xl lg:w-11/12  border-gray-700 mx-4 mt-2 " ></input>
            <button type="submit" className="h-8 w-12   bg-primary rounded-lg text-white ">เพิ่ม</button>
            </p>
        </form>

        <div className="grid grid-cols-3 grid-flow-col gap-8 pt-6">
          {productbacklog_set.map((e,index)=>{
            return(
                
              <div key={index}  className="cursor-pointer" onClick={() => {setModalBacklog(true);}}>
                  <div className="w-full h-full border rounded-3xl  border-gray-600 text-center">
                    <p className="my-12">{index+1}</p>
                  </div>
                   
              </div>
                  
              
            )
          })}
        </div>
        {openModalBacklog && <ModalBacklog bid={productbacklog_set} closebacklog={setModalBacklog} />}
      </main>
    )
}