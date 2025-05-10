import React, { useEffect, useState } from 'react'
import PublicacionesCard from '../../components/publicaciones/PublicacionesCard'
import { listarPublicaciones } from '../../services/api'
import { Navbar } from '../../components/navbar/Navbar'
import { Link } from 'react-router-dom'
import "./TecnologiaPage.css"

export const TecnologiaPage = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(()=> {
        const fetchPublicaciones = async () => {
          const response = await listarPublicaciones();
          if(!response.error){
            if(response.data.publicaciones.length === 0){
            setErrorMessage("Sin publicaciones en la base de datos")
            } else {
              setPublicaciones(response.data.publicaciones);
            }
          }else {
            setErrorMessage("Error al cargar las publicaciones")
          }
        };
        fetchPublicaciones();
      }, []);

      const filteredPublicaciones = publicaciones
    .filter((publicacion) => publicacion.estado) 
    .filter((publicacion) => publicacion.curso === "TECNOLOGIA")
    .filter((publicacion) =>
      publicacion.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );


  return (
    <>
         <Navbar />
         <div className="taller-page-container">
           <div className="taller-header">
             <h1 className="taller-title">Publicaciones de Taller</h1>
           </div>
           <div className="publicaciones-grid">
             {errorMessage ? (
               <p className="error-message">{errorMessage}</p>
             ) : (
               filteredPublicaciones.map((publicacion) => (
                 <Link className='selecionar-publicacion' to={`/publicacion/${publicacion._id}`} key={publicacion._id}>
                 <PublicacionesCard
                   key={publicacion._id}
                   id={publicacion._id}
                   titulo={publicacion.titulo}
                   curso={publicacion.curso}
                   texto={publicacion.texto}
                   fecha={new Date(publicacion.fecha)}
                   estado={publicacion.estado}
                 />
                 </Link>
               ))
             )}
           </div>
         </div>
       </>
     );
}

export default TecnologiaPage;
