import React, {  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Delete, Edit, Return, View } from '../../components/Button';
import Layout from '../../components/Layout';
import Table, { Tr, Td, Img } from '../../components/Table';
import url from '../../url'
import { Alert1, Alert2, AlertContainer } from '../../components/Alert';
import { REMOVE_PRODUCT } from '../../store/actions/product';


function AllProduct(){

    const [alert, setAlert] = useState([]);
    const product = useSelector((state)=>state.product);
    const dispatch = useDispatch();

    function delet(id){

        fetch(`${url}/product/${id}`,{method:'delete',credentials: 'include'}).then((data)=>data.json()).then((data)=>{
            if(data.status === true){
                dispatch(REMOVE_PRODUCT(id));

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
            <Table to="/product/add" name="Add Product" rowNames={["#","Name","Description", "Sub category", "Purchase price", "Sale price", "Photo","Actions"]}>
                {
                    product.map(({_id, name, description, subCategory, purchasePrice, salePrice, img}, index)=>{
                        return(
                            <Tr key={index}>
                                <Td>{index+1}</Td>
                                <Td>{name}</Td>
                                <Td>{description}</Td>
                                <Td>{subCategory.name}</Td>
                                <Td>{purchasePrice} <span className="text-xl text-red-600"> ৳</span></Td>
                                <Td>{salePrice} <span className="text-xl text-red-600"> ৳</span></Td>
                                <Img>{img}</Img>
                                <Td>
                                    <View to={"/product/"+_id} />
                                    <Edit to={"/product/edit/"+_id} />
                                    <Return to="/" />
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

export default AllProduct;