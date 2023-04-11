import React from 'react';

function Input1({onChange, type, name, value, placeholder, lavel, id }){

    return(
        <>
            <label htmlFor={id} className="block cursor-pointer mt-2 mb-1">{lavel}</label>
            <input className=" w-full outline-none focus:bg-cyan-100 pl-2 py-1 rounded-sm text-gray-600 required:border-red-500" id={id} onChange={onChange} type={type} name={name} value={value} placeholder={placeholder} />
        </>
    )
}



function Input2({onChange, type, name, value, placeholder, lavel, id, img}){

    return(
        <>
            <label htmlFor={id} className="block cursor-pointer mt-2 mb-1">{lavel}</label>
            <div className=" w-full flex items-center">
                <input className=" outline-none focus:bg-cyan-100 pl-2 py-1 rounded-sm text-gray-600 required:border-red-500" id={id} onChange={onChange} type={type} name={name} value={value} placeholder={placeholder} />
                <img src={img} alt="" width="100" />
            </div>

        </>
    )
}



function Select({onChange, value, name, lavel, id, children, disable}){

    return(
        <>
            <label htmlFor={id} className="block cursor-pointer mt-2 mb-1">{lavel}</label>

            <select onChange={onChange} name={name} value={value} id={id} disabled={disable} className=" w-full outline-none focus:bg-cyan-100 pl-2 py-1 rounded-sm text-gray-600 required:border-red-500">
                    {children}         
            </select>

        </>
    )
}


function Option({value, children}){
    return(
        <option value={value}>{children}</option>
    )
}



function Textarea({onChange, name, value, placeholder, lavel, id}){

    return(
        <>
            <label htmlFor={id} className="block cursor-pointer mt-2 mb-1 ">{lavel}</label>
            <textarea className=" w-full outline-none focus:bg-cyan-100 pl-2 rounded-sm text-gray-600 required:border-red-500" onChange={onChange} id={id} name={name} value={value} placeholder={placeholder} cols="20" rows="10"></textarea>
        </>
    )
}

 export { Input1, Input2,Select, Option, Textarea } ;
