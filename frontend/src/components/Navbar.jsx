import React from 'react';
import Style from './Navbar.module.css';
import {Link} from "react-router-dom";

function Navbar() {
  return (
    <div className={Style.container}>
        <div>
        <Link to="/"><h3>Home</h3></Link>
        </div>
        <div>
          <Link to="/register"><h3>Register</h3></Link>
          <Link to="/login"><h3>Login</h3></Link>
        </div>
    </div>
  )
}

export default Navbar