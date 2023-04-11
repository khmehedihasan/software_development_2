import React from 'react';
import { NavLink } from 'react-router-dom';

function SideBarToggler({data, index, activeIndex, setActive, setShow}){


    function active(){
        if(activeIndex === index){
            setActive(-1)
        }
        if(activeIndex !== index){
            setActive(index)
        }
    }


    return(
        <div className={` ease-in-out duration-700 ${(activeIndex === index)?'relative pb-3 bg-black before:absolute before:w-1 before:h-full before:bg-blue-300 before:rounded-tr-md before:rounded-br-md':''}`}>
        <div onClick={()=> active()} className={`w-full text-lg pl-6 cursor-pointer hover:bg-black ${(activeIndex === index)? 'text-blue-300 p-1':'p-2 text-white hover:text-gray-400'}`}>{data.icon} {data.title}</div>
        <div className={`ease-in-out duration-700 ${(activeIndex === index)? 'h-max' :'hidden' } w-full `}>
            {
                data.links.map((link,indx)=>{
                    return(
                        <NavLink to={link.link} key={indx} onClick={()=> setShow('-ml-80')} className={" no-underline text-gray-400 hover:text-blue-300 block pl-11"} >{link.name}</NavLink>
                    )
                })
            }
        </div>
    </div>
    )
}

export default SideBarToggler;