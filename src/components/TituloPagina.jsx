import React from 'react';

function TituloPagina(props) {
    const { titulo } = props;

    return (
        <div>
             <br />
        <h3 className="text-left-2">{titulo}</h3>
        <br />
        </div>
    );
}

export default TituloPagina;