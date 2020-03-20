import React, { Component } from 'react';
import SACEInput from '../../components/inputs/SACEInput';
import { Form, Button, } from 'react-bootstrap';
import axios from 'axios';
import { Link } from "react-router-dom";


export default class CadastroCursos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cursos: [
                this.state = {
                    nome: "",
                    cargaHoraria: "",
                    id: "",
                    guardaNome: ""
                }
            ]

        }
    }
    listarCursos() {
        axios.get(`/api/cursos/`).then((retorno) => {
            this.setState({
                cursos: retorno.data
            })
            this.limpar()

        });
    }
    inserirCursos() {
        axios.post("/api/cursos/", {
            nome: this.state.nome
        }).then(() => {
            this.listarCursos()
        })
    }
    deletarCurso(e) {
        axios.delete(`/api/cursos/${e}`).then(() => {
        }).then(() => {
            this.listarCursos()
        })
    }
    editarCurso(e) {

        axios.put(`/api/cursos/${e}`, {
            nome: this.state.nome
        }).then(() => {
            this.listarCursos()
        })
    }
    pegaNome() {

    }
    componentDidMount() {
        this.listarCursos()
    }
    limpar() {
        this.setState({
            nome: ""
        })

    }


    render() {

        return (
            <div>
                <br />
                <fieldset>

                    <SACEInput
                        label={'Nome do Curso'}
                        value={this.state.nome}
                        placeholder={'Preencha com o nome do curso que você deseja cadastrar'}
                        onChange={(e) =>
                            this.setState({
                                nome: e.target.value
                            })
                        }
                        onErrorMessage={'O nome curso é obrigatório ter mais de 3 caracteres.'}
                    />

                    <Form.Group className="d-flex justify-content-end">

                        <Button
                            variant="primary"
                            className="btn btn-primary m-1"
                            onClick={() => this.inserirCursos()}
                        >
                            Enviar
                </Button>
                        <Button
                            variant="danger"
                            className="btn btn-primary m-1"
                            onClick={() => this.limpar()}
                        >
                            Limpar
                </Button>
                    </Form.Group>
                </fieldset >
                <br />
                <br />

                <h2>Lista de Cursos cadastrados</h2>
                <table class="table">
                    <thead class="p-3 mb-2 bg-primary text-white">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Apagar</th>
                            <th scope="col">Editar</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.state.cursos &&
                            this.state.cursos.map((curso) =>

                                <tr>
                                    <td>{curso.id}</td>
                                    <Link to="/lista-disciplina"><td>{curso.nome}</td></Link>
                                    <td> {curso.nome == "" ? "" : <Button
                                        variant="primary"
                                        className="btn btn-danger m-2"
                                        onClick={(e) =>
                                            this.deletarCurso(curso.id)
                                        }
                                    > Deletar </Button>}
                                    </td>
                                    <td>{this.state.nome == "" ? <Button type="button" class="btn btn-secondary btn-lg" disabled
                                    > Editar </Button> : <Button type="button" class="btn btn-secondary btn-lg" 
                                onClick={(e) => {this.editarCurso(curso.id, curso.nome)}
                                        }
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