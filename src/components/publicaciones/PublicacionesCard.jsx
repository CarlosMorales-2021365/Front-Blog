import React from "react";
import PropTypes from 'prop-types';

const PublicacionesCard = ({
    id,
    titulo,
    curso,
    texto,
    fecha,
    estado
}) => {
    return (
        <div className={`publicacion-card ${ estado ? '' : 'inactive'}`}>
            <div className="publicacion-details">
                <h3 className="publicacion-titulo">Titulo: {titulo}</h3>
                <p className="publicaion-fecha">{fecha.toLocaleDateString()}</p>
                <p className="publicacion-curso">{curso}</p>

            </div>
        </div>
    );
};

PublicacionesCard.propTypes = {
    id: PropTypes.string.isRequired,
    titulo: PropTypes.string.isRequired,
    curso: PropTypes.oneOf(['TALLER', 'PREACTICA_SUPERVISADA', 'TECNOLOGIA']).isRequired,
    texto: PropTypes.string.isRequired,
    fecha: PropTypes.instanceOf(Date).isRequired,
    estado: PropTypes.bool.isRequired
};

export default PublicacionesCard