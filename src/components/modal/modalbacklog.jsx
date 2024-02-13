import { useRouter } from "next/navigation";

const ModalBacklog = ({sid,pid,bid, closebacklog })=>{

    const router = useRouter()

    return(
        <>
            <div className="justify-center fixed inset-0 top-2/4 z-10 -translate-y-2/4 -translate-x-2/4 left-2/4 w-96 h-48 border 
            rounded-xl drop-shadow-2xl bg-white">
                <div className="flex flex-col pd-25">
                    <div className="text-center text-2xl font-extrabold my-9"> 
                    <h1>Product Backlog 01</h1>
                    </div>
                    <div className="my-2 flex flex-row justify-around px-6">
                    <button onClick={()=>router.push(`/subject/${sid}/project/${pid}backlog/${{bid}}`)}  
                        className="h-12 w-24 border  bg-primary rounded-xl text-white" ></button>
                    <button className="h-12 w-24 border  bg-primary rounded-xl text-white" >สร้าง</button>
                    <button className="h-12 w-24 border  border-danger rounded-xl text-danger" onClick={() => closebacklog(false)}>ลบ</button>
                    </div>
                </div>
            </div>
            <div className="fixed top-0 left-0 w-full h-full backdrop-blur-none"></div>
            <div className="fixed top-0 left-0  bg-black w-full h-full opacity-40 backdrop-blur-3xl"></div>
        </>
    );
}

export default ModalBacklog;
