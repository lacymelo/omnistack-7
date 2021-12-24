import React from "react";
import { Link } from "react-router-dom";
//estilo
import './Header.css';
//logos
import logo from '../assets/logo.svg'; 
import camera from '../assets/camera.svg'; 

export default function components () {
    return (
       <header id="main-header">
           <div className="header-content">
               <Link to="/" className="logo">
                    <img src={logo} alt="InstaRocket" />
               </Link>
               <Link to="/new" className="new">
                    <img src={camera} alt="Enviar Publicação" />
               </Link>
           </div>
       </header>
    );
}