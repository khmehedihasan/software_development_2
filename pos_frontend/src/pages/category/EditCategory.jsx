import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Input1, Input2, Textarea } from '../../components/Input';
import { Button1 } from '../../components/Button';
import { Form1 } from '../../components/Form';
import url from '../../url'
import { Alert1, Alert2, AlertContainer } from '../../components/Alert';
import { UPDATE_CATEGORY } from '../../store/actions/category';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';


function EditCategory(){

    const [alert, setAlert] = useState([]);
    const [value,setValue] = useState({name:'', description:'', file:{}, img:''});
    const {id} = useParams();

    const dispatch = useDispatch();

    function input(e){
        setValue({...value,[e.target.name]:e.target.value});
    }
    function file(e){
        setValue({...value,[e.target.name]:e.target.files[0]});
    }

    useEffect(()=>{
        fetch(`${url}/category/${id}`,{credentials: 'include'}).then((data)=>data.json()).then((data)=>{
            const {name, description, img} = data.data[0];
            setValue({name, description, img});
        });

    },[id]);


    function send(){
        if(value.name === ''){
            setAlert((alert)=>[...alert, <Alert2 key={ Date.now()} title="Faild !" message="Name field is required." />]);
        }else{

            const formData = new FormData();

            formData.append('name',value.name);
            formData.append('description',value.description);
            formData.append('photo',value.file);

            fetch(`${url}/category/${id}`,{
                method:"PUT",
                body: formData
            }).then((data)=>data.json()).then((data)=>{
                if(data.status === true){
                    dispatch(UPDATE_CATEGORY({id,data:data.data}))
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

            <Form1 title="Edit Category" >
                <Input1 type="text" onChange={input} name="name" value={value.name} placeholder="Enter Category name..." lavel="Category name:" id="input1" />
                <Textarea onChange={input} name="description" value={value.description}  placeholder="Enter Category description..." lavel="Category description:" id="input2" />
                <Input2 onChange={file} name="file" type="file" lavel="Category photo:" id="input3" img={value.img} />
                <Button1 click={send} name="Save" />
            </Form1> 
        </Layout>
    )
}

export default EditCategory;