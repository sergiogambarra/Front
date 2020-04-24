import React, { Component } from 'react';
import SACEInput from '../../../src//components/inputs/SACEInput';
import { Button } from 'react-bootstrap';
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
            parecer: "",
            deferido: "escolha",
            disciplinaSolicitada: "",
            usuario: "",
            professor: {},
            anexos: [],
            formacaoAtividadeAnterior: "",
            criterioAvaliacao: "", tipo: "", atualizarParecer: "",
            listaProfessores: [],
            idRequisicao: "", id: "", modal: false, cordenador: ""
        }


    }
    
    async listaAth(){
        const user = await get("usuarios/auth/")
            this.setState({user})
      }
    async buscaProfessores() {
        const listaProfessores = await get("usuarios/professores/");
        this.setState({ listaProfessores })
    }

    async componentDidMount() {
        this.listaAth()
        this.buscaProfessores()
        const c = await getRequisicaoId(this.props.match.params.id)
        this.setState({ c })

        this.setState({
            idRequisicao: c.id,
            dataRequisicao: c.dataRequisicao,
            parecer: c.parecer,
            deferido: c.deferido,
            disciplinaSolicitada: c.disciplinaSolicitada,
            usuario: c.usuario.perfil.nome,
            professor: c.professor,
            anexos: c.anexos,
            formacaoAtividadeAnterior: c.formacaoAtividadeAnterior,
            criterioAvaliacao: c.criterioAvaliacao,
            tipo: c.tipo,
            titulo: "",
            cordenador: c.professor  && c.professor.perfil.cordenador
        });
        if (this.state.id === "" || this.state.id === null) {
            this.setState({ id: this.state.professor && this.state.professor.perfil.id })
        }
    }

    async atualizar() {
        put("requisicoes", this.props.match.params.id, {
            tipo: this.state.tipo,
            deferido: this.state.deferido,
            parecer: this.state.atualizarParecer ? this.state.atualizarParecer : this.state.parecer,
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
                    value={this.state.disciplinaSolicitada.nome}
                    disabled={true} />
                <SACEInput
                    label={'Status'}
                    value={this.state.deferido}
                    disabled={true} />
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Parecer</Form.Label>

                    <Form.Control as="textarea" rows="2"
                        id={this.state.parecer}
                        value={this.state.parecer}
                        disabled={true}
                    />
                </Form.Group>

                <div style={{ fontSize: "200%" }}> Modificar Status </div>
                {this.state.user&&this.state.user.perfil.cordenador===true? <Form>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <br />
                        <Form.Label>Selecione professor</Form.Label>
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
                    <label class="custom-control-label" for="DEFERIDO">Deferido</label>
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
                    <Form.Label>Novo Parecer</Form.Label>
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
                    <Button onClick={(e) => this.setState({ modal: true })} variant="primary" className="btn btn-primary m-1" data-toggle="modal" data-target="#exampleModal" style={{ border: "5px solid white" }}>Enviar</Button>
                    <Link to="/minhas-requisicoes"> <Button variant="danger" className="btn btn-primary m-2" >Voltar </Button></Link>
                </div>

            </Form.Group>


        </div>);
    }
}
export default Parecer;