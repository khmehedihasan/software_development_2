import React, {  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Delete, Edit } from '../../components/Button';
import Layout from '../../components/Layout';
import Table, { Tr, Td, Img } from '../../components/Table';
import url from '../../url'
import { Alert1, Alert2, AlertContainer } from '../../components/Alert';
import { REMOVE_CATEGORY } from '../../store/actions/category';


function AllCategory(){

    const [alert, setAlert] = useState([]);
    const category = useSelector((state)=>state.category);
    const dispatch = useDispatch();

    function delet(id){
        fetch(`${url}/category/${id}`,{method:'DELETE',mode:'cors',credentials:"include"}).then((data)=>data.json()).then((data)=>{
            if(data.status === true){
                dispatch(REMOVE_CATEGORY(id))
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
            <Table to="/category/add" name="Add Category" rowNames={["#","Name","Description","Photo","Actions"]}>
                {
                    category.map(({_id, name, description, img}, index)=>{
                        return(
                            <Tr key={index}>
                                <Td>{index+1}</Td>
                                <Td>{name}</Td>
                                <Td>{description}</Td>
                                <Img>{img}</Img>
                                <Td>
                                    <Edit to={"/category/edit/"+_id} />
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

export default AllCategory;