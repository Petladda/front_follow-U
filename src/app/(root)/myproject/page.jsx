
"use client"

import React from "react";
import { DataProject } from "@/app/context/useDatasubject";

const MyProjectPage = () => {

  const {projects} = DataProject()
 
    return (
      <main className="flex flex-col" >
        <div className="flex flex-row justify-between">
          <p className="font-extrabold my-3">โปรเจกต์ของฉัน</p>
          <a href="joingroup">
            <div className="flex justify-end">
              <button className=" w-36 h-12 text-mid-grey rounded-3xl border border-mid-grey drop-shadow-lg font-extrabold">+ เข้าร่วมโปรเจกต์</button>

            </div>
          </a>
        </div>
        <div>
            {projects.map((e)=>{
                return (
                    <div className="border rounded-lg my-4 px-5 w-full h-11 ">
                        <a href="detailproject"><p className="my-2"> id : {e.id} {e.title}</p></a>
                    </div>
                )
            })}
       </div>
      </main>
    )
  }
  
  export default MyProjectPage;