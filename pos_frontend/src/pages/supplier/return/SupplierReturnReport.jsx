import React, { useEffect, useState } from 'react';
import { View, Invoice } from '../../../components/Button';
import Layout from '../../../components/Layout';
import Table, { Tr, Td } from '../../../components/Table';
import url from '../../../url';


function SupplierReturnReport(){

    const [retrn, setReturn] = useState([]);

    useEffect(()=>{
        fetch(`${url}/return/supplier/`,{credentials: 'include'}).then((data)=>data.json()).then((data)=>{
            if(data.status === true){
                setReturn(data.data);
            }
        })
        return ()=> setReturn([])
    },[]);

    return(
        <Layout>
            <Table to="/purchase/add" name="Purchase Product" rowNames={["#","Product","Supplier","Purchase", "Before Stock", "Return", "After Stock", "Stock Now", "Purchase Price", "Got Money","Date","Invoice"]}>
                {
                    retrn.map(({_id, supplier, product, purchase, quantity, previousStock, date}, index)=>{
                        const d = new Date(date);
                        const dat = d.toDateString();
                        return(
                            <Tr key={index}>
                                <Td>{index+1}</Td>
                                <Td>{product.name} <View to={"/product/"+product._id} /></Td>
                                <Td>{supplier.name} <View to={"/supplier/"+supplier._id} /></Td>
                                <Td> <Invoice to={"/purchase/invoice/"+purchase._id} /></Td>
                                <Td>{previousStock} </Td>
                                <Td>{quantity} </Td>
                                <Td>{previousStock} - {quantity} = {previousStock - quantity} </Td>
                                <Td>{product.inStock} </Td>
                                <Td>{product.purchasePrice}<span className="text-xl text-red-600"> ৳</span></Td>
                                <Td>{product.purchasePrice} X {quantity} ={product.purchasePrice * quantity }<span className="text-xl text-red-600"> ৳</span></Td>
                                <Td>{dat} </Td>
                                
                                <Td>
                                    <Invoice to={"/supplier/return/invoice/"+_id} />
                                </Td>
                            </Tr>
                        );
                    })
                }
                
            </Table>
            {
                (retrn.length > 0)?<></>:<div className=" text-red-600 text-center">No report found.</div>
            }
        </Layout>
    )
}

export default SupplierReturnReport;