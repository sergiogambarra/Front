import React from 'react';

const inputStyle = {
    margin: "0px 0px 10px 40%",
    width: "400px",
    padding: "10px",
    fontFamily: "Arial"
};

export default function DisciplinaTabela({ disciplinas }) {
    return(
        <div style={inputStyle}>
            <table class="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>      
                        <th>cargaHoraria</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        disciplinas
                        && disciplinas.map(({ id, nome, cargaHoraria }) => (
                            <tr key={id}> 
                                <td>{id}</td>
                                <td>{nome}</td>  
                                <td>{cargaHoraria}</td>   
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};
