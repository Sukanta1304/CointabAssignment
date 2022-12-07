import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Login from './Login';
import Style from './Home.module.css';

function Home() {
  const {isAuth,setIsAuth,user,setUser}= useContext(AppContext);
  const navigate= useNavigate();
  const handleLogout=()=>{
      setIsAuth(false);
      setUser('');
      navigate("/login");
  }


  return (
    <div>
    {isAuth? 
    <div className={Style.container}>
      <h1>Home</h1>
      <h3>User Email: {user}</h3>
      <button onClick={handleLogout}>Logout</button>
    </div>
    :
    <Login/>
  
  
    }
    </div>
  )
}

export default Home