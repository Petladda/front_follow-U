import React from "react";
import Link from "next/link";

const ChooseStatus = () => {
    
    return(
        <section className="px-24 my-20 ">
            <Link href="subject"><div className="text-base">
               <button  className="w-56 h-20 rounded-full text-center hover:text-white hover:bg-primary bg-light-green " >
                นิสิต
                </button> 
            </div>
            </Link>
            <Link href="subject">
                <div className="pt-8  text-base ">
                <button className="w-56 h-20 text-center rounded-full  hover:text-white hover:bg-primary  bg-light-green">
                    อาจารย์
                    </button> 
                </div>
            </Link>
            

            
        </section>
    )
}

export default ChooseStatus;