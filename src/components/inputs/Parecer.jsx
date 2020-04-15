import React, { Component } from 'react';
import SACEInput from '../../../src//components/inputs/SACEInput';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import TituloPagina from '../../components/TituloPagina';
import { Form } from 'react-bootstrap';
import { getRequisicaoId } from '../../services/RequisicaoService';
import { put } from '../../services/ServicoCrud';


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
            criterioAvaliacao: "", tipo: "",atualizarParecer:""

        }
    }
    async componentDidMount() {
        const c = await getRequisicaoId(this.props.match.params.id);
        this.setState({
            dataRequisicao: c.dataRequisicao,
            parecer: c.parecer,
            deferido: c.deferido,
            disciplinaSolicitada: c.disciplinaSolicitada,
            usuario: c.usuario.perfil.nome,
            anexos:c.anexos,
            formacaoAtividadeAnterior: c.formacaoAtividadeAnterior,
            criterioAvaliacao: c.criterioAvaliacao,
            tipo: c.tipo,
            titulo:""
        });
    }
    
    atualizar() {
        
        put("requisicoes",this.props.match.params.id, {
            tipo: this.state.tipo,
            deferido: this.state.deferido,
            parecer: this.state.parecer
            
        });
    }
    
    render() {
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
                    value={this.state.tipo==="aproveitamento"?"APROVEITAMENTO DE ESTUDOS":"CERTIFICAÇÃO DE CONHECIMENTOS"}
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
                        id={this.state.parecer}
                        onChange={(e) => this.setState({ parecer: e.target.value })}
                    />
                </Form.Group>

                <div className="row container" style={{ position: 'relative', left: '32%' }}>
                <Link to="/minhas-requisicoes">        <Button onClick={(e) => this.atualizar()} variant="primary" className="btn btn-primary m-1" data-toggle="modal" data-target="#exampleModal" style={{ border: "5px solid white" }}>Enviar</Button></Link>
                    <Link to="/minhas-requisicoes"> <Button variant="danger" className="btn btn-primary m-2" >Voltar </Button></Link>
                </div>

            </Form.Group>


        </div>);
    }
}
export default Parecer;