import React from "react";

function Form1({title, children}){
    return(
        <form className=" relative w-11/12 sm:w-5/6 mx-auto mt-10 p-4 bg-gradient-to-r from-cyan-400 to-blue-400 pb-10 rounded-sm">
            <h1 className=" w-full text-center text-white text-xl font-bold pb-6">{title}</h1>
            {children}
        </form>
    )
}

export { Form1 };