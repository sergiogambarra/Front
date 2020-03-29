import React, { Component } from 'react';
import SACEInput from '../../components/inputs/SACEInput';
import { Form, Button, } from 'react-bootstrap';
import axios from 'axios';
import { Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert'


export default class CadastroCursos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cursos: [
                this.state = {
                    nome: "",
                    cargaHoraria: "",
                    id: "",
                    guarda: 0,
                    guardaId: "",
                    texto: true
                }
            ],
            modal: false

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
        if (this.state.nome === "" || typeof this.state.nome === "undefined") {
            this.setState({
                texto: true
            })
        }
        axios.post("/api/cursos/", {
            nome: this.state.nome
        }).then(() => {
            this.setState({ modal: true })
            setTimeout(() => {
                this.setState({ modal: false })
            }, 2000)

            this.listarCursos()
        })
    }
    deletarCurso(e) {
        axios.delete(`/api/cursos/${e}`).then(() => {
        }).then(() => {
            this.listarCursos()
        })
    }


    editarCurso() {
        axios.put(`/api/cursos/${this.state.guardaId}`, {
            nome: this.state.nome
        }).then(() => {
            this.setState({ modal: true })
            setTimeout(() => {
                this.setState({ modal: false })
            }, 2000)


            this.listarCursos()
        })
    }
    pegaNome(e, a) {
        this.setState({
            nome: a,
            guarda: 1,
            guardaId: e
        })
    }

    componentDidMount() {
        this.listarCursos()
    }
    limpar() {
        this.setState({
            nome: "",
            guarda: 0,
            texto: false
        })
    }
    apagarDisciplina() {
        axios.delete(`/api/cursos/${this.state.guardaId}/disciplinas/${this.state.guardaId}`)
    }

    render() {

        return (
            <div>
                <br />
                <Alert key={"idx"} variant={"success"} show={this.state.modal}>
                    Cadastrado com sucesso</Alert>
                <fieldset>

                    <SACEInput

                        label={'Nome do Curso'}
                        value={this.state.nome}
                        placeholder={'Preencha com o nome do curso que você deseja cadastrar'}
                        onChange={(e) => this.setState({ nome: e.target.value })}
                        onError={this.state.texto}
                        onErrorMessage={'Nome do curso não encontrado'}

                    />
                    <Form.Group className="d-flex justify-content-end">

                        {this.state.guarda === 1 ? <Button
                            variant="primary"
                            className="btn btn-primary m-1"
                            onClick={() => this.editarCurso()}
                        > ConfirmarEditar</Button> : <Button variant="primary"
                            className="btn btn-primary m-1"
                            onClick={() => this.inserirCursos()}
                        >Enviar</Button>}
                        <Button
                            variant="danger"
                            className="btn btn-primary m-1"
                            onClick={() => this.limpar()}
                        > Limpar </Button>
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
                                    <td><Link to="/cadastrar-disciplina">{curso.nome}</Link></td>
                                    <td> {curso.nome === "" ? "" : <Button
                                        variant="primary"
                                        className="btn btn-danger m-2"
                                        onClick={(e) => this.deletarCurso(curso.id)
                                        }> Deletar </Button>}
                                    </td>
                                    <td>{curso.nome === "" ? "" : <Button type="button" class="btn btn-secondary btn-lg"
                                        onClick={(e, a) => { this.pegaNome(curso.id, curso.nome) }}
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