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
                        this.state = {
                            id: "",
                            nome: "",
                            cargaHoraria: ""
                        }

                    ],
                    usuario: "",
                    anexos: [
                        this.state = {
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
                    disabled={true}

                />

                <SACEInput
                    label={'Deferido'}
                    placeholder={'Informe situação da requisição '}
                    value={this.state.deferido}
                    onChange={(e) => this.setState({ deferido: e.target.value })}
                    onError={this.state.dataIngressoInvalido}
                    onErrorMessage={'Você não inseriu uma data válida!'}

                />
                <SACEInput
                    label={'Parecer'}
                    placeholder={'Informe parecer do aluno '}
                    value={this.state.deferido}
                    onError={this.state.dataIngressoInvalido}
                    onErrorMessage={'Você não inseriu uma data válida!'}

                />

                <div className="row container" style={{ position: 'relative', left: '32%' }}>
                    <Button onClick={(e) => this.enviarCadastro(e)} className="btn btn-dark" data-toggle="modal" data-target="#exampleModal" style={{ border: "5px solid white" }}>Enviar</Button>
                    <Button onClick={() => this.limpar()} className="btn btn-danger" style={{ border: "5px solid white" }}>Limpar</Button>
                    <Link to="/login"> <Button variant="primary" className="btn btn-primary m-1" >Voltar </Button></Link>

                </div>
            </Form.Group>

        </div>);
    }
}
export default Parecer;