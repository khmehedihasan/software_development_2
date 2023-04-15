import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Input1, Option, Select } from '../../components/Input';
import { Button1 } from '../../components/Button';
import { Form1 } from '../../components/Form';
import url from '../../url'
import { Alert1, Alert2, AlertContainer } from '../../components/Alert';
import { ADD_SALE } from '../../store/actions/sale';
import { useDispatch, useSelector } from 'react-redux';


function SaleProduct(){

    const category = useSelector((state)=>state.category);
    const customer = useSelector((state)=>state.customer);
    const [subCategory, setSubCategory] = useState([]);
    const [product, setProduct] = useState([]);
    const [pd, setPd] = useState({});
    const [alert, setAlert] = useState([]);
    const [value,setValue] = useState({customer:'', product:'', received: 0, quantity: 1});


    const dispatch = useDispatch();

    function input(e){
        setValue({...value,[e.target.name]:e.target.value});
    }

    function getCategory(e){
        fetch(`${url}/category/${e.target.value}`,{credentials: 'include'}).then((data)=>data.json()).then((data)=>{
            setSubCategory(data.data[0].subCategorys);
        })    
    }

    function getSubCategory(e){
        fetch(`${url}/subCategory/${e.target.value}`,{credentials: 'include'}).then((data)=>data.json()).then((data)=>{

            setProduct(data.data.products);
            setPd(data.data.products);
        })    
    }

    function getPd(e){

        fetch(`${url}/product/${e.target.value}`,{credentials: 'include'}).then((data)=>data.json()).then((data)=>{
            setPd(data.data);
        })    
    }


    function send(){
        if(value.customer === ''){
            setAlert((alert)=>[...alert, <Alert2 key={ Date.now()} title="Faild !" message="customer is required." />]);
        }

        if(value.product === ''){
            setAlert((alert)=>[...alert, <Alert2 key={ Date.now()} title="Faild !" message="Product is required." />]);
        }

        if(value.customer !== '' && value.product !== ''){


            fetch(`${url}/sale`,{
                method:"POST",
                credentials: 'include',
                body: JSON.stringify({productId:value.product, customerId:value.customer, received:value.received, quantity:value.quantity})
            }).then((data)=>data.json()).then((data)=>{
                if(data.status === true){
                    dispatch(ADD_SALE(data.data));
                    setAlert((alert)=>[...alert, <Alert1 key={ Date.now()} title="Successful" message={data.message} />]);
                    setValue({customer:'', product:'', received: 0, quantity: 1});
                    setTimeout(()=>{
                        window.open(`/sale/print/${data.data._id}`, "_blank");
                    },8000)
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

            <Form1 title="Sale Product" >

                <Select onChange={input}  name="customer" value={value.customer}  id="input1"  lavel="Select customer :">
                    <Option value="" disable={true}>Select a customer</Option>
                    {
                        customer.map((data, index)=>{
                            return(
                                <Option key={index} value={data._id}>{data.name}</Option>
                            )
                        })
                    }
                    
                </Select>

                <Select onChange={getCategory}  name="category" value={value.category}  id="input2"  lavel="Select category :">
                    <Option value="" disable={true}>Select a category</Option>
                    {
                        category.map((data, index)=>{
                            return(
                                <Option key={index} value={data._id}>{data.name}</Option>
                            )
                        })
                    }
                    
                </Select>
                <Select  onChange={getSubCategory}  name="subCategory" value={value.subCategory}  id="input3"  lavel="Select sub category :">

                    <Option value="" disable={true}>Select a sub category</Option>
                    {
                        subCategory.map((data, index)=>{
                            return(
                                <Option key={index} value={data._id}>{data.name}</Option>
                            )
                        })
                    }
                    
                </Select>
                <Select onChange={(e)=>{input(e); getPd(e); }}  name="product" value={value.product}  id="input4"  lavel="Select product :">

                    <Option value="" disable={true}>Select a product</Option>
                    {
                        product.map((data, index)=>{
                            return(
                                <Option key={index} value={data._id}>{data.name}</Option>
                            )
                        })
                    }
                    
                </Select>
                {
                    (value.product !== '')?
                    <div className=" flex items-center">
                    <img src={pd.img} alt="" className=" w-20 md:w-36 m-1 xl:m-3" />
                    <div className=" flex flex-col text-sm md:text-base xl:text-xl">
                        <div className="flex items-center gap-2">
                            <span><b>Sale price:</b> {pd.salePrice} ৳</span>
                            <span><b>In stock:</b> {pd.inStock}</span>
                            <span><b>Quantity:</b> {value.quantity}</span>
                        </div>
                        <div className=" mt-3 flex items-center gap-2">
                            <span><b>Receivable:</b> {pd.salePrice*value.quantity} ৳</span>
                            <span><b>Received:</b> {value.received} ৳</span>
                            <span><b>Due:</b> {pd.salePrice*value.quantity - value.received} ৳</span>
                        </div>

                    </div>
                </div>:<></>
                }
                
                    
                <Input1 type="number" onChange={input} name="quantity" value={value.quantity} id="input5"  lavel="Product quantity:" />

                <Input1 type="number" onChange={input} name="received" value={value.received} id="input6"  lavel="Received:" />

                <Button1 click={send} name="Save" />
            </Form1> 
        </Layout>
    )
}

export default SaleProduct;