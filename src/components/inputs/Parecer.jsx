import React, { Component } from 'react';
import SACEInput from '../../../src//components/inputs/SACEInput';
import { Button, Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";
import TituloPagina from '../../components/TituloPagina';
import { Form, Modal } from 'react-bootstrap';
import { getRequisicaoId } from '../../services/RequisicaoService';
import { put, get } from '../../services/ServicoCrud';

class Parecer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataRequisicao: "",
            parecerCoordenador: "",
            parecerProfessor: "",
            parecerServidor: "",
            deferido: "escolha",
            disciplinaSolicitada: "",
            usuario: "",
            professor: {},
            anexos: [],
            formacaoAtividadeAnterior: "",
            criterioAvaliacao: "", tipo: "", atualizarParecer: "",
            listaProfessores: [],
            idRequisicao: "", id: "", modal: false, coordenador: "", disciplinas: [],
            idDisciplina: "", stringParecer: "", mudaParecer: "", alert: false
        }


    }

    async listaAth() {
        const user = await get("usuarios/auth/")
        console.log(user.perfil.tipo);
        console.log(user);

        this.setState({ user })
    }
    async buscaProfessores() {
        const listaProfessores = await get("usuarios/professores/");
        this.setState({ listaProfessores })
    }

    async componentDidMount() {
        this.listaDisciplinas()
        this.listaAth()
        this.buscaProfessores()
        const c = await getRequisicaoId(this.props.match.params.id)
        this.setState({ c })
        this.mudaNomeStringParecer()
        this.setState({
            idRequisicao: c.id,
            dataRequisicao: c.dataRequisicao,
            parecerCoordenador: c.parecerCoordenador,
            parecerProfessor: c.parecerProfessor,
            parecerServidor: c.parecerServidor,
            deferido: c.deferido,
            disciplinaSolicitada: c.disciplinaSolicitada,
            usuario: c.usuario.perfil.nome,
            professor: c.professor,
            anexos: c.anexos,
            formacaoAtividadeAnterior: c.formacaoAtividadeAnterior,
            criterioAvaliacao: c.criterioAvaliacao,
            tipo: c.tipo,
            titulo: "",
            coordenador: c.professor && c.professor.perfil.coordenador, alert: false

        });
        if (this.state.id === "" || this.state.id === null) {
            this.setState({ id: this.state.professor && this.state.professor.perfil.id })
        }
    }
    mudaNomeStringParecer() {
        if (this.state.user && this.state.user.perfil.tipo === "SERVIDOR") {
            this.setState({ stringParecer: "SERVIDOR" })
        } else if (this.state.user && this.state.user.perfil.coordenador === true) {
            this.setState({ stringParecer: "Coordenador" })
        } else { this.setState({ stringParecer: "Professor" }) }
    }
    async listaDisciplinas() {
        await get("disciplinas/").then((r) => this.setState({
            disciplinas: r
        }))
    }

    async atualizar() {
        if (this.state.id) { }
        console.log(this.state.id);

        if (this.state.id === null) {
            put("requisicoes", this.props.match.params.id, {
                tipo: this.state.tipo,
                deferido: this.state.deferido,
                parecer: this.state.atualizarParecer ? this.state.atualizarParecer : this.state.parecer,
            }).then(() => { this.setState({ modal: false }) })
        } else if (this.state.id === null && this.state.user && this.state.user.perfil.coordenador === true) {
            this.setState({ alert: true })
            return
        }
        put("requisicoes", this.props.match.params.id, {
            tipo: this.state.tipo,
            deferido: this.state.deferido,
            parecerCoordenador: this.state.atualizarParecer ? this.state.atualizarParecer : this.state.parecer,
            professor: {
                id: this.state.id
            }
        }).then(() => { this.setState({ modal: false }) })
    }

    render() {
        return (<div>
            <Form.Group className="col-md-6 container">

                <TituloPagina titulo="Parecer da Requisição" />
                <p > ID da requisição :<span style={{ color: "red" }}>&nbsp;{this.state.idRequisicao}</span> </p>
                <SACEInput
                    label={'Aluno'}
                    value={this.state.usuario}
                    disabled={true}
                />
                <SACEInput
                    label={'Data de cadastro da requisição'}
                    value={this.state.dataRequisicao}
                    disabled={true}

                />
                <SACEInput
                    label={'Tipo'}
                    value={this.state.tipo === "aproveitamento" ? "APROVEITAMENTO DE ESTUDOS" : "CERTIFICAÇÃO DE CONHECIMENTOS"}
                    disabled={true}

                />
                <SACEInput
                    label={'Disciplina'}
                    value={this.state.disciplinaSolicitada && this.state.disciplinaSolicitada.nome}
                    disabled={true} />
                <SACEInput
                    label={'Status'}
                    value={this.state.deferido}
                    disabled={true} />

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Parecer do Coodenador</Form.Label>
                    <Form.Control as="textarea" rows="2"
                        value={this.state.parecerCoordenador}
                        disabled={true}
                    />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Parecer do Professor</Form.Label>
                    <Form.Control as="textarea" rows="2"
                        value={this.state.parecerProfessor}
                        disabled={true}
                    />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Parecer do Servidor</Form.Label>
                    <Form.Control as="textarea" rows="2"
                        value={this.state.parecerServidor}
                        disabled={true}
                    />
                </Form.Group>
                <div style={{ fontSize: "200%" }}> Modificar Status </div>
                <Alert variant={"danger"} show={this.state.alert}>Selecione um professor tratar requisição</Alert>
                {this.state.user && this.state.user.perfil.coordenador === true ? <Form>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <br />
                        <Form.Label>Selecione um professor para tratar essa requisição  </Form.Label>
                        <Form.Control as="select" custom
                            id={this.state.listaProfessores.id}
                            value={this.state.listaProfessores.id}
                            onChange={(e) => this.setState({ id: e.target.value })} >
                            <option selected ></option>
                            {this.state.listaProfessores && this.state.listaProfessores.map((p) =>
                                <option key={p.id} value={p.id}>{p.perfil.nome}</option>
                            )}
                        </Form.Control>
                    </Form.Group>
                </Form> : ""}
                <br />
                <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio"
                        id="DEFERIDO" name="customRadioInline1" class="custom-control-input"
                        onChange={(e) => this.setState({ deferido: e.target.id })}
                        defaultChecked={false}
                    />
                    {console.log(this.state.user && this.state.user.perfil.tipo)}

                    {this.state.user && this.state.user.perfil.tipo === "SERVIDOR" ? "" : <label class="custom-control-label" for="DEFERIDO">Deferido</label>}
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="INDEFERIDO" name="customRadioInline1" class="custom-control-input"
                        onChange={(e) => this.setState({ deferido: e.target.id })}
                        defaultChecked={false} />
                    <label class="custom-control-label" for="INDEFERIDO">Indeferido</label><br /><br />
                </div>

                <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="EM ANÁLISE" name="customRadioInline1" class="custom-control-input"
                        onChange={(e) => this.setState({ deferido: e.target.id })}
                        defaultChecked={this.state.deferido === "EM ANÁLISE" ? true : false}
                    />
                    <label class="custom-control-label" for="EM ANÁLISE">Em análise</label><br /><br />
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="escolha" name="customRadioInline" class="custom-control-input"
                        checked />
                    <label class="custom-control-label" for="escolha" style={{ display: "none" }}></label><br /><br />
                </div>
                <br />
                <label>Documentos enviados pelo aluno :</label>
                <ol>
                    {
                        this.state.anexos.map((a) => {
                            return <li>
                                <a href={a.arquivo} download>{a.nome}</a>
                            </li>
                        })
                    }
                </ol>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Novo Parecer do : &nbsp;{this.state.stringParecer}</Form.Label>
                    <Form.Control as="textarea" rows="2"
                        id={this.state.atualizarParecer}
                        value={this.state.atualizarParecer}
                        onChange={(e) => this.setState({ atualizarParecer: e.target.value })}
                    />

                </Form.Group>
                <Modal show={this.state.modal} onHide={() => this.setState({ modal: false })} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title > Confirmar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><strong>Deseja confirmar os dados</strong></Modal.Body>
                    <Modal.Body>Parecer : &nbsp;{this.state.atualizarParecer === "" ? this.state.parecer : this.state.atualizarParecer}</Modal.Body>
                    <Modal.Body>Status : &nbsp;{this.state.deferido}</Modal.Body>
                    <Modal.Footer>
                        <Link to="/minhas-requisicoes">      <Button onClick={(e) => this.atualizar()} variant="primary" className="btn btn-primary m-1" data-toggle="modal" data-target="#exampleModal" style={{ border: "5px solid white" }}>Enviar</Button></Link>
                        <Button variant="danger" onClick={() => this.setState({ modal: false })}>  Fechar </Button>
                    </Modal.Footer>
                </Modal>
              

                <div className="row container" style={{ position: 'relative', left: '32%' }}>
                    <Button onClick={(e) => this.setState({ modal: true })} variant="primary" className="btn btn-primary m-1" data-toggle="modal" data-target="#exampleModal" style={{ border: "5px solid white" }}>Salvar</Button>
                    <Link to="/minhas-requisicoes"> <Button variant="danger" className="btn btn-primary m-2" >Voltar </Button></Link>
                </div>
                {console.log(this.state.alert)}
            </Form.Group>


        </div>);
    }
}
export default Parecer;