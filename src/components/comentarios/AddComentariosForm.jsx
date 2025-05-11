import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { agregarComentatios } from '../../services/api';
import './AddComentariosForm.css';

const AddComentariosForm = ({
  publicacionId,
  onClose,
  onSubmit,
  initialData = null,
}) => {
  const [formData, setFormData] = useState({
    nombre: '',
    textoC: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'textoC' && value.length > 5000) return;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await agregarComentatios({
        ...formData,
        publicaciones: publicacionId,
      });

      if (response.success) {
        onSubmit();  
        onClose();  
      } else {
        console.error('Error al crear el comentario:', response.message);
      }
    } catch (err) {
      console.error('Error del servidor:', err);
    }
  };

  return (
    <div className="add-comment-form">
      <h3>Agregar Comentario</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <textarea
          name="textoC"
          placeholder="Escribe tu comentario..."
          value={formData.textoC}
          onChange={handleChange}
          required
        />
        <div className="button-group">
          <button type="submit">Enviar</button>
          <button type="button" onClick={onClose} className="cancel-button">
            Cancelar
          </button>
        </div>
        <div className="char-count">{formData.textoC.length} / 5000</div>
      </form>
    </div>
  );
};

AddComentariosForm.propTypes = {
  publicacionId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddComentariosForm;