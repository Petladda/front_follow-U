export default function({params}){
    return (
        <main className="h-screen px-6" >
        <div className="">
         <p className="text-xl font-extrabold text-center">Product backlog : {params.bid}</p>
         <p className="text-light-grey">สมาชิก</p>
         <p className="pt-2">1. 64021111 จักรพล กิตติภัทรา</p>
         <div className="flex flex-row justify-between">
           <p className="pt-2">2. 64021112 กนกจันทร์ พงศ์พิโรจ</p> 
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
           <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
           </svg>
         </div>
         <div className="flex flex-row justify-between">
           <p className="pt-2">3. 64021113 อัญชิสา กาญจนมาศ</p> 
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
           <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
           </svg>
         </div>
        </div>
       <div className="border-b-2 my-6 border-extar-light-grey "></div>
       <p className="text-light-grey">Tasks</p>
       <form className="" >
         <div className=" form-control my-2 flex flex-row">
           <div className="w-full pr-2">
           <input type="text" placeholder="เพิ่มtask" className="h-8 w-full border rounded-lg pl-2 text-sm" />
           </div>
           <button type="submit" className="h-8 w-12  bg-primary rounded-lg text-white ">เพิ่ม</button>
         </div>
        </form>
        </main>
    )
}