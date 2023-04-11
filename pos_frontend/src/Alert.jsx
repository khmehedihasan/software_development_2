import React, { useEffect, useState } from "react";


function AlertContainer({children}){
    return(
        <div className=" absolute right-0 flex flex-col">{children}</div>
    )
}


function Alert1({title, message}){
    const [count, setCount] = useState(4);
    const [display, setDisplay] = useState('hidden');
    useEffect(()=>{

        var t1 = setInterval(()=>{
            setCount((count)=> count-1);
        },2000);
        setDisplay('block');
        if(count === 0){
            setDisplay('hidden');
            clearTimeout(t1);
        }

        return(()=> clearTimeout(t1));
    },[count]);

    return(
        <div className={display + " relative w-72 sm:w-80 h-max px-3 py-1 mt-4 mr-2 float-right rounded-md z-20 bg-green-200 before:absolute before:h-full before:w-1 before:top-0 before:left-0 before:bg-green-500 before:rounded-tl-md before:rounded-bl-md "}>
            <div className={display + " absolute top-1 right-1 w-6 h-6 rounded-full animate-a1 -rotate-45 border-2  border-green-200"}><div className=" text-green-600 text-xs rotate-45 flex items-center justify-center">{count}</div></div>
            <h1 className=" text-lg text-green-600">{title}</h1>
            <p className=" text-md text-green-600">{message}</p>
        </div>
    )
}

function Alert2({title, message}){
    const [count, setCount] = useState(4);
    const [display, setDisplay] = useState('hidden');
    useEffect(()=>{

        var t1 = setInterval(()=>{
            setCount((count)=> count-1);
        },2000);
        setDisplay('block');
        if(count === 0){
            setDisplay('hidden');
            clearTimeout(t1);
        }

        return(()=> clearTimeout(t1));
    },[count]);

    return(
        <div className={display + " relative w-72 sm:w-80 h-max px-3 py-1 mt-4 mr-2 rounded-md z-20 bg-red-200 before:absolute before:h-full before:w-1 before:top-0 before:left-0 before:bg-red-500 before:rounded-tl-md before:rounded-bl-md "}>
            <div className={display + " absolute top-1 right-1 w-6 h-6 rounded-full animate-a2 -rotate-45 border-2  border-red-200"}><div className=" text-red-600 text-xs rotate-45 flex items-center justify-center">{count}</div></div>
            <h1 className=" text-lg text-red-600">{title}</h1>
            <p className=" text-md text-red-600">{message}</p>
        </div>
    )
}

export { Alert1, Alert2, AlertContainer };