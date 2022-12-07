import React, { useState } from 'react';
import Style from './Login.module.css';
import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

function Login() {

    const url= import.meta.env.VITE_APP_BACKEND_URL;
    const {isAuth,setIsAuth,user,setUser}= useContext(AppContext);
    const navigate= useNavigate();
    
    const [data, setData] = useState({
        email:'',
        password:''
    })


    const handleChange=(e)=>{
        const {name,value}= e.target;
        setData({
            ...data,
            [name]:value
        })
    }

    const handleSubmit=()=>{
        axios.post(`${url}/user/login`,data)
        .then((res)=>{
            console.log(res.data.token);
            if(res.data.token){
                setIsAuth(true);
                setUser(data.email);
                navigate("/")
            }else{
                alert("invalid creds")
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }


  return (
    <div className={Style.container}>
        <div>
            <h1>Login</h1>
            <input type="text" placeholder='email' autoFocus
            name='email'
            onChange={handleChange}
            />
            <br />
            <br />
            <input type="text" placeholder='password'
            name='password'
            onChange={handleChange}
            />
            <br />
            <br />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    </div>
  )
}

export default Login