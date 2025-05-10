import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { listarPublicaciones } from '../../services/api';
import { Navbar } from '../navbar/Navbar';
import AddComentariosForm from '../comentarios/AddComentariosForm';
import './PublicacionesDetalle.css';  // Asegúrate de importar el archivo CSS

export const PublicacionDetalle = () => {
  const { id } = useParams(); // Obtiene la ID de la URL
  const [publicacion, setPublicacion] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleCommentAdded = async () => {
    const response = await listarPublicaciones();
    const actualizada = response.data.publicaciones.find(pub => pub._id === id);
    setPublicacion(actualizada); // Actualiza la publicación con los nuevos comentarios
  };

  useEffect(() => {
    const fetchPublicacion = async () => {
      try {
        const response = await listarPublicaciones(); // Obtiene todas las publicaciones
        if (!response.error) {
          const publicacionEncontrada = response.data.publicaciones.find(
            (pub) => pub._id === id
          );
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
        <p>Fecha: {new Date(publicacion.fecha).toLocaleString()}</p>

        <h3>Comentarios:</h3>
        <button onClick={() => setMostrarFormulario(true)}>Agregar comentario</button>

        {mostrarFormulario && (
          <AddComentariosForm
            publicacionId={id}
            onClose={() => setMostrarFormulario(false)}
            onSubmit={handleCommentAdded}
          />
        )}

        <ul>
          {publicacion.comentarios.length === 0 ? (
            <li>No hay comentarios aún.</li>
          ) : (
            publicacion.comentarios
              .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)) // Ordenar por fecha (más reciente primero)
              .map((comentario) => (
                <li key={comentario._id} className="comentario-card">
                  <div className="comentario-content">
                    <strong>{comentario.nombre}</strong>: {comentario.textoC}
                    <br />
                    <small>{new Date(comentario.fecha).toLocaleString()}</small>
                  </div>
                </li>
              ))
          )}
        </ul>
      </div>
    </>
  );
};

export default PublicacionDetalle;