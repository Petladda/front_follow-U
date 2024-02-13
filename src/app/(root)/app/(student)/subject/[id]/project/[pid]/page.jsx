
"use client"
import ModalBacklog from "@/components/modal/modalbacklog";
import { useState } from "react";

export default function({params}){
    const [openModalBacklog, setModalBacklog] = useState(false);
  
    return (
      <main className="h-screen px-6" >
       <div className="">
          <p className="text-xl font-extrabold text-center">รหัสโปรเจกต์ : {params.pid} </p>
          <p className="text-light-grey">สมาชิก</p>
          <p className="pt-2">1. 64021111 จักรพล กิตติภัทรา</p>
          <div className="flex flex-row justify-between">
            <p className="pt-2">2. 64021112 กนกจันทร์ พงศ์พิโรจ</p> 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </div>
          <div className="flex flex-row justify-between">
            <p className="pt-2">3. 64021113 อัญชิสา กาญจนมาศ</p> 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </div>
        </div>
        <div className="border-b-2 my-6 border-extar-light-grey "></div>
        <div className="flex justify-between">
          <p className="pt-2 w-32">ชื่อโปรเจกต์ : </p>
          <input placeholder="ชื่อโปรเจกต์" className="shadow px-5 w-full h-8 rounded-xl lg:w-11/12  border-gray-700 ml-2" ></input>
        </div>
        <div className="flex justify-between">
          <p className="pt-2 w-20">Trello : </p>
          <input placeholder="Trello link" className="shadow px-5 w-full h-8 rounded-xl lg:w-11/12  border-gray-700 ml-2 mt-2" ></input>
        </div>
        <div className="flex justify-between">
          <p className="pt-2 w-20">Figma : </p>
          <input placeholder="Figma link" className="shadow px-5 w-full h-8 rounded-xl lg:w-11/12  border-gray-700 ml-2 mt-2" ></input>
        </div>
        <p className="pt-2">Daily scrum :
          <a href="register_users" className="ml-3 underline underline-offset-2">View</a> 
        </p>
        <p className="pt-2">Product backlogs : 
        <input placeholder="จำนวน" className="shadow px-5 w-24 h-8 rounded-xl lg:w-11/12  border-gray-700 ml-4 mt-2" ></input>
        <button type="submit" className="h-8 w-12  bg-primary rounded-lg text-white ">เพิ่ม</button>
      </p>
        <div class="grid grid-cols-3 grid-flow-row gap-8 pt-6">
            <button className="" onClick={() => {setModalBacklog(true);}}>
            <div className="w-full h-full border rounded-3xl  border-gray-600 text-center">
              <p className="my-12"></p>
            </div></button>
            <div className="w-full h-full border rounded-3xl  border-gray-600 text-center">
              <p className="my-12">02</p>
            </div>
            <div className="w-full h-full border rounded-3xl  border-gray-600 text-center">
              <p className="my-12">03</p>
            </div>
            <div className="w-full h-full border rounded-3xl  border-gray-600 text-center">
              <p className="my-12">04</p>
            </div>
        </div>
      {openModalBacklog && <ModalBacklog bid={1} closebacklog={setModalBacklog} />}
      </main>
    )
}