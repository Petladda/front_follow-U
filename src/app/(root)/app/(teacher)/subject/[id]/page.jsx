"use client"

export default function({params}){
    return (
        <main className="px-10 h-screen">
            <div>form for create project for subject id {params.id} </div>
            

            <div>
                <p>Show Subject BY ID : {params.id} โหลดข้อมูลโปรเจคในรายวิชานี้ออกมา </p>
                <p>name : </p>
            </div>
         
            <a href="create">
                <div className="">
                    <a href="">
                    <button className=" w-36 h-12 text-mid-grey rounded-3xl border block  sticky inset-x-0 bottom-0 z-10  border-mid-grey drop-shadow-lg font-extrabold">+ สร้างโปรเจกต์</button></a>
                </div>
            </a>
        </main>
    
    )
}