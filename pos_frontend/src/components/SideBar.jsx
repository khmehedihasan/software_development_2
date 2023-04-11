import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import OutsideClick from '../hooks/OutsideClick';
import Nav from './Nav';
import SideBarToggler from './SideBarToggler';

const data = [
    {
        title:'Category',
        icon: <i className="fa-brands fa-buffer pr-2"></i>,
        links:[
            {name:'All Category',link:'/category'},
            {name:'Add Category',link:'/category/add'}
        ]
    },
    {
        title:'Sub Category',
        icon: <i className="fa-solid fa-align-left pr-2"></i>,
        links:[
            {name:'All SubCategory',link:'/subCategory'},
            {name:'Add SubCategory',link:'/SubCategory/add'}
        ]
    },
    {
        title:'Product',
        icon: <i className="fa-solid fa-apple-whole pr-2"></i>,
        links:[
            {name:'All Product',link:'/product'},
            {name:'Add Product',link:'/product/add'}
        ]
    },
    {
        title:'Supplier',
        icon: <i className="fa-solid fa-person-walking-luggage pr-2"></i>,
        links:[
            {name:'All supplier',link:'/supplier'},
            {name:'Add supplier',link:'/supplier/add'}
        ]
    },
    {
        title:'Customer',
        icon: <i className="fa-solid fa-person-walking pr-2"></i>,
        links:[
            {name:'All customer',link:'/customer'},
            {name:'Add customer',link:'/customer/add'}
        ]
    },
    {
        title:'Purchase',
        icon: <i className="fa-solid fa-cart-shopping "></i>,
        links:[
            {name:'Purchase Product',link:'/purchase/add'},
            {name:'Purchase Reports',link:'/purchase'},
            {name:'Due Reports',link:'/supplier/due'},
            {name:'Return Reports',link:'/supplier/return'},
        ]
    },
    {
        title:'Sale',
        icon: <i className="fa-solid fa-bag-shopping "></i>,
        links:[
            {name:'Sale Product',link:'/sale/add'},
            {name:'Sale Reports',link:'/sale'},
            {name:'Due Reports',link:'/customer/due'},
            {name:'Return Reports',link:'/customer/return'},
        ]
    },
]

function SideBar(){
    const [active, setActive] = useState(-1);
    const [show, setShow] = useState('-ml-80');
    const outClick = useRef(null);
    const outSideClick = OutsideClick(outClick);

    useEffect(()=>{
        if(outSideClick){
            setShow('-ml-80')
        }
    },[outSideClick]);

    // "  pt-4 no-underline text-white hover:text-blue-300 block pl-6"


    return(
        <>
            
            <div ref={(show === '-ml-80')? null:outClick} className={show + " block ease-in-out duration-700 float-left absolute top-0 left-0 z-10 md:static md:-ml-0 w-1/2 sm:w-2/5 md:w-1/4 lg:w-1/5 xl:w-2/12 min-h-screen bg-dark-blue-2"}>
                
                <div className=" text-xl text-white font-bold p-6 bg-dark-blue-1"><NavLink to="/dashboard"><i className="fa-brands fa-canadian-maple-leaf text-2xl"></i> ClassicIt POS</NavLink></div>
                <NavLink to='/dashboard'  onClick={()=> setShow('-ml-80')} className={({isActive})=>isActive? 'pt-4 no-underline hover:text-blue-300 block pl-6 text-blue-300 ':'pt-4 no-underline hover:text-blue-300 block pl-6 text-white '}  ><i className="fa-solid fa-chart-column pr-2"></i> Dashboard </NavLink>
                    {
                        data.map((data,index)=>{
                            return(
                                <SideBarToggler key={index} index={index} activeIndex={active} setShow={setShow} setActive={setActive} data={data} />
                            )
                        })
                    }
            </div>
            <Nav setShow={setShow} />
        </>
    )
}

export default SideBar;