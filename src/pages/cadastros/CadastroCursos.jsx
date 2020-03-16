import React, { Component } from 'react';
import SACEInput from '../../components/inputs/SACEInput';
import { Form, Button, } from 'react-bootstrap';
import axios from 'axios';


export default class CadastroCursos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cursos: [
                this.state = {
                    nome: "",
                    cargaHoraria: "",
                    id:""
                }
            ]

        }
    }
    listarCursos() {
        axios.get(`/api/cursos/`).then((retorno) => {
            this.setState({
                cursos: retorno.data
            })
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

    componentDidMount() {
        this.listarCursos()
    }
    render() {

        return (
            <div>
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
                    </Form.Group>
                </fieldset>
                <table class="table">
                    <thead class="p-3 mb-2 bg-primary text-white">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Apagar</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.state.cursos &&
                            this.state.cursos.map((curso) =>

                                <tr>
                                    <td>{curso.id}</td>
                                    <td>{curso.nome}</td>
                                    <td> {curso.nome == "" ? "" : <Button
                                        variant="primary"
                                        className="btn btn-danger m-1"
                                        onClick={(e) => 
                                            this.deletarCurso(curso.id)
                                        }
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