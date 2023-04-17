import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import url from '../url';

import { ADD_ALL_SUB_CATEGORY } from '../store/actions/subCategory';
import { ADD_ALL_CATEGORY } from '../store/actions/category';
import { ADD_ALL_PRODUCT } from '../store/actions/product';
import { ADD_ALL_SUPPLIER } from '../store/actions/supplier';
import { ADD_ALL_CUSTOMER } from '../store/actions/customer';
import { ADD_ALL_PURCHASE } from '../store/actions/purchase';
import { ADD_ALL_SALE } from '../store/actions/sale';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';



function useFirstLoad(){
    const dispatch = useDispatch();
    const [cookies, setCookie, removeCookie] = useCookies(['auth']);


    useEffect(()=>{
		
		fetch(`${url}/user`,{credentials: 'include'}).then((data)=>data.json()).then((data)=>{
			if(data.login === false){
				removeCookie('auth',[{expires: Date.now()}]);
				<Navigate to="/logIn" />
			}
        });

      if(cookies.auth !== undefined){


        fetch(`${url}/category`,{credentials: 'include'}).then((data)=>data.json()).then((data)=>{
          if(data.status === true){
            dispatch( ADD_ALL_CATEGORY(data.data));
          }
  
        });

        fetch(`${url}/subCategory`,{credentials: 'include'}).then((data)=>data.json()).then((data)=>{
          if(data.status === true){
            dispatch( ADD_ALL_SUB_CATEGORY(data.data));
          }
  
        });

        fetch(`${url}/product`,{credentials: 'include'}).then((data)=>data.json()).then((data)=>{
          if(data.status === true){
            dispatch( ADD_ALL_PRODUCT(data.data));
          }
  
        });

        fetch(`${url}/supplier`,{credentials: 'include'}).then((data)=>data.json()).then((data)=>{
          if(data.status === true){
            dispatch( ADD_ALL_SUPPLIER(data.data));
          }
  
        });

        fetch(`${url}/customer`,{credentials: 'include'}).then((data)=>data.json()).then((data)=>{
          if(data.status === true){
            dispatch( ADD_ALL_CUSTOMER(data.data));
          }
  
        });

        fetch(`${url}/purchase`,{credentials: 'include'}).then((data)=>data.json()).then((data)=>{
          if(data.status === true){
            dispatch( ADD_ALL_PURCHASE(data.data));
          }
  
        });

        fetch(`${url}/sale`,{credentials: 'include'}).then((data)=>data.json()).then((data)=>{
          if(data.status === true){
            dispatch( ADD_ALL_SALE(data.data));
          }
  
        });
      }
   

    },[cookies, dispatch])
}

export default useFirstLoad;