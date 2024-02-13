
"use client"

import ModalDelete from "@/components/modal/modaldelete";
import ModalTask from "@/components/modal/modaltask";
import React, { useState } from "react";

const TasksList = () => {
  const [openModalTask, setModalTask] = useState(false);
  const [openModalDelete, setModalDelete] = useState(false);
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => (
    setInputValue(event.target.value)
  );

  const handleAddTodo = () => (
    setTodos([...todos, inputValue])
  );


    return (
      <main className="h-screen px-6" >
       <div className="">
        <p className="text-xl font-extrabold text-center">Product backlog : Log in</p>
        <p className="text-light-grey">สมาชิก</p>
        <p className="pt-2">1. 64021111 จักรพล กิตติภัทรา</p>
        <div className="flex flex-row justify-between">
          <p className="pt-2">2. 64021112 กนกจันทร์ พงศ์พิโรจ</p> 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" onClick={() => {setModalOpenWrongData(true);}}>
          <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </div>
        <div className="flex flex-row justify-between">
          <p className="pt-2">3. 64021113 อัญชิสา กาญจนมาศ</p> 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" onClick={() => {setModalOpenSavedata(true);}}>
          <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </div>
       </div>
      <div className="border-b-2 my-6 border-extar-light-grey "></div>
      <p className="text-light-grey">Tasks</p>
      <form className="" >
        <div className=" form-control my-2 flex flex-row">
          <div className="w-full pr-2">
          <input type="text" placeholder="เพิ่มtask" className="h-8 w-full border rounded-lg pl-2 text-sm" value={inputValue} onChange={handleInputChange}/>
          </div>
          <button type="button" className="h-8 w-12  bg-primary rounded-lg text-white" onClick={handleAddTodo}>เพิ่ม</button>
        </div>
        <ul>
          {todos.map((todo,index) => (
            <div key={index} className="border border-danger rounded-lg my-5 px-5 w-full h-11 flex flex-row justify-between">
            <p className="my-2">{todo}</p>
            <div className="flex flex-row justify-end ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 my-2 mr-5 " onClick={() => {setModalTask(true);}}>
                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 my-2" onClick={() => {setModalDelete(true);}}>
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </div>
        </div>
          ))}
          <div className="border border-danger rounded-lg my-5 px-5 w-full h-11 flex flex-row justify-between">
            <p className="my-2">pb1.test1</p>
            <div className="flex flex-row justify-end ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 my-2 mr-5 " onClick={() => {setModalTask(true);}}>
                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 my-2" onClick={() => {setModalDelete(true);}}>
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </div>
        </div>
        </ul>
      </form>

      {openModalTask && <ModalTask closetask={setModalTask} />}
      {openModalDelete && <ModalDelete closedelete={setModalDelete} />}
      
      </main>
    ) 
  }
  
  export default TasksList;