import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Input1, Option, Select } from '../../components/Input';
import { Button1 } from '../../components/Button';
import { Form1 } from '../../components/Form';
import url from '../../url'
import { Alert1, Alert2, AlertContainer } from '../../components/Alert';
import { ADD_PURCHASE } from '../../store/actions/purchase';
import { useDispatch, useSelector } from 'react-redux';


function PurchaseProduct(){

    const category = useSelector((state)=>state.category);
    const supplier = useSelector((state)=>state.supplier);
    const [subCategory, setSubCategory] = useState([]);
    const [product, setProduct] = useState([]);
    const [pd, setPd] = useState({});
    const [alert, setAlert] = useState([]);
    const [value,setValue] = useState({supplier:'', product:'', payed: 0, quantity: 1});


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
        if(value.supplier === ''){
            setAlert((alert)=>[...alert, <Alert2 key={ Date.now()} title="Faild !" message="Supplier is required." />]);
        }

        if(value.product === ''){
            setAlert((alert)=>[...alert, <Alert2 key={ Date.now()} title="Faild !" message="Product is required." />]);
        }

        if(value.supplier !== '' && value.product !== ''){


            fetch(`${url}/purchase`,{
                method:"POST",
                credentials: 'include',
                body: JSON.stringify({productId:value.product, supplierId:value.supplier, payed:value.payed, quantity:value.quantity})
            }).then((data)=>data.json()).then((data)=>{
                if(data.status === true){
                    dispatch(ADD_PURCHASE(data.data));
                    setAlert((alert)=>[...alert, <Alert1 key={ Date.now()} title="Successful" message={data.message} />]);
                    setValue({supplier:'', product:'', payed: 0, quantity: 1});
                    setTimeout(()=>{
                        window.open(`/purchase/print/${data.data._id}`, "_blank");
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

            <Form1 title="Purchase Product" >

                <Select onChange={input}  name="supplier" value={value.supplier}  id="input1"  lavel="Select supplier :">
                    <Option value="" disable={true}>Select a supplier</Option>
                    {
                        supplier.map((data, index)=>{
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
                            <span><b>Purchase price:</b> {pd.purchasePrice} ৳</span>
                            <span><b>Quantity:</b> {value.quantity}</span>
                        </div>
                        <div className=" mt-3 flex items-center gap-2">
                            <span><b>Payable:</b> {pd.purchasePrice*value.quantity} ৳</span>
                            <span><b>Payed:</b> {value.payed} ৳</span>
                            <span><b>Due:</b> {pd.purchasePrice*value.quantity - value.payed} ৳</span>
                        </div>

                    </div>
                </div>:<></>
                }
                
                    
                <Input1 type="number" onChange={input} name="quantity" value={value.quantity} id="input5"  lavel="Product quantity:" />

                <Input1 type="number" onChange={input} name="payed" value={value.payed} id="input6"  lavel="Payed:" />

                <Button1 click={send} name="Save" />
            </Form1> 
        </Layout>
    )
}

export default PurchaseProduct;