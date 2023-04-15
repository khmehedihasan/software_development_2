import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Input1, Input2,  Option, Select, Textarea } from '../../components/Input';
import { Button1 } from '../../components/Button';
import { Form1 } from '../../components/Form';
import url from '../../url'
import { Alert1, Alert2, AlertContainer } from '../../components/Alert';
import { UPDATE_SUB_CATEGORY } from '../../store/actions/subCategory';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


function EditSubCategory(){

    const category = useSelector((state)=>state.category);
    const [alert, setAlert] = useState([]);
    const [value,setValue] = useState({name:'', description:'', category:'', file:{}, img:''});
    const {id} = useParams();

    const dispatch = useDispatch();

    function input(e){
        setValue({...value,[e.target.name]:e.target.value});
    }
    function file(e){
        setValue({...value,[e.target.name]:e.target.files[0]});
    }

    useEffect(()=>{
        fetch(`${url}/subCategory/${id}`,{credentials: 'include'}).then((data)=>data.json()).then((data)=>{
            const {name, description, img, category} = data.data;
            setValue({name, description, category:category._id, img});
        });

    },[id]);



    function send(){
        if(value.name === ''){
            setAlert((alert)=>[...alert, <Alert2 key={ Date.now()} title="Faild !" message="Name field is required." />]);
        }
        
        if(value.category === ''){
            setAlert((alert)=>[...alert, <Alert2 key={ Date.now()} title="Faild !" message="Name field is required." />]);
        }
        
        if(value.name !== '' && value.category !== ''){

            const formData = new FormData();

            formData.append('name',value.name);
            formData.append('description',value.description);
            formData.append('categoryId',value.category);
            formData.append('photo',value.file);

            fetch(`${url}/subCategory/${id}`,{
                method:"PUT",
                body: formData,
                credentials: 'include'
            }).then((data)=>data.json()).then((data)=>{
                if(data.status === true){
                    dispatch(UPDATE_SUB_CATEGORY({id,data:data.data}))
                    setAlert((alert)=>[...alert, <Alert1 key={ Date.now()} title="Successful" message={data.message} />]);
                    setValue({name:'', description:'', file:{}});
                }else{
                    setAlert((alert)=>[...alert, <Alert2 key={ Date.now()} title="Faild !" message={data.message} />]);
                }
            });
        }
        

    }


    return(
        <Layout>
            <AlertContainer>
                {alert}
            </AlertContainer>

            <Form1 title="Edit Sub Category" >
                <Input1 type="text" onChange={input} name="name" value={value.name} placeholder="Enter sub ategory name..." lavel="Sub category name:" id="input1" />
                <Textarea onChange={input} name="description" value={value.description}  placeholder="Enter sub ategory description..." lavel="Sub category description:" id="input2" />
                <Select onChange={input}  name="category" value={value.category}  id="input4"  lavel="Select category :">
                    {
                        category.map((data, index)=>{
                            return(
                                <Option key={index} value={data._id}>{data.name}</Option>
                            )
                        })
                    }
                    
                </Select>
                <Input2 onChange={file} name="file" type="file" lavel="Sub category photo:" id="input3" img={value.img} />
                <Button1 click={send} name="Save" />
            </Form1> 
        </Layout>
    )
}

export default EditSubCategory