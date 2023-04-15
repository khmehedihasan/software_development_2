import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {BannerG, BannerR, BannerF, BannerT} from "../../components/Banner";
import { Return, View, Invoice, Due } from '../../components/Button';
import Table, { Tr, Td} from '../../components/Table';
import Layout from '../../components/Layout'
import url from "../../url";

function ViewCustomer(){

    const [customer, setCustomer] = useState({_id:'', name:'',img:'',email:'',phone:'',address:'', receivable: 0, received: 0, due: 0, sales:[]});
    const {id} = useParams();

    useEffect(()=>{

        fetch(`${url}/customer/${id}`,{credentials: 'include'}).then((data)=>data.json()).then((data)=>{
            setCustomer(data.data)
        });

    },[id]);

    return(
        <Layout>
            <div className=" bg-white drop-shadow-md w-11/12 mx-auto mt-4 rounded-sm  h-max p-4">
                <div className=" h-max mb-4 flex flex-wrap gap-3 justify-center">
                    <Link className=" px-4 py-1 bg-blue-500 rounded-3xl text-white font-bold border-2 border-blue-500 hover:bg-white hover:text-blue-500" to={"/customer/edit/"+customer._id}><i className="fa-solid fa-pen-to-square"></i> Edit</Link>
                    <Link className=" px-4 py-1 bg-orange-600 rounded-3xl text-white font-bold border-2 border-orange-500 hover:bg-white hover:text-orange-500" to="/purchase/add"><i className="fa-solid fa-cart-plus"></i> Purchase</Link>
                    <Link className=" px-4 py-1 bg-green-500 rounded-3xl text-white font-bold border-2 border-green-500 hover:bg-white hover:text-green-500" to="/sale/add"><i className="fa-solid fa-cart-shopping"></i> Sale</Link>
                </div>
                <div className=" rounded-md bg-gradient-to-r from-cyan-200 to-cyan-400 m-1 flex flex-col md:flex-row">
                    <img src={customer.img} alt=" " className=" w-full md:w-1/3 rounded-tr-md rounded-tl-md md:rounded-bl-md md:rounded-tr-none" />
                    <div className="p-2 text-cyan-700">
                        <h1><span className=" font-bold">Name: </span>{customer.name}</h1>
                        <h1><span className=" font-bold">Email: </span>{customer.email}</h1>
                        <h1><span className=" font-bold">Phone: </span>{customer.phone}</h1>
                        <p className=" text-justify"><span className=" font-bold">Address: </span>{customer.address}</p>
                    </div>
                </div>
                <div className=" flex flex-col gap-4 mt-4 md:flex-row md:flex-wrap flex-grow">
                    <BannerF  name="Receivable:" >{customer.receivable} ৳</BannerF>
                    <BannerT  name="Received:" >{customer.received} ৳</BannerT>
                    {
                        (customer.due  > 0)?<BannerR  name="Due:" >{customer.due} ৳</BannerR>:<BannerG  name="Due:" color="green">{customer.due} ৳</BannerG>
                    }
                    
                </div>
            </div>
            {
                (customer.sales.length > 0)?
                <div className=" bg-white drop-shadow-md w-11/12 mx-auto mt-10 rounded-sm  h-max p-4 overflow-auto">
                    <h1 className=" text-center font-bold border-b">Product Sales</h1>
                    <Table to="/purchase/add" name="Sale Product" rowNames={["#","Product", "Quantity", "Receivable", "Received", "Due","Date","Actions"]}>
                        {
                            customer.sales.map(({_id, receivable, product, received, due, quantity, date}, index)=>{
                                const d = new Date(date);
                                const dat = d.toDateString();
                                return(
                                    <Tr key={index}>
                                        <Td>{index+1}</Td>
                                        <Td> <View to={"/product/"+product} /></Td>
                                        <Td>{quantity} </Td>
                                        <Td>{receivable}<span className="text-xl text-red-600"> ৳</span></Td>
                                        <Td>{received}<span className="text-xl text-red-600"> ৳</span></Td>
                                        <Td>{due} <span className="text-xl text-red-600"> ৳</span></Td>
                                        <Td>{dat} </Td>
                                        
                                        <Td>
                                            <Invoice to={"/sale/invoice/"+_id} />
                                            {
                                                (due > 0)? <Due to={"/customer/due/"+_id} />:<span className="w-6 h-3 inline-block"></span>
                                            }
                                            {
                                                (quantity > 0)? <Return to={"/supplier/return/"+_id} />:<span className="w-6 h-3 inline-block"></span>
                                            }
                                        </Td>
                                    </Tr>
                                );
                            })
                        }
                        
                    </Table>
                </div>: <div className=" text-center mt-10 text-red-500"> No product is sell to this customer. </div>
            }
        </Layout>
    );
}

export default ViewCustomer;