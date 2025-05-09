import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { listarPublicaciones } from '../../services/api';
import { Navbar } from '../navbar/Navbar';

export const PublicacionDetalle = () => {
  const { id } = useParams(); // Obtiene la ID de la URL
  const [publicacion, setPublicacion] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchPublicacion = async () => {
      try {
        const response = await listarPublicaciones(); // Obtiene todas las publicaciones
        if (!response.error) {
          const publicacionEncontrada = response.data.publicaciones.find(
            (pub) => pub._id === id
          ); // Busca la publicación por ID
          if (publicacionEncontrada) {
            setPublicacion(publicacionEncontrada);
          } else {
            setErrorMessage("Publicación no encontrada.");
          }
        } else {
          setErrorMessage("Error al cargar la publicación.");
        }
      } catch (error) {
        setErrorMessage("Error al conectar con el servidor.");
      }
    };

    fetchPublicacion();
  }, [id]);

  if (errorMessage) {
    return (
      <>
        <Navbar />
        <div className="error-message">{errorMessage}</div>
      </>
    );
  }

  if (!publicacion) {
    return (
      <>
        <Navbar />
        <div>Cargando publicación...</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="detalle-container">
        <h1>{publicacion.titulo}</h1>
        <p>Curso: {publicacion.curso}</p>
        <p>Texto: {publicacion.texto}</p>
        <p>Fecha: {new Date(publicacion.fecha).toLocaleDateString()}</p>
        <p>Estado: {publicacion.estado ? "Activo" : "Inactivo"}</p>
        <h3>Comentarios:</h3>
        <ul>
          {publicacion.comentarios.map((comentario) => (
            <li key={comentario}>{comentario}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PublicacionDetalle;