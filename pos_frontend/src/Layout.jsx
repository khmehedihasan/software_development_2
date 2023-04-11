import React from 'react';
import SideBar from '../components/SideBar';

function Layout({children}){
    return(
        <>
            <SideBar />
            <div className="w-full float-right md:w-3/4 lg:w-4/5 xl:w-10/12 h-screen-1 overflow-auto bg-slate-50 mx-auto pb-10">
               {children}
            </div>
        </>
    )
}

export default Layout;