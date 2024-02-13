import React from "react";

const ModalDelete = ({ closedelete })=>{

    return(
        <>
            <div className="justify-center fixed inset-0 top-2/4 z-10 -translate-y-2/4 -translate-x-2/4 left-2/4 w-96 h-48 border 
            rounded-xl drop-shadow-xl bg-white">
                <div className="flex flex-col pd-25 ">

                    <div className="text-center text-xl font-extrabold pt-10">
                    <h1>ต้องการลบ</h1>
                    </div>
                    <div className="text-center my-2">
                    <p></p>
                    </div>
                    <div className="my-2 flex flex-row justify-around">
                    <button className="h-12 w-24 border border-danger rounded-md text-danger" onClick={() => closedelete(false)}>ยกเลิก</button>
                    <button className="h-12 w-24 border bg-primary rounded-md text-white" >ตกลง</button>
                    </div>
                </div>
            </div>
            <div className="fixed top-0 left-0 w-full h-full backdrop-blur-none"></div>
            <div className="fixed top-0 left-0  bg-black w-full h-full opacity-40 backdrop-blur-3xl"></div>
        </>
    );
}

export default ModalDelete;