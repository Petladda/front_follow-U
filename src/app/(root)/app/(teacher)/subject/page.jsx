export default function(){
    return (
    <main className=" px-10 my-20 h-screen" >
    <div className="flex flex-row justify-between">
     <p className="font-extrabold my-3">รายวิชาทั้งหมด</p>
     <a href="createsubject">
         <div className="">
           <button className=" w-36 h-12 text-mid-grey rounded-3xl border block  sticky inset-x-0 bottom-0 z-10  border-mid-grey drop-shadow-lg font-extrabold">+ สร้างวิชา</button>
       </div>
    </a>
    </div>
    <div>
        
        <div className="border rounded-lg my-4 px-5 w-full h-11 ">
            <p className="my-2"> id : </p>
        </div>
        
       
    </div>
    
   </main>)
}