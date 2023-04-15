import React, {  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Delete, Edit, View } from '../../components/Button';
import Layout from '../../components/Layout';
import Table, { Tr, Td, Img } from '../../components/Table';
import url from '../../url'
import { Alert1, Alert2, AlertContainer } from '../../components/Alert';
import { REMOVE_CUSTOMER } from '../../store/actions/customer';


function AllCustomer(){

    const [alert, setAlert] = useState([]);
    const customer = useSelector((state)=>state.customer);
    const dispatch = useDispatch();

    function delet(id){
        fetch(`${url}/customer/${id}`,{method:'delete',credentials: 'include'}).then((data)=>data.json()).then((data)=>{
            if(data.status === true){
                dispatch(REMOVE_CUSTOMER(id))
                setAlert((alert)=>[...alert, <Alert1 key={ Date.now()} title="Successful" message={data.message} />]);
            }else{
                setAlert((alert)=>[...alert, <Alert2 key={ Date.now()} title="Faild !" message={data.message} />]);
            }
        });
    }

    return(
        <Layout>
            <AlertContainer>
                {alert}
            </AlertContainer>
            <Table to="/customer/add" name="Add Customer" rowNames={["#","Name","Email", "Phone no.", "Address", "Photo","Actions"]}>
                {
                    customer.map(({_id, name, email, phone, address, img}, index)=>{
                        return(
                            <Tr key={index}>
                                <Td>{index+1}</Td>
                                <Td>{name}</Td>
                                <Td>{email}</Td>
                                <Td>{phone}</Td>
                                <Td>{address}</Td>
                                <Img>{img}</Img>
                                <Td>
                                    <View to={"/customer/"+_id} />
                                    <Edit to={"/customer/edit/"+_id} />
                                    <Delete id={_id} click={delet} />
                                </Td>
                            </Tr>
                        );
                    })
                }
                
            </Table>

        </Layout>
    )
}

export default AllCustomer;