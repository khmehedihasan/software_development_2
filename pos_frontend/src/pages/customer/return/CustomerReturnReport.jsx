import React, { useEffect, useState } from 'react';
import { View, Invoice} from '../../../components/Button';
import Layout from '../../../components/Layout';
import Table, { Tr, Td } from '../../../components/Table';
import url from '../../../url';


function CustomerReturnReport(){

    const [retrn, setReturn] = useState([]);

    useEffect(()=>{
        fetch(`${url}/return/customer/`,{credentials: 'include'}).then((data)=>data.json()).then((data)=>{
            if(data.status === true){
                setReturn(data.data);
            }
        })
        return ()=> setReturn([])
    },[]);


    return(
        <Layout>
            <Table to="/sale/add" name="Sale Product" rowNames={["#","Product","Customer","sale", "Before Product", "Return", "After Product", "In Stock", "Purchase Price", "Momey Payed","Date","Invoice"]}>
                {
                    retrn.map(({_id, customer, product, sale, quantity, previousSold, date}, index)=>{
                        const d = new Date(date);
                        const dat = d.toDateString();
                        return(
                            <Tr key={index}>
                                <Td>{index+1}</Td>
                                <Td>{product.name} <View to={"/product/"+product._id} /></Td>
                                <Td>{customer.name} <View to={"/customer/"+customer._id} /></Td>
                                <Td> <Invoice to={"/sale/invoice/"+sale._id} /></Td>
                                <Td>{previousSold} </Td>
                                <Td>{quantity} </Td>
                                <Td>{previousSold} - {quantity} = {previousSold - quantity} </Td>
                                <Td>{product.inStock} </Td>
                                <Td>{product.purchasePrice}<span className="text-xl text-red-600"> ৳</span></Td>
                                <Td>{product.purchasePrice} X {quantity} ={product.purchasePrice * quantity }<span className="text-xl text-red-600"> ৳</span></Td>
                                <Td>{dat} </Td>
                                
                                <Td>
                                    <Invoice to={"/customer/return/invoice/"+_id} />
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

export default CustomerReturnReport;