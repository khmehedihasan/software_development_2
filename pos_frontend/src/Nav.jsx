import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import url from '../url';

function Nav({setShow}){

    const [show1, setShow1] = useState('hidden');
    const [show2, setShow2] = useState({status:true});
    const [cookies, setCookie, removeCookie] = useCookies(['auth']);
    const navigate = useNavigate();

    function wait(){
        setTimeout(() => {
            if(show2.status){
                setShow1('hidden');
                setShow2({status:true})
            }

        },1000);
        
    }

    const [clickedOutside, setClickedOutside] = useState(false);
    const myRef = useRef();

    useEffect(()=>{
        if(clickedOutside){
            setShow1('hidden')
        }
      
    },[clickedOutside]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    });

    const handleClickOutside = e => {
        if (!myRef.current.contains(e.target)) {
            setClickedOutside(true);
        }
    };

    function logOut(){

        removeCookie('auth',[{expires: Date.now()}]);

        fetch(`${url}/user/logout`,{method:'DELETE',mode:'cors',credentials:'include'}).then((data)=>data.json()).then((data)=>{
            navigate('/logIn');
        });

    }

    

    return(
        <nav className=" z-0 float-left w-full md:w-3/4 lg:w-4/5 xl:w-10/12 flex items-center justify-between px-6  bg-white h-screen-2 border-b-2">
            <div>
                <span onClick={()=> setShow("-ml-0")} className=" block md:hidden"><i className="fa-solid fa-bars text-2xl"></i></span>
                <div className=" hidden md:block lg:ml-20">
                    <Link className=" px-4 py-2 bg-orange-600 rounded-3xl text-white font-bold border-2 border-orange-500 hover:bg-white hover:text-orange-500" to="/purchase/add"><i className="fa-solid fa-cart-plus"></i> Purchase</Link>
                    <Link className=" ml-1 px-4 py-2 bg-green-500 rounded-3xl text-white font-bold border-2 border-green-500 hover:bg-white hover:text-green-500" to="/sale/add"><i className="fa-solid fa-cart-shopping"></i> Sale</Link>
                </div>

            </div>
            <div className=" w-max flex items-center justify-end gap-3">
                <div className=' relative w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gray-200 p-3 '>
                    <i className="fa-regular fa-envelope sm:text-2xl"></i>
                    <div className="absolute top-0 right-0 w-2 h-2  sm:w-3 sm:h-3 rounded-full bg-red-600 after:absolute after:top-0 after:left-0 after:w-2 after:h-2 sm:after:w-3 sm:after:h-3 after:rounded-full after:bg-red-600 after:animate-ping"></div>
                </div>
                <div className=' relative w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gray-200 p-3'>
                    <i className="fa-regular fa-bell sm:text-2xl"></i>
                    <div className="absolute top-0 right-0 w-2 h-2  sm:w-3 sm:h-3 rounded-full bg-red-600 after:absolute after:top-0 after:left-0  after:w-2 after:h-2 sm:after:w-3 sm:after:h-3 after:rounded-full after:bg-red-600 after:animate-ping"></div>
                </div>

                <div onMouseEnter={()=> setShow1('block')} onMouseLeave={()=>{ wait(); show2.status = true}}  onClick={()=> {setShow1('block'); setClickedOutside(false)}} className=" w-max h-20 flex items-center">
                    <div className=" w-10 h-10 sm:w-14 sm:h-14 bg-gray-500 rounded-full bg-[url('../images/user.jpg')] bg-center bg-cover bg-no-repeat"></div>
                    <div className="flex flex-col items-start pl-2">
                        <h3 className=" text-xs sm:text-sm text-gray-500 font-bold">MD. Mehedi Hasan</h3>
                        <h4 className="text-xs text-gray-400">Admin</h4>
                    </div>
                </div>
                <div onMouseLeave={()=> setShow1('hidden')} onMouseEnter={()=> show2.status = false} ref={myRef} className={show1 + " z-10 w-52 h-60 bg-white  absolute top-20 mt-1 right-6"}>
                    <div className=" w-full h-24 p-4 bg-dark-blue-1 before:w-4 before:h-4 before:absolute before:-top-2 before:right-5 before:bg-dark-blue-1 before:rotate-45">
                        <h4 className="text-sm text-white">Admin</h4>
                        <h3 className=" text-md sm:text-lg text-white font-bold">MD. Mehedi Hasan</h3>
                        
                        <div className=""></div>
                    </div >
                    <div className="">
                        <NavLink onClick={()=> setShow1('hidden')} className=" w-full py-2 pl-3 cursor-pointer hover:bg-yellow-400 hover:text-white block" to="/" ><i className="fa-solid fa-user"></i> My Profile</NavLink>
                        <NavLink onClick={()=> setShow1('hidden')} className=" w-full py-2 pl-3 cursor-pointer hover:bg-blue-400 hover:text-white block" to="/" ><i className="fa-solid fa-gear"></i> Settings</NavLink>
                        <button onClick={logOut} className=" w-full py-2 pl-3 hover:bg-red-600 hover:text-white text-left"><i className="fa-solid fa-right-from-bracket"></i> Log Out</button>
                    </div>
                </div>
            </div>

        </nav>
    )
}

export default Nav;