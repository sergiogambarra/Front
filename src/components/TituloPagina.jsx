import React from 'react';

function TituloPagina(props) {
    const { titulo } = props;

    return (
        <h3 className="text-center m-3">{titulo}</h3>
    );
}

export default TituloPagina;