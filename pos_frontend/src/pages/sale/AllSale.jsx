import React from 'react';
import { useSelector } from 'react-redux';
import { View, Return, Invoice, Due} from '../../components/Button';
import Layout from '../../components/Layout';
import Table, { Tr, Td } from '../../components/Table';


function AllSale(){

    const sale = useSelector((state)=>state.sale);


    return(
        <Layout>
            <Table to="/sale/add" name="Sale Product" rowNames={["#","Product","Customer", "Quantity", "Receivable", "Received", "Due","Date","Actions"]}>
                {
                    sale.map(({_id, customer, product, receivable, received, due, quantity, date}, index)=>{
                        const d = new Date(date);
                        const dat = d.toDateString();
                        return(
                            <Tr key={index}>
                                <Td>{index+1}</Td>
                                <Td>{product.name} <View to={"/product/"+product._id} /></Td>
                                <Td>{customer.name} <View to={"/customer/"+customer._id} /></Td>
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
                                         (quantity > 0)? <Return to={"/customer/return/"+_id} />:<span className="w-6 h-3 inline-block"></span>
                                    }
                                </Td>
                            </Tr>
                        );
                    })
                }
                
            </Table>

        </Layout>
    )
}

export default AllSale;