"use client"
import { useAuth } from "@/app/context/authentication";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'

const ModalBacklog = ({sid, pid, bid, closebacklog }) => {
    const router = useRouter();
    const {client} = useAuth()
    const swal = require('sweetalert2')
    const id = bid.id;
    //console.log("index",index);
    
    const handleDeleteBacklog = ()=>{
        client.delete(`/api/subject/${sid}/project/${pid}/productbacklog-delete/${id}`)
        .then((res)=>{
            if (res.status === 201) {
                router.replace(`/student/yourproject/${pid}`)
                swal.fire({
                    title: "ลบ Product Backlog สำเร็จ!!! ",
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
        <>
            <div className="justify-center fixed inset-0 top-2/4 z-10 -translate-y-2/4 -translate-x-2/4 left-2/4 w-96 h-48 border rounded-xl drop-shadow-2xl bg-white">
                <div className="flex flex-col pd-25">
                    <div className="text-center text-2xl font-extrabold my-9"> 
                        <h1>Product Backlog </h1>
                    </div>
                    <div className="my-2 flex flex-row justify-around px-6">
                        <button type="button" 
                            onClick={() => {
                                router.push(`/student/yourproject/${pid}/backlog/${id}`);
                            }}  
                            className="h-12 w-24 border bg-primary rounded-xl text-white"
                        >
                            ดูข้อมูล
                        </button>
                        <button 
                            className="h-12 w-24 border border-danger rounded-xl text-danger" 
                            onClick={() => handleDeleteBacklog()}
                        >
                            ลบ
                        </button>
                    </div>
                </div>
            </div>
            <div className="fixed top-0 left-0 w-full h-full backdrop-blur-none"></div>
            <div className="fixed top-0 left-0 bg-black w-full h-full opacity-40 backdrop-blur-3xl" onClick={() => closebacklog(false)}></div>
        </>
    );
}

export default ModalBacklog;
