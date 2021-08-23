import React from 'react';
import logo from './img/logo.svg';
import {auth,provider} from './Firebase.jsx';
import './Login.css';
import { Button } from '@material-ui/core';

function Login() {
    const signIn=()=>{
        auth.signInWithPopup(provider).catch((error)=>{
            alert(error.message);
        })
    }
    return (
        <div className="login">
            <div className="login__logo">
            <img src={logo} alt="logo" />
            </div>
            <Button onClick={signIn}>Sign In</Button>
        </div>
    )
}

export default Login
