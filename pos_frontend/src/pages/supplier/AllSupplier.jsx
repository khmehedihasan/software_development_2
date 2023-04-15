import React, {  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Delete, Edit, View } from '../../components/Button';
import Layout from '../../components/Layout';
import Table, { Tr, Td, Img } from '../../components/Table';
import url from '../../url'
import { Alert1, Alert2, AlertContainer } from '../../components/Alert';
import { REMOVE_SUPPLIER } from '../../store/actions/supplier';


function AllSupplier(){

    const [alert, setAlert] = useState([]);
    const supplier = useSelector((state)=>state.supplier);
    const dispatch = useDispatch();

    function delet(id){
        fetch(`${url}/supplier/${id}`,{method:'delete',credentials: 'include'}).then((data)=>data.json()).then((data)=>{
            if(data.status === true){
                dispatch(REMOVE_SUPPLIER(id))
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
            <Table to="/supplier/add" name="Add Supplier" rowNames={["#","Name","Email", "Phone no.", "Address", "Photo","Due","Actions"]}>
                {
                    supplier.map(({_id, name, email, phone, address,due, img}, index)=>{
                        return(
                            <Tr key={index}>
                                <Td>{index+1}</Td>
                                <Td>{name}</Td>
                                <Td>{email}</Td>
                                <Td>{phone}</Td>
                                <Td>{address}</Td>
                                <Img>{img}</Img>
                                <Td>{due} <span className="text-xl text-red-600"> ৳</span></Td>
                                <Td>
                                    <View to={"/supplier/"+_id} />
                                    <Edit to={"/supplier/edit/"+_id} />
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

export default AllSupplier;