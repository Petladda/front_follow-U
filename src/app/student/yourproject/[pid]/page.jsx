
"use client"
import ModalBacklog from "@/components/modal/modalbacklog";
import { useForm } from "react-hook-form"
import { useState,useEffect } from "react"
import axios from "axios";
import Swal from 'sweetalert2'
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/authentication";
import { DataSubject } from "@/app/context/useDatasubject";
import _ from "lodash";

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
  const {client} = useAuth()
  const {subject,subjectID} = DataSubject()
  const [projectdetail, setProjectDetail] = useState([])
  const [productbacklog_set, setProductBacklog_Set] = useState([])
  const [members , setMembers] = useState([])
  const [selectbacklog,setSelectBackLog] = useState()
 

  const loadProjectDetail = () => {
     // Check subjectID, client, and params.pid 
      if (subjectID.length > 0 && client && params.pid) {
        client.get(`/api/subject/${subjectID[0]}/project/${params.pid}/`)
          .then((res) => {
            setProjectDetail(res.data);
            setProductBacklog_Set(res.data.productbacklog_set);
            setMembers(res.data.members);
          })
          .catch((error) => {
            console.error('Error loading project detail:', error);
          });
      }
    };
   

  useEffect(() => {

    loadProjectDetail()
    
  }, [subjectID, client, params.pid]);


  const handleCreatebacklog = (e) =>{

    client.post(`/api/subject/${subjectID[0]}/project/${params.pid}/productbacklog-create/`,e)
    .then((res)=>{
      //console.log("respone backlig = ",res);
      if (res.status === 201) {
        router.replace(`/student/yourproject/${params.pid}`)
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

  

  const handleSelectModal = (item)=>{
  //console.log("elememt",item);
  setModalBacklog(true)
  setSelectBackLog(item)
  
  }



 

  const putProject = async (e) => {
    
    let {data} = await client.put(`/api/subject/${subjectID[0]}/project-update/${params.pid}/`,{
      [e.target.name] : e.target.value
    })
    
    setProjectDetail({
      ...projectdetail,
      [e.target.name] : data[e.target.name]
    })
  }

  let debounced  = _.debounce((e) => putProject(e),300,{ 'maxWait': 500 })


  const updateValue = async (e)=>{
    
    debounced(e)
    setProjectDetail({
      ...projectdetail,
      [e.target.name] : e.target.value
    })

    
  }

  return (
    <main className="px-6 min-h-screen" >
      <div className="">
        <p className="text-xl font-extrabold text-center">รหัสโปรเจกต์ : {params.pid} </p>
        <p className="font-extrabold ">ชื่อสมาชิก</p>
        {members.map((e,index)=>{
          return (
            <div key={index} className="flex flex-row justify-between">

              <p className="pt-2">{index+1}. {e.id_student} {e.first_name} {e.last_name}</p> 
              
          </div>
          )
        })
        
      }
        
      </div>
      <div className="border-b-2 my-6 border-extar-light-grey "></div>
      <form >
        
        <div className="flex justify-between">
          <p className="pt-2 w-32">ชื่อโปรเจกต์ : </p>
          <input 
            name="project_name" onInput={updateValue} value={projectdetail.project_name}
            placeholder="ชื่อโปรเจกต์" className="shadow px-5 w-full h-8 rounded-xl lg:w-11/12  border-gray-700 ml-2" ></input>
        </div>
        <div className="flex justify-between">
          <p className="pt-2 w-20">Trello : </p>
          <input  
            name="trello_link" onInput={updateValue} value={projectdetail.trello_link}
            placeholder="Trello link" className="shadow px-5 w-full h-8 rounded-xl lg:w-11/12  border-gray-700 ml-2 mt-2" ></input>
        </div>
        <div className="flex justify-between">
          <p className="pt-2 w-20">Figma : </p>
          <input 
            name="figma_link" onInput={updateValue} value={projectdetail.figma_link}
            placeholder="Figma link" className="shadow px-5 w-full h-8 rounded-xl lg:w-11/12  border-gray-700 ml-2 mt-2" ></input>
        </div>
      </form>
      
      <p className="pt-2">Stand up Meeting :
        <a onClick={()=>router.replace(`/student/yourproject/${params.pid}/standupmeeting`)} className="ml-3 underline cursor-pointer underline-offset-2">View</a> 
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
      <div>
        (
        <span className="text-success ml-1 mr-1">Done</span>/
        <span className="text-danger mr-1">Todo,Doing</span>)
      </div>

      <div className="grid grid-cols-3  gap-8 pt-6 pb-10">
        
        {productbacklog_set.map((item,index)=>{
          return(
            <div key={index} >
              {item.status === "done" ? ( 
                <div  className="cursor-pointer" onClick={() => handleSelectModal(item)}>
                  <div className="w-full h-full border rounded-3xl  border-success  text-center ">
                    <p className="my-12"> {item.title_product}</p>
                  </div>
                    
                </div>
                ) : (
                  <div  className="cursor-pointer" onClick={() => handleSelectModal(item)}>
                    <div className="w-full h-full border rounded-3xl border-danger text-center ">
                      <p className="my-12"> {item.title_product}</p>
                    </div>
                  </div>
                )} 
            </div> 
            
                
            
          )
        })}

        </div>
        {openModalBacklog && <ModalBacklog sid={subjectID[0]}  bid={selectbacklog} pid={params.pid}  closebacklog={setModalBacklog} />}

    </main>
  )
}
