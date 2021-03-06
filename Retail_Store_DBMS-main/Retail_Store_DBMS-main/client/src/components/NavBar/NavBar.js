import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import '../../BootstrapCSS/bootstrap.min.css'; 

import './NavBar.css';

const NavBar = ({userType}) => {
    const handleLogout = (e) => {
        fetch("/logout", {
            method:"GET",
            cache: "no-cache",
            headers:{
                "Content-type":"application/json",
            },
        })
    };



    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark navbar-fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="/main">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Ast-logo-rgb.png" height="50" alt="" loading="lazy"/>
                </a>
                <a className="navbar-brand" href="/main">HOME</a>

                <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {
                        (userType === 'admin') ? (
                                <li className="nav-item">
                                    <a className="nav-link button-primary" href="/products">Add Products</a>
                                </li>
                        ) : null
                    }
                </ul>
                    <div className="d-flex align-items-center">
                        <a href="/orders" type="button" className="btn btn-secondary me-3">Orders</a>
                        {
                            (userType !== 'admin') ? (
                                <a href="/cart" type="button" className="btn btn-secondary me-3">Cart</a>
                            ) : null
                        }
                        <a href="/" onClick={handleLogout} type="button" className="btn btn-primary me-3">Logout</a>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;
