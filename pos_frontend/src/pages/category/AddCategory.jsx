import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Input1, Textarea } from '../../components/Input';
import { Button1 } from '../../components/Button';
import { Form1 } from '../../components/Form';
import url from '../../url'
import { Alert1, Alert2, AlertContainer } from '../../components/Alert';
import { ADD_CATEGORY } from '../../store/actions/category';
import { useDispatch } from 'react-redux';


function AddCategory(){

    const [alert, setAlert] = useState([]);
    const [value,setValue] = useState({name:'', description:'', file:{}});


    const dispatch = useDispatch();

    function input(e){
        setValue({...value,[e.target.name]:e.target.value});
    }
    function file(e){
        setValue({...value,[e.target.name]:e.target.files[0]});
    }


    function send(){
        if(value.name === ''){
            setAlert((alert)=>[...alert, <Alert2 key={ Date.now()} title="Faild !" message="Name field is required." />]);
        }else{

            const formData = new FormData();

            formData.append('name',value.name);
            formData.append('description',value.description);
            formData.append('photo',value.file);

            fetch(`${url}/category`,{
                method:"POST",
                body: formData,
                credentials: 'include'
            }).then((data)=>data.json()).then((data)=>{
                if(data.status === true){
                    dispatch(ADD_CATEGORY(data.data));
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

            <Form1 title="Add Category" >
                <Input1 type="text" onChange={input} name="name" value={value.name} placeholder="Enter Category name..." lavel="Category name:" id="input1" />
                <Textarea onChange={input} name="description" value={value.description}  placeholder="Enter Category description..." lavel="Category description:" id="input2" />
                <Input1 onChange={file} name="file" type="file" lavel="Category photo:"id="input3" />
                <Button1 click={send} name="Save" />
            </Form1> 
        </Layout>
    )
}

export default AddCategory;