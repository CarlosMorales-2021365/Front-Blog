import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css' // Importa el archivo CSS
import { Navbar } from '../../components/navbar/Navbar'

export const Home = () => {
  return (
    <>
    <Navbar/>
    <div className="home-container">
        <h1 className="home-title">Bienvenido a mi Blog</h1>
        <h2 className="home-subtitle">Ingresa alguna de las clases para poder ver las publicaciones</h2>
        <div className="home-buttons">
            <Link to="/Taller">
                <button className='home-buttons1 '>Taller</button>
            </Link>
            <Link to="/Tecnologia">
                <button className='home-buttons2'>Tecnología</button>
            </Link>
            <Link to="/Practica">
                <button className='home-buttons3'>Práctica Supervisada</button>
            </Link>
        </div>
    </div>
    </>
  )
}