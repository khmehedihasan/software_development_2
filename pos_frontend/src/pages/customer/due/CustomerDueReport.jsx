import React, { useEffect, useState } from 'react';
import { View, Invoice} from '../../../components/Button';
import Layout from '../../../components/Layout';
import Table, { Tr, Td } from '../../../components/Table';
import url from '../../../url';


function CustomerDueReport(){

    const [due, setDue] = useState([]);

    useEffect(()=>{
        fetch(`${url}/due/customer/`,{credentials: 'include'}).then((data)=>data.json()).then((data)=>{
            if(data.status === true){
                setDue(data.data)
            }
        })

        return ()=> setDue([])
    },[]);


    return(
        <Layout>
            <Table to="/sale/add" name="Sale Product" rowNames={["#","Product","Customer","sale", "Before due", "Received", "After due", "Due now", "Date","Invoice"]}>
                {   
                    due.map(({_id, customer, product, received, sale, previousDue, date}, index)=>{
                        const d = new Date(date);
                        const dat = d.toDateString();
                        return(
                            <Tr key={index}>
                                <Td>{index+1}</Td>
                                <Td>{product.name} <View to={"/product/"+product._id} /></Td>
                                <Td>{customer.name} <View to={"/customer/"+customer._id} /></Td>
                                <Td> <Invoice to={"/sale/invoice/"+sale._id} /></Td>
                                <Td>{previousDue} <span className="text-xl text-red-600"> ৳</span></Td>
                                <Td>{received} <span className="text-xl text-red-600"> ৳</span></Td>
                                <Td>{previousDue} - {received} = {previousDue - received} <span className="text-xl text-red-600"> ৳</span></Td>
                                <Td>{customer.due} <span className="text-xl text-red-600"> ৳</span></Td>
                                <Td>{dat} </Td>
                                
                                <Td>
                                    <Invoice to={"/customer/due/invoice/"+_id} />
                                </Td>
                            </Tr>
                        );
                    })
                }
            </Table>
            {
                (due.length > 0)?<></>:<div className=" text-red-600 text-center">No report found.</div>
            }
        </Layout>
    )
}

export default CustomerDueReport;