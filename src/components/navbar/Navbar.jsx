import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'
import logo from "../../assets/home.png"

export const Navbar = () => {
  return (
    <nav className='navbar'>
    <div className='navbar-content'>
        <span className='logo'>
            <h1>Blog de aprendizaje Carlos Morales</h1>
        </span>
        <Link to="/">
          <img src={logo} alt="home" />
        </Link>
    </div>
    </nav>
  )
}
