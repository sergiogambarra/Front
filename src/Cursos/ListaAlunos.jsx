import React, { Component } from 'react'
import { get } from './../services/ServicoCrud'
import { Button } from 'react-bootstrap'
import { delAluno, putAluno } from '../services/AlunoService';

class ListaAlunos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alunos: []
        }
    }

    listarAlunos() {
        get("usuarios/alunos/").then((retorno) => {
            this.setState({ alunos: retorno })
        })
    }

    editar(e) {
        putAluno("usuarios",e,{
            nome:this.state.nome,
            matricula:this.state.matricula,
            email:this.state.email,
        })

    }

    componentDidMount() {
        this.listarAlunos()
    }

    render() {
        console.log(this.props)
        return (
            <div>
             <br /><br />
                <h3>Alunos </h3>
                <table className="table">
                    <thead className="p-3 mb-2 bg-primary text-white">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Matrícula</th>
                            <th scope="col">Email</th>
                            <th scope="col">Apagar</th>
                            <th scope="col">Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.alunos &&
                            this.state.alunos.map((aluno) =>

                                <tr key={aluno.id}>
                                    <td>{aluno.id}</td>
                                    <td>{aluno.perfil.nome}</td>
                                    <td>{aluno.perfil.matricula}</td>
                                    <td>{aluno.perfil.email}</td>
                                    <td> {aluno.perfil.nome === "" ? "" : <Button
                                        variant="primary"
                                        className="btn btn-danger m-1"
                                        onClick={(e) => delAluno("usuarios", aluno.id).then(() => { this.listarAlunos() })}
                                    > Deletar </Button>}
                                    </td>
                                    <td> {aluno.perfil.nome === "" ? "" : <Button
                                        variant="primary"
                                        className="btn btn-success m-1"
                                        onClick={() => this.editar(aluno.id)}
                                    > Editar </Button>}
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