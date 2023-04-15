import React from 'react';
import { useSelector } from 'react-redux';
import { View, Return, Invoice, Due} from '../../components/Button';
import Layout from '../../components/Layout';
import Table, { Tr, Td } from '../../components/Table';


function AllPurchase(){

    const purchase = useSelector((state)=>state.purchase);


    return(
        <Layout>
            <Table to="/purchase/add" name="Purchase Product" rowNames={["#","Product","Supplier", "Quantity", "Payable", "Payed", "Due","Date","Actios"]}>
                {
                    purchase.map(({_id, supplier, product, payable, payed, due, quantity, date}, index)=>{
                        const d = new Date(date);
                        const dat = d.toDateString();
                        return(
                            <Tr key={index}>
                                <Td>{index+1}</Td>
                                <Td>{product.name} <View to={"/product/"+product._id} /></Td>
                                <Td>{supplier.name} <View to={"/supplier/"+supplier._id} /></Td>
                                <Td>{quantity} </Td>
                                <Td>{payable}<span className="text-xl text-red-600"> ৳</span></Td>
                                <Td>{payed}<span className="text-xl text-red-600"> ৳</span></Td>
                                <Td>{due} <span className="text-xl text-red-600"> ৳</span></Td>
                                <Td>{dat} </Td>
                                
                                <Td>
                                    <Invoice to={"/purchase/invoice/"+_id} />
                                    {
                                        (due > 0)? <Due to={"/supplier/due/"+_id} />:<span className="w-6 h-3 inline-block"></span>
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

        </Layout>
    )
}

export default AllPurchase;