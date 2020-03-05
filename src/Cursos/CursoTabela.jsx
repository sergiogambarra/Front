import React from 'react';
import { Button } from 'react-bootstrap';

export default function Cursotabela({ cursos, editar, apagar }) {
  return(
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col" className="w-15">Id</th>
            <th scope="col" className="w-55">Nome</th>      
            <th scope="col" className="w-15">Editar</th>
            <th scope="col" className="w-15">Excluir</th>
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
                  <Button
                    variant="primary" 
                    className="btn btn-primary m-1" 
                    onClick={() => editar(curso)}
                  >
                    Editar
                  </Button>
                </td>
                <td>
                  <Button 
                    variant="primary" 
                    className="btn btn-danger m-1" 
                    onClick={() => apagar(curso)}
                  >
                    Deletar
                  </Button>
                </td>  
              </tr> 
            ))
          }
        </tbody>
      </table>
    </div>
  );
}