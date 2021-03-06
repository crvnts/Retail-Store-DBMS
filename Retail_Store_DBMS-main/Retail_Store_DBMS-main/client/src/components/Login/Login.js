import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import $ from 'jquery';
import 'animate.css';
import '../../BootstrapCSS/bootstrap.min.css';

import './Login.css';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const history = useHistory();

    useEffect( () => {
        $(window).on('load', function(){
            setTimeout(function() {
                $('.login-form').fadeIn('slow');
            }, 750);
        });

        return () => {
            console.log("unmounted");
        };
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        setError(false);
        fetch("/login", {
            method:"POST",
            cache: "no-cache",
            headers:{
                "Content-type":"application/json",
            },
            body:JSON.stringify({username: username, password: password})
        }).then(res => res.json()).then(res => {
            if(res['alert'] !== 'error'){
                history.push("/main");
            } else{
                setError(true);
            }
        });
    };


    return (
        <div className="login-body">
            <LoadingScreen/>
            <div className="login-form" style={{display: "none"}}>
                <form onSubmit={handleSubmit} className="container" action="/main" method="get">
                    <h1>Login</h1>
                        
                    <div className="form-group">
                        <label htmlFor="username"><b>Username</b></label>
                        <input type="text" placeholder="Enter Username" name="username" className="form-control" onChange={ (event) => setUsername(event.target.value) } required autoFocus/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="password" className="form-control" onChange={ (event) => setPassword(event.target.value) } required/>
                    </div>

                    {
                        (username && password) ? (
                            <button className="btn btn-primary btn-rounded" type="submit">Login</button>
                        ) : (
                            <button className="btn btn-primary btn-rounded" type="submit" disabled>Login</button>
                        )
                    }

                    <hr/>
                    <a className="btn btn-primary btn-rounded" type="submit" href="/registration">Register here!</a>
                    {
                        (error) ? (
                            <p style={{color:"red"}}>Incorrect username and/or password. Please try again</p>
                        ) : null
                    }
                </form>
            </div>
        </div>

    );
};

export default Login;