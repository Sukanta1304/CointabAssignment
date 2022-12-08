import React, { useState } from 'react';
import Style from './Login.module.css';
import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                toast.success("Login Successfull")
                setIsAuth(true);
                setUser(data.email);
                setTimeout(()=>{
                    navigate("/")
                },1000)
        })
        .catch((err)=>{
            console.log(err);
            const totalattempt= 5;
            const attempt= err.response.data.attemp;
            const remainig= totalattempt-attempt;
            const msg= err.response.data.messg;
            console.log(totalattempt,attempt,remainig,msg);
            const alert= err.response.data.attemp?`${msg} .You have ${remainig} attempt left `: err.response.data
            console.log(alert)
            toast.error(alert)
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
        <ToastContainer />
    </div>
  )
}

export default Login