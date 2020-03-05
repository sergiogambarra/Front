import React, { useState, useEffect } from 'react';
import { getCursos } from '../services/CursoService';

export default function ListaCursos() {
    const [cursos, setCursos] = useState([]);

    const fetchData = async () => {
        const result = await getCursos();
        setCursos(result);
    };

    useEffect(() => fetchData(), []);

    return(
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>    
                        <th scope="col">id</th>
                        <th scope="col">Curso</th>
                        <th scope="col">Disciplinas</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cursos
                        && cursos.map((curso) => (
                            <tr key={curso.id}>
                                <td>{curso.id}</td>
                                <td>{curso.nome}</td>
                                <td>
                                    <ul>
                                    {
                                        curso.disciplinas 
                                        && curso.disciplinas.map((d) => (
                                            <li>{d.nome}</li>
                                        ))
                                    }
                                    </ul>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};