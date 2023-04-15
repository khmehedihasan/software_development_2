import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Input1 } from '../../components/Input';
import { Button1 } from '../../components/Button';
import { Form1 } from '../../components/Form';
import url from '../../url'
import { Alert1, Alert2, AlertContainer } from '../../components/Alert';
import { ADD_CUSTOMER } from '../../store/actions/customer';
import { useDispatch } from 'react-redux';


function AddCustomer(){

    const [alert, setAlert] = useState([]);
    const [value,setValue] = useState({name:'', email:'', phone:'', address:'', file:{}});


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
        }
        if( value.phone === ''){
            setAlert((alert)=>[...alert, <Alert2 key={ Date.now()} title="Faild !" message="Phone no. is required." />]);
        }
        if(value.name !== '' && value.phone !== ''){

            const formData = new FormData();

            formData.append('name',value.name);
            formData.append('email',value.email);
            formData.append('phone',value.phone);
            formData.append('address',value.address);
            formData.append('photo',value.file);

            fetch(`${url}/customer`,{
                method:"POST",
                body: formData,
                credentials: 'include'
            }).then((data)=>data.json()).then((data)=>{
                if(data.status === true){
                    dispatch(ADD_CUSTOMER(data.data));
                    setAlert((alert)=>[...alert, <Alert1 key={ Date.now()} title="Successful" message={data.message} />]);
                    setValue({name:'', email:'', phone:'', address:'', file:{}});
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

            <Form1 title="Add Customer" >
                <Input1 type="text" onChange={input} name="name" value={value.name} placeholder="Enter Customer name..." lavel="Customer name:" id="input1" />
                <Input1 type="email" onChange={input} name="email" value={value.email} placeholder="Enter Customer email..." lavel="Customer email:" id="input2" />
                <Input1 type="number" onChange={input} name="phone" value={value.phone} placeholder="Enter Customer phone..." lavel="Customer phone no." id="input3" />
                <Input1 type="address" onChange={input} name="address" value={value.address} placeholder="Enter Customer address..." lavel="Customer address:" id="input4" />
                <Input1 onChange={file} name="file" type="file" lavel="Customer photo:"id="input5" />
                <Button1 click={send} name="Save" />
            </Form1> 
        </Layout>
    )
}

export default AddCustomer;