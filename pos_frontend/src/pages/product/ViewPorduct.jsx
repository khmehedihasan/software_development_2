import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {BannerG, BannerR, BannerF, BannerT, BannerC, BannerS} from "../../components/Banner";
import Layout from '../../components/Layout'
import url from "../../url";

function ViewProduct(){

    const [product, setProduct] = useState({name:'',img:'',description:'',purchasePrice:'', salePrice:'', purchaseQuantity:'', saleQuantity:'', inStock:'', subCategory:{name:''}});
    const {id} = useParams();

    useEffect(()=>{

        fetch(`${url}/product/${id}`,{credentials: 'include'}).then((data)=>data.json()).then((data)=>{
            setProduct(data.data)
        });

    },[id]);

    return(
        <Layout>
            <div className=" bg-white drop-shadow-md w-11/12 mx-auto mt-4 rounded-sm  h-max p-4">
                <div className=" h-max mb-4 flex flex-wrap gap-3 justify-center">
                    <Link className=" px-4 py-1 bg-blue-500 rounded-3xl text-white font-bold border-2 border-blue-500 hover:bg-white hover:text-blue-500" to={"/product/edit/"+product._id}><i className="fa-solid fa-pen-to-square"></i> Edit</Link>
                    <Link className=" px-4 py-1 bg-orange-600 rounded-3xl text-white font-bold border-2 border-orange-500 hover:bg-white hover:text-orange-500" to="/purchase/add"><i className="fa-solid fa-cart-plus"></i> Purchase</Link>
                    <Link className=" px-4 py-1 bg-green-500 rounded-3xl text-white font-bold border-2 border-green-500 hover:bg-white hover:text-green-500" to="/sale/add"><i className="fa-solid fa-cart-shopping"></i> Sale</Link>
                </div>
                <div className=" rounded-md bg-gradient-to-r from-cyan-200 to-cyan-400 m-1 flex flex-col md:flex-row">
                    <img src={product.img} alt=" " className=" w-full md:w-1/3 rounded-tr-md rounded-tl-md md:rounded-bl-md md:rounded-tr-none" />
                    <div className="p-2 text-cyan-700">
                        <h1><span className=" font-bold">Name: </span>{product.name}</h1>
                        <h1><span className=" font-bold">Sub category: </span>{product.subCategory.name}</h1>
                        <p className=" text-justify"><span className=" font-bold">Description: </span>{product.description}</p>
                    </div>
                </div>
                <div className=" flex flex-col gap-4 mt-4 md:flex-row md:flex-wrap flex-grow">
                    <BannerF  name="Purchase price:" >{product.purchasePrice} ৳</BannerF>
                    <BannerT  name="Sale price:" >{product.salePrice} ৳</BannerT>
                    <BannerC  name="Purchase quantity:" >{product.purchaseQuantity}</BannerC>
                    <BannerS  name="Sale quantity:" >{product.saleQuantity}</BannerS>
                    {
                        (product.inStock  < 5)?<BannerR  name="In stock:" >{product.inStock}</BannerR>:<BannerG  name="In stock:" color="green">{product.inStock}</BannerG>
                    }
                    
                </div>
            </div>
        </Layout>
    );
}

export default ViewProduct;