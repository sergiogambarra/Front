import React, { Component } from 'react';
import SACEInput from '../../../src//components/inputs/SACEInput';
import { Button, Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";
import TituloPagina from '../../components/TituloPagina';
import { Form, Modal } from 'react-bootstrap';
import { getRequisicaoId } from '../../services/RequisicaoService';
import { put, get } from '../../services/ServicoCrud';
import AnexarArquivosInput from '../inputs/anexarArquivosInput/AnexarArquivosInput';

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
            prova: [], modificaModal: false,
            formacaoAtividadeAnterior: "", pesquisaNomeCurso: "",
            criterioAvaliacao: "", tipo: "", atualizarParecer: "",
            listaProfessores: [], mostraRequisicaoCoordenador: false,
            idRequisicao: "", id: "", modal: false, coordenador: "",
            idDisciplina: "", stringParecer: "", mudaParecer: "", listaProfessoresInvalido: false, msgStatus: "",
            msgErrorProfessor: "", responsavelPelaRequisicao: "", msgErrorParecer: "", msgModal: "", alerteDonoRequisicao: false,
            divIndeferido: false
        }
        this.setProva = this.setProva.bind(this)


    }

    async listaAth() {
        const user = await get("usuarios/auth/")
        this.setState({ user })
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
            formacaoAtividadeAnterior: c.disciplinasCursadasAnterior,
            criterioAvaliacao: c.criterioAvaliacao,
            tipo: c.tipo,
            prova: c.prova || "",
            titulo: "", cursoCoordenador: [],
            coordenador: c.professor && c.professor.perfil.coordenador, alert: false,
            responsavelPelaRequisicao: c.responsavelPelaRequisicao

        }
        );
        if (this.state.id === "" || this.state.id === null) {
            this.setState({ id: this.state.professor && this.state.professor.perfil.id })
        }

        if (this.state.user && this.state.user.permissao === "SERVIDOR" && this.state.responsavelPelaRequisicao !== "SERVIDOR") {
            this.setState({ alerteDonoRequisicao: true })
        }
        if (this.state.user && this.state.user.permissao === "PROFESSOR" && this.state.responsavelPelaRequisicao === "SERVIDOR") {
            this.setState({ alerteDonoRequisicao: true })
        }
        if (this.state.user && this.state.user.permissao === "PROFESSOR" && this.state.user && this.state.user.perfil.coordenador === false && this.state.responsavelPelaRequisicao === "COORDENADOR") {
            this.setState({ alerteDonoRequisicao: true })
        }

        if (this.state.user && this.state.user.id && this.state.professor && this.state.professor.id) {
            if (this.state.user && this.state.user.permissao === "PROFESSOR" && this.state.user && this.state.user.perfil.coordenador === true) {
                if (this.state.user.id !== this.state.professor.id) {
                    console.log("oiopioioi");
                    this.setState({ alerteDonoRequisicao: true })

                } else if (this.state.user.id === this.state.professor.id) {
                    if (this.state.deferido !== "EM ANÁLISE") {
                        this.setState({ responsavelPelaRequisicao: "FINALIZADO" })
                    }
                }
            }
        }
        if (this.state.deferido !== "EM ANÁLISE") {
            this.setState({ responsavelPelaRequisicao: "FINALIZADO" })
        }
        if (this.state.responsavelPelaRequisicao === "FINALIZADO") {

            this.setState({ alerteDonoRequisicao: true })
        }

    }


    mudaNomeStringParecer() {
        if (this.state.user && this.state.user.perfil.tipo === "SERVIDOR") {
            this.setState({ stringParecer: "SERVIDOR" })
        } else if (this.state.user && this.state.user.perfil.coordenador === true) {
            this.setState({ stringParecer: "Coordenador" })
        } else { this.setState({ stringParecer: "Professor" }) }
    }


    async atualizar() {

        if (this.state.user && this.state.user.perfil.tipo === "SERVIDOR") {
            put("requisicoes", this.props.match.params.id, {
                tipo: this.state.tipo,
                deferido: this.state.deferido,
                parecerServidor: this.state.atualizarParecer ? this.state.atualizarParecer : this.state.parecerServidor,
                parecerCoordenador: this.state.parecerCoordenador,
                parecerProfessor: this.state.parecerProfessor,
                responsavelPelaRequisicao: "COORDENADOR"
            }).then(() => { this.setState({ modal: false }) })
        } else if (this.state.user && this.state.user.perfil.coordenador === true) {
            put("requisicoes", this.props.match.params.id, {
                tipo: this.state.tipo,
                deferido: this.state.deferido,
                parecerCoordenador: this.state.atualizarParecer ? this.state.atualizarParecer : this.state.parecerCoordenador,
                parecerProfessor: this.state.parecerProfessor,
                parecerServidor: this.state.parecerServidor,
                responsavelPelaRequisicao: "PROFESSOR",
                prova: this.state.prova[0],
                professor: {
                    id: this.state.id
                }
            }).then(() => { this.setState({ modal: false }) })
        } else {
            put("requisicoes", this.props.match.params.id, {
                tipo: this.state.tipo,
                deferido: this.state.deferido,
                parecerServidor: this.state.parecerServidor,
                parecerCoordenador: this.state.parecerCoordenador,
                parecerProfessor: this.state.atualizarParecer ? this.state.atualizarParecer : this.state.parecerProfessor,
                prova: this.state.prova[0],
                responsavelPelaRequisicao: "COORDENADOR"
            }).then(() => { this.setState({ modal: false }) })
        }
    }
    verificarDados() {
        if (this.state.user && this.state.user.id === parseInt(this.state.id) && this.state.user && this.state.user.perfil.coordenador === true) {
            this.setState({ parecerProfessor: this.state.atualizarParecer, parecerCoordenador: this.state.atualizarParecer })
        }
        if (this.state.parecerServidor && this.state.parecerServidor.trim() !== "" && this.state.prova && this.state.prova.length > 0 && this.state.parecerCoordenador && this.state.parecerCoordenador.trim() !== "") {
            this.setState({ modal: true, modificaModal: true })
        }
        if (this.state.user && this.state.user.perfil.tipo === "PROFESSOR" && this.state.user && this.state.user.perfil.coordenador === true) {
            if (this.state.user && this.state.professor) {

                if (this.state.deferido === "EM ANÁLISE" && this.state.parecerProfessor.length > 0) {
                    this.setState({ msgStatus: "Selecione status da requisição" })

                    return

                }
            }

        }
       
        if (this.state.user && this.state.user.perfil.coordenador === true) {
            if (this.state.user && this.state.user.id === parseInt(this.state.id) &&this.state.deferido === "EM ANÁLISE"  ) {
                this.setState({ msgStatus: "Selecione status da requisição" })
                return
            }
        }

        if (this.state.atualizarParecer.length > 150) {
            this.setState({ msgErrorParecer: "Limite máximo para cadastro do parecer é de 150 caracteres." })

            return
        }
        if (this.state.atualizarParecer.trim() === "") {
            this.setState({ msgErrorParecer: "Campo parecer é obrigatório" })
            return
        }
        if (this.state.responsavelPelaRequisicao === "SERVIDOR") {
            this.setState({ msgModal: " envio da requisição para coordenador?" })
        }
        if (this.state.user && this.state.user.perfil.coordenador === true) {
            if (this.state.id === null || this.state.id === "") {
                this.setState({ listaProfessoresInvalido: true, msgErrorProfessor: "Campo professor é obrigatório" })

                return
            }
            this.setState({ modal: true })
        } else {
            this.setState({ modal: true })
        }
    }
    limpar() {
        this.state({ id: null, msgErrorParecer: "" })
    }
    getProva(e) {
        this.setState({ prova: e.target.files[0] })
    }
    setProva(prova) {
        this.setState({ prova: prova })
    }


    render() {
        return (<div><br />

            <Alert style={{ textAlign: "center" }} show={this.state.alerteDonoRequisicao} variant={"info"}>{this.state.responsavelPelaRequisicao === "FINALIZADO" ? "Processo da Solicitação do aluno finalizado responsável = " : "Você não pode alterar os dados desta solicitação neste momento porque ela está sendo tratada por outro usuário. Responsável ="} <span style={{ color: "red" }}>
                {this.state.responsavelPelaRequisicao === "FINALIZADO" ? "SETOR DE ENSINO " : this.state.responsavelPelaRequisicao === "SERVIDOR" ? "SETOR DE ENSINO" : this.state.responsavelPelaRequisicao}</span></Alert>
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
                    label={'Disciplina Solicitada'}
                    value={this.state.disciplinaSolicitada && this.state.disciplinaSolicitada.nome}
                    disabled={true} />
                {this.state.tipo === "certificacao" ? "" : <SACEInput
                    label={'Disciplina cursada Anteriormente '}
                    value={this.state.formacaoAtividadeAnterior && this.state.formacaoAtividadeAnterior}
                    disabled={true} />}
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
                    <Form.Label>Parecer do Setor de Ensino</Form.Label>
                    <Form.Control as="textarea" rows="2"
                        value={this.state.parecerServidor}
                        disabled={true}
                    />
                </Form.Group>
                <Alert variant={"danger"} show={this.state.alert}>Selecione um professor tratar requisição</Alert>

               
                {!this.state.alerteDonoRequisicao &&
                    this.state.user && this.state.user.perfil.coordenador === true ?
                    <Form>
                        <Form.Group controlId="exampleForm.SelectCustom">
                            <br />
                            <Form.Label>Selecione um professor para tratar essa requisição  </Form.Label>
                            <Form.Control as="select" custom
                                id={this.state.listaProfessores.id}
                                value={this.state.listaProfessores.id}
                                isInvalid={this.state.listaProfessoresInvalido}
                                onChange={(e) => this.setState({ id: e.target.value, msgErrorProfessor: "", listaProfessoresInvalido: false, parecerProfessor: "", parecerCoordenador: "", msgStatus: "" })} >
                                <option onClick={() => this.limpar()} ></option>
                                {this.state.listaProfessores && this.state.listaProfessores.map((p) =>
                                    <option key={p.id} value={p.id}>{p.perfil.nome}</option>

                                )}
                            </Form.Control>
                            <Form.Text className="text-danger">{this.state.msgErrorProfessor} </Form.Text>
                        </Form.Group>
                    </Form> : ""}

                <br />
                {console.log(this.state.responsavelPelaRequisicao)}
                {this.state.user && this.state.user.perfil.coordenador === true && this.state.responsavelPelaRequisicao === "COORDENADOR" ? <div className="custom-control custom-radio custom-control-inline">

                    <input type="radio"
                        id="DEFERIDO" name="customRadioInline1" class="custom-control-input"
                        onChange={(e) => this.setState({ deferido: e.target.id })}
                        defaultChecked={false}
                    />
                    <label className="custom-control-label" for="DEFERIDO">Deferido</label>&nbsp;&nbsp;&nbsp;

                    <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="INDEFERIDO" name="customRadioInline1" className="custom-control-input"
                            onChange={(e) => this.setState({ deferido: e.target.id })}
                            defaultChecke d={false} />
                        <label class="custom-control-label" for="INDEFERIDO">Indeferido</label>
                    </div>
                </div> : ""}
                {!this.state.alerteDonoRequisicao && this.state.user && this.state.user.perfil.tipo === "SERVIDOR"
                    ?
                    <> <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="EM ANÁLISE" name="customRadioInline1" className="custom-control-input"
                            onChange={(e) => this.setState({ deferido: e.target.id })}
                            defaultChecked={this.state.deferido === "EM ANÁLISE" ? true : false}
                        />
                        <label className="custom-control-label" for="EM ANÁLISE">Em análise</label>

                    </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="INDEFERIDO" name="customRadioInline1" className="custom-control-input"
                                onChange={(e) => this.setState({ deferido: e.target.id })}
                                defaultChecke d={false} />
                            <label class="custom-control-label" for="INDEFERIDO">Indeferido</label>
                        </div>

                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="escolha" name="customRadioInline" className="custom-control-input"
                                checked />
                            <label className="custom-control-label" for="escolha" style={{ display: "none" }}></label><br />
                        </div> </> : ""}

                <Form.Text className="text-danger">{this.state.msgStatus} </Form.Text>
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

                {this.state.alerteDonoRequisicao ? "" :

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Novo Parecer do :&nbsp;{this.state.stringParecer === "Coordenador" ? <> <b>{this.state.stringParecer}</b> <span style={{ color: "red" }}>  ( se o coordenador é professor da disciplina seu parecer é gravado nos campos de parecer de professor de coordenador )</span></> : this.state.stringParecer}</Form.Label>
                        <Form.Control as="textarea" rows="2"
                            id={this.state.atualizarParecer}
                            value={this.state.atualizarParecer}
                            onChange={(e) => this.setState({ atualizarParecer: e.target.value })}
                        />
                        <Form.Text className="text-danger">{this.state.msgErrorParecer} </Form.Text>
                    </Form.Group>
                }
                {/* {console.log(this.state.responsavelPelaRequisicao)} */}

                {this.state.alerteDonoRequisicao && this.state.responsavelPelaRequisicao === "COORDENADOR" && this.state.user && this.state.user.perfil.coordenador === true ? <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Novo Parecer do :&nbsp;{this.state.stringParecer === "Coordenador" ? <> <b>{this.state.stringParecer}</b> <span style={{ color: "red" }}>  ( se o coordenador é professor da disciplina seu parecer é gravado nos campos de parecer de professor de coordenador )</span></> : this.state.stringParecer}</Form.Label>
                    <Form.Control as="textarea" rows="2"
                        id={this.state.atualizarParecer}
                        value={this.state.atualizarParecer}
                        onChange={(e) => this.setState({ atualizarParecer: e.target.value })}
                    />
                    <Form.Text className="text-danger">{this.state.msgErrorParecer} </Form.Text>
                </Form.Group> : ""}

                {this.state.user && this.state.user.permissao === "SERVIDOR" && this.state.responsavelPelaRequisicao === "FINALIZADO" ?

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Atualizar parecer do : &nbsp;{this.state.stringParecer}</Form.Label>
                        <Form.Control as="textarea" rows="2"
                            id={this.state.atualizarParecer}
                            value={this.state.atualizarParecer}
                            onChange={(e) => this.setState({ atualizarParecer: e.target.value })}
                        />
                        <Form.Text className="text-danger">{this.state.msgErrorParecer} </Form.Text>
                    </Form.Group> : ""

                }
                {
                    this.state.user && this.state.user.perfil.tipo === "PROFESSOR" && this.state.tipo === "certificacao"

                        ? <>
                            <label>Adicionar prova  </label>
                            <div class="input-group mb-3">

                                <AnexarArquivosInput
                                    anexos={this.state.prova}
                                    setAnexos={this.setProva}
                                />
                            </div>
                            <Form.Text className="text-danger">"Permitido somente um arquivo com tamanho de até 4 Mb"</Form.Text>
                        </> : ""}

                <ol>
                    {this.state.prova && <li><a href={this.state.prova.arquivo} download>{this.state.prova.nome}</a></li>}
                </ol>
                <br />
                {
                    <div className="row container" style={{ textAlign: "right", position: 'relative', left: '0%' }}>
                        <Button onClick={(e) => this.verificarDados()} variant="primary" className="btn btn-primary m-1"  >Salvar</Button>
                        <Link to="/minhas-requisicoes"> <Button variant="danger" className="btn btn-primary m-1" >Voltar </Button></Link>
                    </div>
                }
            </Form.Group>

            <Modal show={this.state.modal} onHide={() => this.setState({ modal: false })} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title > Confirmar </Modal.Title>
                </Modal.Header>
                {this.state.modificaModal || <Modal.Body>Status : &nbsp;{this.state.deferido}</Modal.Body>}
                {this.state.modificaModal && <Modal.Body>Salvar documento</Modal.Body>}
                <Modal.Footer>
                    <Link to="/minhas-requisicoes"> <Button onClick={(e) => this.atualizar()} variant="primary" className="btn btn-primary m-1" >Salvar</Button></Link>
                </Modal.Footer>
            </Modal>
        </div>);
    }
}
export default Parecer;