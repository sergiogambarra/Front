import React, { Component } from 'react';
import SACEInput from '../../../src//components/inputs/SACEInput';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import TituloPagina from '../../components/TituloPagina';
import { Form } from 'react-bootstrap';
import axios from 'axios';

class Parecer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requisicao: [
                this.state = {
                    dataRequisicao: "",
                    parecer: "",
                    deferido: "",
                    disciplinaSolicitada: [
                        {
                            id: "",
                            nome: "",
                            cargaHoraria: ""
                        }],
                    usuario: "",
                    anexos: [{
                        nome: ""
                    }
                    ],
                    formacaoAtividadeAnterior: "",
                    criterioAvaliacao: ""
                }
            ]
        }
    }
    async componentDidMount() {
        await axios.get(`/api/requisicoes/${this.props.match.params.id}`).then((retorno) =>
            this.setState({ requisicao: retorno.data })
        )

    }
    limpar() {
        this.setState({
            parecer: ""
        })
    }
    render() {
        return (<div>
            <Form.Group className="col-md-6 container">

                <TituloPagina titulo="Parecer do Aluno" />
                <SACEInput
                    label={'Nome'}
                    value={this.state.requisicao.usuario + ""}
                    disabled={true}

                />
                <SACEInput
                    label={'Data Requisição'}
                    value={this.state.requisicao.dataRequisicao}
                    disabled={true} />
                <SACEInput
                    label={'Nome da disciplina'}
                    disabled={true} />

                <div>Status </div>
                <br />
                <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio"
                        id="deferido" name="customRadioInline1" class="custom-control-input"
                    />
                    <label class="custom-control-label" for="deferido">Deferido</label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="indeferido" name="customRadioInline1" class="custom-control-input"
                        onChange={(e) => this.setState({ requisições: e.target.id, cont: "" })}
                    />
                    <label class="custom-control-label" for="indeferido">Indeferido</label><br /><br />
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="indeferido" name="customRadioInline1" class="custom-control-input"
                        onChange={(e) => this.setState({ requisições: e.target.id, cont: "" })}
                    />
                    <label class="custom-control-label" for="indeferido">Analisando</label><br /><br />
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="indeferido" name="customRadioInline1" class="custom-control-input"
                        onChange={(e) => this.setState({ requisições: e.target.id, cont: "" })}
                    />
                    <label class="custom-control-label" for="indeferido">Aguardando documento</label><br /><br />
                </div>
                <br />
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Parecer</Form.Label>
                    <Form.Control as="textarea" rows="3"
                        id={this.state.parecer}
                        value={this.state.parecer}
                        onChange={(e) => this.setState({ parecer: e.target.value })}
                    />
                </Form.Group>
                {console.log(this.state.requisicao.disciplinaSolicitada)
                }
                <div className="row container" style={{ position: 'relative', left: '32%' }}>
                    <Button onClick={(e) => this.enviarCadastro(e)} className="btn btn-dark" data-toggle="modal" data-target="#exampleModal" style={{ border: "5px solid white" }}>Enviar</Button>
                    <Button onClick={() => this.limpar()} className="btn btn-danger" style={{ border: "5px solid white" }}>Limpar</Button>
                    <Link to="/minhas-requisicoes"> <Button variant="primary" className="btn btn-primary m-1" >Voltar </Button></Link>

                </div>
            </Form.Group>

        </div>);
    }
}
export default Parecer;