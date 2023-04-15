import React, { useEffect, useState } from 'react';
import { View, Invoice,} from '../../../components/Button';
import Layout from '../../../components/Layout';
import Table, { Tr, Td } from '../../../components/Table';
import url from '../../../url';


function SupplierDueReport(){

    const [due, setDue] = useState([]);

    useEffect(()=>{
        fetch(`${url}/due/supplier/`,{credentials: 'include'}).then((data)=>data.json()).then((data)=>{
            if(data.status === true){
                setDue(data.data)
            }
        })
        return ()=> setDue([])
    },[]);


    return(
        <Layout>
            <Table to="/purchase/add" name="Purchase Product" rowNames={["#","Product","Supplier","Purchase", "Before Due", "Payed", "After Due", "Due Now", "Date", "Invoice"]}>
                {
                    due.map(({_id, supplier, product, purchase, payed, previousDue, date}, index)=>{
                        const d = new Date(date);
                        const dat = d.toDateString();
                        return(
                            <Tr key={index}>
                                <Td>{index+1}</Td>
                                <Td>{product.name} <View to={"/product/"+product._id} /></Td>
                                <Td>{supplier.name} <View to={"/supplier/"+supplier._id} /></Td>
                                <Td> <Invoice to={"/purchase/invoice/"+purchase._id} /></Td>
                                <Td>{previousDue} <span className="text-xl text-red-600"> ৳</span></Td>
                                <Td>{payed}<span className="text-xl text-red-600"> ৳</span></Td>
                                <Td>{previousDue} - {payed} = {previousDue - payed }<span className="text-xl text-red-600"> ৳</span></Td>
                                <Td>{supplier.due} </Td>
                                <Td>{dat} </Td>
                                
                                <Td>
                                    <Invoice to={"/supplier/due/invoice/"+_id} />
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

export default SupplierDueReport;