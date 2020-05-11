import React, { Component } from 'react';
import SACEInput from '../../components/inputs/SACEInput';
import { Button, } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert'
import { put, getId, get } from '../../services/ServicoCrud';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

export default class ListaCursos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cursos: [],
            nome: "",
            id: "",
            editar: false,
            texto: false,
            showAlert: false, modalShow: false, nomeInvalido: false,
            msgAlert: "", variantAlert: "",   
            page: 0,
            last: false,
            first: true,
            total: 0
        }
    }
    control(e) {
        if (e.target.id === "+") {
            this.setState({ page: this.state.page + 1 }, () => this.listarCursos())
        } else {
            this.setState({ page: this.state.page - 1 }, () => this.listarCursos())
        }
    }
    async listarCursos() {
         get(`cursos/paginacao?page=${this.state.page}&size=6`).then((retorno)=>{
            this.setState({ cursos:retorno.content, last: retorno.last, first: retorno.first, total: retorno.totalPages })

        })
    }

    async listarCursosId(id) {
        getId("cursos/", id).then((retorno)=>{
            this.setState({ nome: retorno && retorno.nome, id: id, editar: true, nomeInvalido: false });
        })
    }

    componentDidMount() {
        this.listarCursos();
    }

    atualizar() {
        if (this.state.nome === "" || this.state.nome === null) {
            this.setState({ nomeInvalido: true })
            return
        }
        put("cursos", this.state.id, { nome: this.state.nome }).then(() => {
            this.setState({ showAlert: true, editar: false, nomeInvalido: false, msgAlert: "Atualizado com sucesso", variantAlert: "success" })
            setTimeout(() => {
                this.setState({ showAlert: false })
            }, 4000)
            this.listarCursos()

        })
    }
    delete() {
        axios.delete("http://localhost:8080/api/cursos/" + this.state.id).then((r) =>
            this.setState({ modalShow: false, showAlert: true, variantAlert: "danger", msgAlert: "Apagou com sucesso" })
            , this.listarCursos()
        ).catch(() =>
            alert("Não pode apagar cadastro do aluno devido ele ter requisição no sistema"),
            this.setState({ modalShow: false })
            , setTimeout(() => {
                this.setState({ showAlert: false })
            }, 3000))
        this.listarCursos()
    }
    render() {
        return (
            <div>
                <br />
                <br />
                <Alert key={"idx"} variant={this.state.variantAlert} show={this.state.showAlert}>{this.state.msgAlert}</Alert>
                <h2>Cursos </h2>
                <table className="table">
                    <thead className="p-3 mb-2 bg-primary text-white">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Apagar</th>
                            <th scope="col">Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.cursos && this.state.cursos.map((curso) =>
                            <tr key={curso.id + curso.nome}>
                                <td>{curso.id}</td>
                                <td><Link to="/cadastrar-disciplina">{curso.nome}</Link></td>
                                <td> <Button variant="primary" className="btn btn-danger m-1"
                                    onClick={() => this.setState({ modalShow: true, curso, id: curso.id, editar: false, nome: curso.nome, nomeInvalido: false })}>
                                    Apagar
                                        </Button>  </td>
                                <td>
                                    <a href={"#top"}> <Button id={curso.id} type="button" className="btn btn-success m-1"
                                        onClick={(e) => this.listarCursosId(e.target.id)}> Editar </Button></a>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <hr />
                <br /><br />
                <fieldset>
                    {this.state.editar === true ? <> <h3 id={"top"} style={{ textAlign: "center" }}>Formulário de Edição</h3>
                        <p>ID : &nbsp;<span style={{ color: "red" }}>{this.state.id}</span></p>
                        <SACEInput label={"Curso"} value={this.state.nome} placeholder={'Preencha com o nome do curso que você deseja cadastrar'}
                            autoFocus onChange={(e) => this.setState({ nome: e.target.value })} onError={this.state.nomeInvalido} onErrorMessage={'Campo nome não pode ficar em branco'} />
                        <Button className="btn btn-primary m-1" onClick={(e) => this.atualizar()} >Salvar</Button>
                    </> : ""}

                </fieldset >
                <Modal show={this.state.modalShow} onHide={() => this.setState({ modalShow: false })} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title > Confirmar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Você deseja apagar o curso? </Modal.Body>
                    <Modal.Body>ID :&nbsp;{this.state.id} </Modal.Body>
                    <Modal.Body>Nome :&nbsp;{this.state.nome} </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary"
                            className="btn btn-danger m-1"
                            onClick={(e) => this.delete()}
                        > Apagar </Button>
                    </Modal.Footer>
                </Modal>
                {
                    <>
                        {this.state.first || <button id="-" onClick={(e) => this.control(e)}>Anterior</button>}
                        &nbsp;&nbsp;
                            {this.state.last || <button id="+" onClick={(e) => this.control(e)}>Próximo</button>}

                        <span style={{ float: "right" }}>Página  {this.state.page + 1} / {this.state.total}</span>
                    </>

                }
            </div>
        );
    }
}