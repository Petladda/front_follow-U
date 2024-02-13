export default function({params}){
    return (
        <main className="h-screen px-6" >
       <p className="font-extrabold">เข้าร่วมกลุ่ม</p>
       <form className="" >
         <div className=" form-control my-2 flex flex-row">
           <div className="w-full pr-2">
           <input type="text" placeholder="เข้าร่วมกลุ่ม" className="h-8 w-full border rounded-lg pl-2 text-sm" />
           </div>
           <button type="submit" className="h-8 w-24  bg-primary rounded-lg text-white ">เข้าร่วม</button>
         </div>
        </form>
        </main>
    )
}