import React, { Component } from 'react';
import { get, getId, put } from '../../services/ServicoCrud';
import SACEInput from '../../components/inputs/SACEInput';
import { Button, Form, Modal, Alert } from 'react-bootstrap'
import axios from 'axios';

class ListaProfessor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            professores: [],
            siape: "", siapeInvalido: false, nome: "",
            coordenador: "", email: "", emailInvalido: false,
            mostrarEditar: false, id: "", alert: false,
            msgAlert: "", show: false, variant: "", page: 0,
            last: false,
            first: true,
            total: 0, msgEmail: "", msgNome: "", msgSiape: ""
        }
    }

    async listaProfessor() {
        await get(`usuarios/pages?tipo=PROFESSOR&page=${this.state.page}&size=6`).then((retorno) => {
            if (retorno) this.setState({ professores: retorno, last: retorno.last, first: retorno.first, total: retorno.totalPages })
        })

    }
    async componentDidMount() {
        this.listaProfessor()
    }
    async  buscaPeloId(e) {
        this.limpar()
        getId("usuarios/", e).then((retorno) => {
            this.setState({
                id: retorno.id,
                nome: retorno.perfil.nome,
                email: retorno.email,
                siape: retorno.perfil.siape,
                coordenador: retorno.perfil.coordenador,
                mostrarEditar: true

            })
        })
    }
    limpar() {
        this.setState({
            nomeInvalido: false, siapeInvalido: false, emailInvalido: false
        })
    }
    async editar(e) {

        if (this.state.nome.trim() === "" || this.state.nome === null ? this.setState({ nomeInvalido: true,msgNome:"Você não inseriu nome corretamente" }) : this.setState({ nomeInvalido: false })) { }
        if (this.state.siape === "" || this.state.siape === null || this.state.siape <= 0 ? this.setState({ siapeInvalido: true ,msgSiape:"Você não inseriu SIAPE corretamente"}) : this.setState({ siapeInvalido: false })) { }
        if (this.state.email === "" || this.state.email === null || this.state.email.indexOf("@", 0) === -1 ? this.setState({ emailInvalido: true ,msgEmail:"Você não inseriu email corretamente"}) : this.setState({ emailInvalido: false })) { }
        if (this.state.nome.length > 40) {
            this.setState({ nomeInvalido: true, msgNome: "Limite máximo de cadastro de 40 caracteres" })
            return
        } if (this.state.email.length > 40) {
            this.setState({ emailInvalido: true, msgEmail: "Limite máximo de cadastro de 40 caracteres" })
            return
        }
        if (this.state.siape > 99999999) {
            this.setState({ siapeInvalido: true, msgSiape: "Não pode ser cadastrado número superior a 99999999" })
            return
        }
        if (this.state.nome.trim() === "" || this.state.nome === null || this.state.email.indexOf("@", 0) === -1 || this.state.siape === "" || this.state.siape <= 0 || this.state.siape === null || this.state.email === "" || this.state.email == null) {
            return
        }
        put("usuarios", e,
            {
                email: this.state.email,
                perfil: {
                    nome: this.state.nome,
                    tipo: "PROFESSOR",
                    siape: this.state.siape,
                    coordenador: this.state.coordenador,
                }
            }).then(() => {
                this.setState({
                    mostrarEditar: false, nomeInvalido: false, siapeInvalido: false, emailInvalido: false, show: true,
                    variant: "success", msgAlert: "Atualizado com sucesso"
                })
                this.listaProfessor()
                setTimeout(() => { this.setState({ show: false }) }, 3000);
            })
    }
    deletar() {
        axios.delete("http://localhost:8080/api/usuarios/" + this.state.id).then((r) =>
            this.setState({ modalShow: false, show: true, variant: "danger", msgAlert: "Apagou com sucesso" }),
            this.listaProfessor()
        ).catch(() =>
            alert("Não pode apagar cadastro do professor ele possui requisição no sistema "),
            this.setState({ modalShow: false })
            , setTimeout(() => {
                this.setState({ show: false })
            }, 3000),
            this.listaProfessor()
        )
    }
    control(e) {
        if (e.target.id === "+") {
            this.setState({ page: this.state.page + 1, mostrarEditar: false }, () => this.listaProfessor())
        } else {
            this.setState({ page: this.state.page - 1, mostrarEditar: false }, () => this.listaProfessor())
        }
    }
    render() {
        return (<div>
            <br /><br />
            <Alert show={this.state.show} variant={this.state.variant}>{this.state.msgAlert}</Alert>
            <h3>Professores </h3>
            <table className="table">
                <thead className="p-3 mb-2 bg-primary text-white">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nome</th>
                        <th scope="col">SIAPE</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Coordenador</th>
                        <th scope="col">Apagar</th>
                        <th scope="col">Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.professores.content &&
                        this.state.professores.content.map((p) =>

                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.perfil.nome}</td>
                                <td>{p.perfil.siape}</td>
                                <td>{p.email}</td>
                                <td style={{ textAlign: "center" }}>{p.perfil.coordenador ? "SIM" : "Não"}</td>
                                <td> {p.perfil.nome === "" ? "" : <Button
                                    variant="primary"
                                    className="btn btn-danger m-1"
                                    onClick={() => this.setState({ modalShow: true, id: p.id, mostrarEditar: false, nome: p.perfil.nome })}
                                > Apagar </Button>}
                                </td>
                                <td> {p.perfil.nome === "" ? "" : <Button
                                    variant="primary"
                                    className="btn btn-success m-1"
                                    onClick={() => this.buscaPeloId(p.id)}
                                > Editar </Button>}
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
            <hr />
            {
                <>
                    {this.state.first || <button id="-" onClick={(e) => this.control(e)}>Anterior</button>}
                    &nbsp;&nbsp;
                            {this.state.last || <button id="+" onClick={(e) => this.control(e)}>Próximo</button>}

                    <span style={{ float: "right" }}>Página  {this.state.page + 1} / {this.state.total}</span>
                </>

            }<br /><br />
            {this.state.mostrarEditar && this.state.mostrarEditar === true ? <>

                <h3 style={{ textAlign: 'center' }}>Formulário de Edição</h3>
                <p >ID : <span style={{
                    color: 'red'
                }}>{this.state.id}</span></p>
                <SACEInput
                    autoFocus={true}
                    label={'Nome'}
                    value={this.state.nome}
                    placeholder={'Informe o seu nome. '}
                    onChange={(e) => this.setState({ nome: e.target.value })}
                    onError={this.state.nomeInvalido}
                    onErrorMessage={this.state.msgNome}
                />
                <SACEInput
                    type={"number"}
                    min="0"
                    label={'SIAPE'}
                    value={this.state.siape}
                    placeholder={'Informe a sua siape. '}
                    onChange={(e) => this.setState({ siape: e.target.value })}
                    onError={this.state.siapeInvalido}
                    onErrorMessage={this.state.msgSiape}
                />
                <SACEInput
                    type={"email"}
                    label={'E-mail'}
                    value={this.state.email}
                    placeholder={'Informe o seu nome. '}
                    onChange={(e) => this.setState({ email: e.target.value })}
                    onError={this.state.emailInvalido}
                    onErrorMessage={this.state.msgEmail}
                />
                <Form.Check type="switch" id="custom-switch" label="Coordenador" value={this.state.coordenador} checked={this.state.coordenador}
                    onChange={() => this.setState({ coordenador: !this.state.coordenador })} />
                <br />

                <Button
                    variant="primary"
                    className="btn btn-primary m-1"
                    onClick={() => this.editar(this.state.id)}
                > Salvar </Button>
            </> : ""}
            <Modal show={this.state.modalShow} onHide={() => this.setState({ modalShow: false })} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title > Confirmar</Modal.Title>
                </Modal.Header>
                <Modal.Body>Apagar cadastro do professor/professora? </Modal.Body>
                <Modal.Body>ID: &nbsp;{this.state.id} </Modal.Body>
                <Modal.Body>Nome :&nbsp;{this.state.nome} </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary"
                        className="btn btn-danger m-1"
                        onClick={(e) => this.deletar()}
                    > Apagar </Button>

                </Modal.Footer>
            </Modal>

        </div>);
    }
}

export default ListaProfessor;
