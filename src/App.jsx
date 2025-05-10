import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/homePage/Home'
import { TallerPage } from './pages/taller/TallerPage'
import { TecnologiaPage } from './pages/Tecnologia/TecnologiaPage'
import { PracticaPage } from './pages/PracticaSupervisada/PracticaPage'
import { PublicacionDetalle } from './components/publicaciones/PublicacionesDetalle'

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Taller" element={<TallerPage />} />
        <Route path="/Tecnologia" element={<TecnologiaPage />} />
        <Route path="/Practica" element={<PracticaPage />} />
        <Route path="/publicacion/:id" element={<PublicacionDetalle />} /> 
      </Routes>
    </Router>
  )
}

