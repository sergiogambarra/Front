import React, { Component } from 'react'
import axios from 'axios';
import { Button } from 'react-bootstrap';


class ListaAlunos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alunos: []
        }
    }

    listarAlunos() {
        axios.get("/api/usuarios/alunos/").then((retorno)=>{
            this.setState({
                alunos:retorno.data
            })
        })
    }
    componentDidMount(){
        this.listarAlunos()
    }
    delete(){
        axios.delete("")
    }

    render() {
        return (
            <div>
                <h3>Alunos </h3>

                <table class="table">
                    <thead class="p-3 mb-2 bg-primary text-white">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Apagar</th>


                        </tr>
                    </thead>
                    <tbody>
                        {this.state.alunos &&
                            this.state.alunos.map((aluno) =>

                                <tr>
                                    <td>{aluno.id}</td>
                                    <td>{aluno.nome}</td>
                                    <td> {aluno.nome === "" ? "" : <Button
                                        variant="primary"
                                        className="btn btn-danger m-1"
                                        onClick={(e) => this.apagar(aluno.id)}
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