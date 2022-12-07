import axios from 'axios';
import React, { useState } from 'react';
import Style from './Login.module.css';

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
        axios.post(`${url}/user/register`,data)
        .then((res)=>{
            alert(`Registration Successfull`)
        })
        .catch((err)=>{
            alert("Something went wrong , try again")
        })
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
    </div>
  )
}

export default Register;