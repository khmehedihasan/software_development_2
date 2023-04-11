import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert1, Alert2, AlertContainer } from '../components/Alert';
import url from '../url';

function LogIn(){
    const [email, setEmail] = useState('demo@gmail.com');
    const [password, setPassword] = useState('1234');
    const [alert, setAlert] = useState([]);
    const navigate = useNavigate()


    function send(){
        if(email === ''){
            setAlert((alert)=>[...alert, <Alert2 key={ Date.now()} title="Faild!" message='Email is required.' />]);
        }
        
        if( password === ''){
            setAlert((alert)=>[...alert, <Alert2 key={ Date.now()} title="Faild!" message='password is required.' />]);
        }

        if(email !=='' & password !== ''){
            fetch(`${url}/user/login`,{
                method:'POST', 
                body:JSON.stringify({email,password}),
                credentials: 'include',
				mode:'cors'

            }).then((data)=>data.json(data)).then((data)=>{

                if(data.status === true){
                    setAlert((alert)=>[...alert, <Alert1 key={ Date.now()} title="Successful" message={data.message} />]);
					

                    document.cookie = `auth = kfjk5kjksdwk23klskj90fj234i209sfj9u4iwej ; max-age=3400; path=/`;
					
                    setTimeout(()=>{
                        navigate('/dashboard');
                    },8000)
                }else{
                    setAlert((alert)=>[...alert, <Alert2 key={ Date.now()} title="Faild!" message={data.message} />]);
                }
            })
        }
       
    }
    
    return(
        <>
            <div className=" relative w-screen h-screen bg-login bg-center bg-no-repeat bg-cover contrast-150 shadow-2xl flex justify-center items-center">
                <div className= " absolute top-10 right-2">
                    <AlertContainer>
                        {alert}
                    </AlertContainer>
                </div>

                <div className=" lgin w-11/12 md:w-3/5 lg:w-2/4 xl:w-1/3 h-96 mx-auto ">
                    <div >
                        <h1 className=" text-center text-cyan-300 text-3xl pb-3 border-b border-cyan-400"> My POS</h1>
                    </div>
                    <form className=" flex flex-col justify-center p-3 pt-10 gap-y-2" >
                        <label className=" text-cyan-300" htmlFor="email">Email:</label>
                        <input onChange={(e)=> setEmail(e.target.value)} className="bg-sky-500/[.4] p-1 rounded-sm text-slate-300 outline-none border-2 border-transparent focus:border-cyan-400" type="email" name="email" value={email} id="email"  />
                        <label className=" text-cyan-300" htmlFor="password" >Password:</label>
                        <input onChange={(e)=> setPassword(e.target.value)} className="bg-sky-500/[.4] p-1 rounded-sm text-slate-300 outline-none border-2 border-transparent focus:border-cyan-400"  type="password" name="password" value={password}
                        id="password" />
                        <input onClick={send} className=" w-20 p-1 rounded-sm bg-cyan-400 hover:bg-cyan-500" type="button" value="Log In" />
                    </form>
                </div>
            </div>
        </>
    )
}

export default LogIn;