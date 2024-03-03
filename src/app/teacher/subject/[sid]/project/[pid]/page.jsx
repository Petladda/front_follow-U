
"use client"

import { useForm } from "react-hook-form"
import { useState,useEffect } from "react"
import axios from "axios";
import Swal from 'sweetalert2'
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/authentication";
import { DataSubject } from "@/app/context/useDatasubject";
import ModalDetailBacklog from "@/components/modal/modaldetailbacklog";

export default function({params}){
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

  
   

  useEffect(() => {
     // Check subjectID, client, and params.pid 
    const loadProjectDetail = () => {
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

    loadProjectDetail();
  }, [subjectID, client, params.pid]);


  const handleSelectModal = (item)=>{
    //console.log("elememt",item);
    setModalBacklog(true)
    setSelectBackLog(item)
  }

  return (
    <main className="min-h-screen px-6 mt-7 mb-3" >
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
     
        <div className="flex justify-between">
          <p className="pt-2 w-32">ชื่อโปรเจกต์ : </p>
          <p  placeholder="ชื่อโปรเจกต์" className="shadow px-5 w-full h-8 rounded-xl lg:w-11/12  border-gray-700 ml-2" >{projectdetail.project_name}</p>
        </div>
        <div className="flex justify-between ">
          <p className="pt-2 w-20">Trello : </p>
          <a  href={projectdetail.trello_link}  className="shadow px-5 py-2 w-full h-auto rounded-xl lg:w-11/12 underline underline-offset-2  ml-2 mt-2" >{projectdetail.trello_link}</a>
        </div>
        <div className="flex justify-between">
          <p className="pt-2 w-20">Figma : </p>
          <a href={projectdetail.figma_link} className="shadow px-5 py-2 w-full rounded-xl h-auto lg:w-11/12 underline underline-offset-2  ml-2 mt-2" >{projectdetail.figma_link}</a>
        </div>

      <form>
          <p className="pt-2">Product backlogs : 
          <input placeholder="จำนวน" type="number" className="shadow px-4 w-24 h-8 rounded-xl lg:w-11/12  border-gray-700 mx-4 mt-2 " ></input>
          <button type="submit" className="h-8 w-12   bg-primary rounded-lg text-white ">เพิ่ม</button>
          </p>
      </form>
      <div>
        (
        <span className="text-success ml-1 mr-1">Done</span>/
        <span className="text-danger mr-1">Todo,Doing</span>)
      </div>
      <div className="grid grid-cols-3  gap-8 pt-6">
        
        {productbacklog_set.map((item,index)=>{
          return(
            <div key={index} >
              {item.status === "done" ? ( 
                <div  className="cursor-pointer" onClick={() => handleSelectModal(item)}>
                  <div className="w-full h-full border rounded-3xl border-success   text-center ">
                    <p className="my-12">{item.title_product}</p>
                  </div>
                    
                </div>
                ) : (
                  <div  className="cursor-pointer" onClick={() => handleSelectModal(item)}>
                    <div className="w-full h-full border rounded-3xl border-danger text-center ">
                      <p className="my-12">{item.title_product}</p>
                    </div>
                  </div>
                )} 
            </div> 
            
                
            
          )
        })}

        </div>
        {openModalBacklog && <ModalDetailBacklog sid={subjectID[0]} bid={selectbacklog} pid={params.pid}  closebacklog={setModalBacklog} />}

    </main>
  )
}