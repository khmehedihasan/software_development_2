import React from 'react';
import { Link } from 'react-router-dom';

function Table({rowNames, to, name, children}){
    return(
        <>
        <div className=" w-max xl:w-full mx-auto p-2">
            <div className=" w-full h-14 mt-20 bg-dark-blue-1 mx-auto rounded-tl-md rounded-tr-md">
                    <Link to={to}><button className=" rounded-3xl bg-cyan-200 hover:bg-dark-blue-1 border-2 border-cyan-200 hover:text-white   float-right mt-2 mr-2 px-2 py-1">{name}</button></Link>
                </div>
                <table className=" w-max lg:w-full mx-auto table-auto border-collapse border border-slate-500">
                    <thead>
                        <tr>
                            {
                                rowNames.map((data, index)=>{
                                    return(
                                        <th key={index} className="border border-slate-600">{data}</th>
                                    );
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {children}
                    </tbody>
                </table>
        </div>

        </>
    );
}

function Tr({children}){
    return(
        <tr className=" even:bg-gray-300">{children}</tr>
    );
}

function Td({children, width}){
    return(
        <td className="border max-w-xs p-2 border-slate-700 text-center">{children}</td>
    );
}

function Img({children}){
    return(
        <td className="border border-slate-700 text-center"><img className=" text-center block mx-auto" width="100" src={children} alt=" "  /></td>
    );
}

export default Table;

export { Tr, Td, Img};