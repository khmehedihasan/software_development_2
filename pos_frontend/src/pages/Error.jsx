import React from "react";
import { useNavigate } from "react-router-dom";

function Error(){
    const navigate = useNavigate()
    return(
        <div className=" w-screen h-screen bg-slate-100 flex flex-col items-center justify-center">
            <div className=" text-red-600 text-center -mt-60 text-2xl font-bold">404, Not found.</div>
            <button onClick={()=> navigate(-1)} className=" animate-bounce border-2 rounded-full border-blue-400 px-4 py-1 mt-10 text-blue-600 hover:bg-blue-400 hover:text-white">Go Back</button>
        </div>
    )
}

export default Error;