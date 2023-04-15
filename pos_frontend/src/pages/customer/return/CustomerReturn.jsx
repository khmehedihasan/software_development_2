import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from '../../../components/Layout'
import url from "../../../url";
import { Input1} from '../../../components/Input';
import { Button1 } from '../../../components/Button';
import { Form1 } from '../../../components/Form';
import { Alert1, Alert2, AlertContainer } from '../../../components/Alert';

function CustomerReturn(){

    const [product, setProduct] = useState(0);
    const [value,setValue] = useState(0);
    const [alert, setAlert] = useState([]);
    const {id} = useParams();

    useEffect(()=>{
        fetch(`${url}/sale/${id}`,{credentials: 'include'}).then((data)=>data.json()).then((data)=>{
            if(data.status === true){
                setProduct(data.data.product);
            }
        });

    },[id]);

    function input(e){
        setValue(e.target.value);
    }

    function send(){
        fetch(`${url}/return/customer/${id}`,{method:'POST',credentials: 'include',body: JSON.stringify({quantity:value})}).then((data)=>data.json()).then((data)=>{
            if(data.status === true){
                setAlert((alert)=>[...alert, <Alert1 key={ Date.now()} title="Successful" message={data.message} />]);
                setTimeout(()=>{
                    window.open(`/customer/return/print/${data.data._id}`, "_blank");
                },8000)
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

            <Form1 title="Return product" >

                <div className=" flex items-center pb-6">
                    <img src={product.img} alt="" className=" w-20 md:w-36 m-1 xl:m-3" />
                    <div className=" flex flex-col text-sm md:text-base xl:text-xl">
                        <div className="flex items-center gap-2">
                            <span><b>Sale price:</b> {product.salePrice}  ৳</span>
                            <span><b>Sale quantity:</b> {product.saleQuantity} </span>
                        </div>
                        <div className=" mt-3 flex items-center gap-2">
                            <span><b>In stock:</b> {product.inStock} </span>
                        </div>

                    </div>
                </div>
                
                <div className=" flex items-center pb-6">
                    <div className=" flex flex-col text-sm md:text-base xl:text-xl">
                        <div className="flex items-center gap-2">
                            <span><b>In stock:</b> {product.inStock} </span>
                            <span><b>Return:</b> {value} </span>
                        </div>
                        <div className=" mt-3 flex items-center gap-2">
                            <span><b>Stock now:</b> {parseInt(product.inStock) + parseInt(value) } </span>
                            <span><b>Payed:</b> {product.salePrice * value } ৳</span>
                        </div>

                    </div>
                </div>
                
            
                <Input1 type="number" onChange={input} name="quantity" value={value} id="input1"  lavel="Product quantity:" />

                <Button1 click={send} name="Save" />
            </Form1> 
        </Layout>
    );
}

export default CustomerReturn;