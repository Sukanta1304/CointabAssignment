import axios from 'axios';
import React, { useState } from 'react';
import Style from './Login.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    const url= import.meta.env.VITE_APP_BACKEND_URL;
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
        if(data.email=="" || data.password==""){
            toast.error(`Please Provide all Fields Correctly`)
        }else{
            axios.post(`${url}/user/register`,data)
            .then((res)=>{
                console.log(res);
                toast.success(`Registration Successfull`)
            })
            .catch((err)=>{
                console.log(err);
                toast.err(`Something went wrong , try again`)
            })
        }   
    }


  return (
    <div className={Style.container}>
        <div>
            <h1>Register</h1>
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

export default Register;