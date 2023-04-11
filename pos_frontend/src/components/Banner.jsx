import React from "react";

function BannerG({name, children}){
    return(
        <div className={` w-full relative rounded-md p-1 pl-2 md:p-3 md:h-20 lg:h-36 md:w-60 lg:w-72 md:flex-grow    text-green-600 bg-green-200 before:absolute before:h-full before:w-1 before:top-0 before:left-0 before:bg-green-500 before:rounded-tl-md before:rounded-bl-md `}><span className=" font-bold">{name} </span>{children}</div>
    );
}

function BannerR({name, children}){
    return(
        <div className={` w-full relative rounded-md p-1 pl-2 md:p-3 md:h-20 lg:h-36 md:w-60 lg:w-72 md:flex-grow     text-red-600 bg-red-200 before:absolute before:h-full before:w-1 before:top-0 before:left-0 before:bg-red-500 before:rounded-tl-md before:rounded-bl-md `}><span className=" font-bold">{name} </span>{children}</div>
    );
}

function BannerF({name, children}){
    return(
        <div className={` w-full relative rounded-md p-1 pl-2 md:p-3 md:h-20 lg:h-36 md:w-60 lg:w-72 md:flex-grow    text-fuchsia-600 bg-fuchsia-200 before:absolute before:h-full before:w-1 before:top-0 before:left-0 before:bg-fuchsia-500 before:rounded-tl-md before:rounded-bl-md `}><span className=" font-bold">{name} </span>{children}</div>
    );
}

function BannerT({name, children}){
    return(
        <div className={` w-full relative rounded-md p-1 pl-2 md:p-3 md:h-20 lg:h-36 md:w-60 lg:w-72 md:flex-grow   text-teal-600 bg-teal-200 before:absolute before:h-full before:w-1 before:top-0 before:left-0 before:bg-teal-500 before:rounded-tl-md before:rounded-bl-md `}><span className=" font-bold">{name} </span>{children}</div>
    );
}

function BannerC({name, children}){
    return(
        <div className={` w-full relative rounded-md p-1 pl-2 md:p-3 md:h-20 lg:h-36 md:w-60 lg:w-72 md:flex-grow   text-cyan-600 bg-cyan-200 before:absolute before:h-full before:w-1 before:top-0 before:left-0 before:bg-cyan-500 before:rounded-tl-md before:rounded-bl-md `}><span className=" font-bold">{name} </span>{children}</div>
    );
}

function BannerS({name, children}){
    return(
        <div className={` w-full relative rounded-md p-1 pl-2 md:p-3 md:h-20 lg:h-36 md:w-60 lg:w-72 md:flex-grow   text-sky-600 bg-sky-200 before:absolute before:h-full before:w-1 before:top-0 before:left-0 before:bg-sky-500 before:rounded-tl-md before:rounded-bl-md `}><span className=" font-bold">{name} </span>{children}</div>
    );
}

export  {BannerG, BannerR, BannerF, BannerT, BannerC, BannerS}; 