import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import url from "../../../url";

function Print(){

    const [purchase, setPurchase] = useState({_id:'', supplier:'', product:[], payable:0, payed:0, due:0, quantity:0, date:''});
    const {id} = useParams();

    useEffect(()=>{

        fetch(`${url}/return/supplier/${id}`,{credentials: 'include'}).then((data)=>data.json()).then((data)=>{
            setPurchase(data.data);
            window.print();
        });

    },[id]);

    const d = new Date(purchase.date);
    const dat = d.toDateString();

    return(
        <div className=" w-11/12 mx-auto mt-4 rounded-sm  h-max p-4">
            <button onClick={()=>window.print()} className='no-printme'><i className="fa-solid fa-print"></i></button>
            <div className="text-center">
                <div className=" text-xl font-bold p-2 "><i className="fa-brands fa-canadian-maple-leaf text-2xl"></i> ClassicIt POS</div>
                <div className=" text-sm"><p>House # 37(3'rd Floor), Road # 8, Sector # 12, Uttara, Dhaka-1230</p></div>
                    <div className=" text-sm"><i className="fa-solid fa-phone"></i> 09678114412</div>
                    <div className=" text-sm"><i className="fa-regular fa-envelope"></i> classicitltd@gmail.com</div>
                    <div className=" text-sm"><i className="fa-solid fa-earth-americas"></i> https://www.classicit.com.bd</div>
            </div>
            <div className=" rounded-md m-1 flex flex-col md:justify-evenly md:flex-row text-xs sm:text-sm md:text-base ">
                    <table className=" w-full table-auto border-collapse border-slate-500 mt-10">
                        <thead>
                            <tr className=" text-left border-slate-500 border-b">
                                <th>Product Name</th>
                                <th>Purchase price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className=" border-slate-500 border-b">
                                <td>{purchase.product.name}</td>
                                <td>{purchase.product.purchasePrice}  ৳</td>
                                <td>{purchase.quantity}</td>
                                <td>{purchase.product.purchasePrice * purchase.quantity}  ৳</td>
                            </tr>
                            <tr >
                                <td></td>
                                <td></td>
                                <th className="  text-left">Return :</th>
                                <td className="  ">{purchase.quantity} </td>
                            </tr>
                            <tr >
                                <td></td>
                                <td></td>
                                <th className=" border-slate-500 border-b text-left">Received :</th>
                                <td className=" border-slate-500 border-b  ">{purchase.product.purchasePrice * purchase.quantity}  ৳</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            <div>
                <div className=" w-72 border-slate-500 border-b text-center mt-40"><b>BILL TO</b></div>
                <div><b> Name : </b>{purchase.supplier.name}</div>
                <div><b> Address : </b>{purchase.supplier.address}</div>
                <div><b> Phone : </b>{purchase.supplier.phone}</div>
                <div><b> Email : </b>{purchase.supplier.email}</div>
            </div>
            <div className=" text-xs sm:text-sm md:text-base float-right relative -mt-5">
                <b> Date : </b>{dat}
            </div>
        </div>
    );
}

export default Print;