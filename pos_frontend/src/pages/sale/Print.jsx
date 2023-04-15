import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import url from "../../url";

function Print(){

    const [sale, setSale] = useState({_id:'', customer:[], product:[], receivable:0, received:0, due:0, quantity:0, date:''});
    const {id} = useParams();

    useEffect(()=>{

        fetch(`${url}/sale/${id}`,{credentials: 'include'}).then((data)=>data.json()).then((data)=>{
            setSale(data.data);
            window.print();
        });

    },[id]);

    const d = new Date(sale.date);
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
            <div className=" rounded-md m-1 flex flex-col md:justify-evenly md:flex-row ">
                <table className=" w-full table-auto border-collapse border-slate-500 mt-10">
                    <thead>
                        <tr className=" text-left border-slate-500 border-b">
                            <th>Product Name</th>
                            <th>Sale Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className=" border-slate-500 border-b">
                            <td>{sale.product.name}</td>
                            <td>{sale.product.salePrice}  ৳</td>
                            <td>{sale.quantity}</td>
                            <td>{sale.receivable}  ৳</td>
                        </tr>
                        <tr >
                            <td></td>
                            <td></td>
                            <th className="  text-left">Payable :</th>
                            <td className="  ">{sale.receivable}  ৳</td>
                        </tr>
                        <tr >
                            <td></td>
                            <td></td>
                            <th className=" border-slate-500 border-b text-left">Payed :</th>
                            <td className=" border-slate-500 border-b  ">{sale.received}  ৳</td>
                        </tr>
                        <tr >
                            <td></td>
                            <td></td>
                            <th className="  text-left">Due :</th>
                            <td className=" ">{sale.due}  ৳</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <div className=" w-72 border-slate-500 border-b text-center mt-40"><b>BILL TO</b></div>
                <div><b> Name : </b>{sale.customer.name}</div>
                <div><b> Address : </b>{sale.customer.address}</div>
                <div><b> Phone : </b>{sale.customer.phone}</div>
                <div><b> Email : </b>{sale.customer.email}</div>
            </div>
            <div className=" text-xs sm:text-sm md:text-base float-right relative -mt-5">
                <b> Date : </b>{dat}
            </div>
        </div>
    );
}

export default Print;