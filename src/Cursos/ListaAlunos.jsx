import React, { Component } from 'react'
import { get } from './../services/ServicoCrud'
import { Button } from 'react-bootstrap'
import { delAluno } from '../services/AlunoService';


class ListaAlunos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alunos: []
        }
    }

    listarAlunos() {
        get("usuarios/alunos/").then((retorno)=>{
            this.setState({  alunos:retorno }) })
    }
   
    componentDidMount(){
        this.listarAlunos()
    }
  
    render() {
        return (
            <div>
                <br />
                <h3>Alunos </h3>

                <table className="table">
                    <thead className="p-3 mb-2 bg-primary text-white">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Apagar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.alunos &&
                            this.state.alunos.map((aluno) =>

                                <tr key={aluno.id}>
                                    <td>{aluno.id}</td>
                                    <td>{aluno.perfil.nome}</td>
                                    <td> {aluno.perfil.nome === "" ? "" : <Button
                                        variant="primary"
                                        className="btn btn-danger m-1"
                                        onClick={(e) => delAluno("usuarios",aluno.id).then(()=>{ this.listarAlunos()})}
                                    > Deletar </Button>}
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>




            </div>
        );
    }
}

export default ListaAlunos;