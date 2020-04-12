import React, { Component } from 'react';
import SACEInput from '../../../src//components/inputs/SACEInput';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import TituloPagina from '../../components/TituloPagina';
import { Form } from 'react-bootstrap';
import { getRequisicaoId } from '../../services/RequisicaoService';


class Parecer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
                dataRequisicao: "",
                parecer: "",
                deferido: "escolha",
                disciplinaSolicitada: "",
                usuario: "",
                anexos: [],
                formacaoAtividadeAnterior: "",
                criterioAvaliacao: "", tipo: ""
            
        }
    }
    async componentDidMount() {
        console.log(this.props.match.params.id);
            const c = await getRequisicaoId(this.props.match.params.id);
           this.setState({
            dataRequisicao: c.dataRequisicao,
            parecer: c.parecer,
            deferido: c.deferido,
            disciplinaSolicitada: c.disciplinaSolicitada,
            usuario: c.usuario.perfil.nome,
            anexos: [],
            formacaoAtividadeAnterior: c.formacaoAtividadeAnterior,
            criterioAvaliacao: c.criterioAvaliacao, 
            tipo: c.tipo

           });
        this.trocaNomeTipo();
    }

    atualizar() {
      
    }
    trocaNomeTipo() {
            if (this.state.tipo === "certificacao") {
                this.setState({ tipo: "Certificação de conhecimentos" })
        }
            if (this.state.tipo === "aproveitamento") {
                this.setState({ tipo: "Aproveitamentos de estudos" })
        }
    }
    
    render() {
        console.log(this.state);
        return (<div>
            <Form.Group className="col-md-6 container">

                <TituloPagina titulo="Parecer da Requisisão" />
                <SACEInput
                    label={'Aluno'}
                    value={this.state.usuario}
                    disabled={true}

                />
                <SACEInput
                    label={'Data de cadastro da requiisição'}
                    value={this.state.dataRequisicao}
                    disabled={true}

                />
                <SACEInput
                    label={'Tipo'}
                    value={this.state.tipo}
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
                        value={this.stateparecer}
                        disabled={true}
                    />
                </Form.Group>
                <div style={{ fontSize: "200%" }}> Modificar Status </div>
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
                    <input type="radio" id="AGUARDANDO DOCUMENTOS" name="customRadioInline1" class="custom-control-input"
                        onChange={(e) => this.setState({ deferido: e.target.id })}
                        defaultChecked={false}
                    />
                    <label class="custom-control-label" for="AGUARDANDO DOCUMENTOS">Aguardando documentos</label><br /><br />
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
                        id={this.state.parecer}
                        value={this.state.parecer}
                        onChange={(e) => this.setState({ parecer: e.target.value })}
                    />
                </Form.Group>

                <div className="row container" style={{ position: 'relative', left: '32%' }}>
                    <Link to="/minhas-requisicoes"> <Button onClick={(e) => this.atualizar()} className="btn btn-dark" data-toggle="modal" data-target="#exampleModal" style={{ border: "5px solid white" }}>Enviar</Button></Link>
                    <Link to="/minhas-requisicoes"> <Button variant="primary" className="btn btn-primary m-1" >Voltar </Button></Link>
                </div>

            </Form.Group>


        </div>);
    }
}
export default Parecer;