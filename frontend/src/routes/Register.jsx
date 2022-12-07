import React, { useState } from 'react';
import Style from './Login.module.css';

function Register() {
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
        console.log(data);
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