import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Input1, Option, Select, Textarea } from '../../components/Input';
import { Button1 } from '../../components/Button';
import { Form1 } from '../../components/Form';
import url from '../../url'
import { Alert1, Alert2, AlertContainer } from '../../components/Alert';
import { ADD_PRODUCT } from '../../store/actions/product';
import { useDispatch, useSelector } from 'react-redux';


function AddProduct(){
    const category = useSelector((state)=>state.category);
    const [subCategory, setSubCategory] = useState([]);
    const [alert, setAlert] = useState([]);
    const [value,setValue] = useState({name:'', description:'', salePrice: 0, purchasePrice: 0, subCategory:'', file:{}});


    const dispatch = useDispatch();

    function input(e){
        setValue({...value,[e.target.name]:e.target.value});
    }
    function file(e){
        setValue({...value,[e.target.name]:e.target.files[0]});
    }

    function getCategory(e){
        fetch(`${url}/category/${e.target.value}`,{credentials: 'include'}).then((data)=>data.json()).then((data)=>{
            setSubCategory(data.data[0].subCategorys);
        })    
    }


    function send(){
        if(value.name === ''){
            setAlert((alert)=>[...alert, <Alert2 key={ Date.now()} title="Faild !" message="Name field is required." />]);
        }

        if(value.subCategory === ''){
            setAlert((alert)=>[...alert, <Alert2 key={ Date.now()} title="Faild !" message="Please select sub category." />]);
        }

        if(value.name !== '' && value.subCategory !== ''){

            const formData = new FormData();

            formData.append('name',value.name);
            formData.append('description',value.description);
            formData.append('salePrice',value.salePrice);
            formData.append('purchasePrice',value.purchasePrice);
            formData.append('subCategoryId',value.subCategory);
            formData.append('photo',value.file);

            fetch(`${url}/product`,{
                method:"POST",
                body: formData,
                credentials: 'include'
            }).then((data)=>data.json()).then((data)=>{
                if(data.status === true){
                    dispatch(ADD_PRODUCT(data.data));
                    setAlert((alert)=>[...alert, <Alert1 key={ Date.now()} title="Successful" message={data.message} />]);
                    setValue({name:'', description:'', salePrice: 0, purchasePrice: 0, subCategory:'', file:{}});
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

            <Form1 title="Add Product" >
                <Input1 type="text" onChange={input} name="name" value={value.name} placeholder="Enter product name..." lavel="Product name:" id="input1" />
                <Textarea onChange={input} name="description" value={value.description}  placeholder="Enter product description..." lavel=" Product description:" id="input2" />
                <Input1 type="number" onChange={input} name="purchasePrice" value={value.purchasePrice} placeholder="Enter purchase price..." lavel="Purchase price:" id="input6" />
                <Input1 type="number" onChange={input} name="salePrice" value={value.salePrice} placeholder="Enter sale price..." lavel="Sale price:" id="input5" />
                <Select onChange={getCategory}  name="category" value={value.category}  id="input4"  lavel="Select category :">
                <Option value="" disable={true}>Select a category</Option>
                    {
                        category.map((data, index)=>{
                            return(
                                <Option key={index} value={data._id}>{data.name}</Option>
                            )
                        })
                    }
                    
                </Select>
                <Select onChange={input}  name="subCategory" value={value.subCategory}  id="input4"  lavel="Select sub category :">

                <Option value="" disable={true}>Select a sub category</Option>
                    {
                        subCategory.map((data, index)=>{
                            return(
                                <Option key={index} value={data._id}>{data.name}</Option>
                            )
                        })
                    }
                    
                </Select>

                <Input1 onChange={file} name="file" type="file" lavel="Product photo:" id="input3" />
                <Button1 click={send} name="Save" />
            </Form1> 
        </Layout>
    )
}

export default AddProduct;