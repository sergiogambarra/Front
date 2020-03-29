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

                <TituloPagina titulo="Cadastro de Alunos" />
                <SACEInput
                    label={'Nome'}
                    value={this.state.requisicao.usuario + ""}
                    disabled={true}

                />
                <SACEInput
                    label={'Data Requisição'}
                    value={this.state.requisicao.dataRequisicao}
                    disible={true}

                />
                {console.log(this.state.props)}
                
                <SACEInput
                    label={'Matricula'}
                    tipo="number"
                    min="0"
                    value={this.state.matricula}
                    placeholder={'Informe a sua matrícula. '}
                    onChange={(e) => this.setState({ matricula: e.target.value })}
                    onError={this.state.matriculaInvalida}
                    onErrorMessage={'Você não inseriu a sua matrícula corretamente!'}
                />

                <SACEInput
                    label={'Data de Ingresso'}
                    value={this.state.dataIngresso}
                    placeholder={'Informe a data de Ingresso. '}
                    onChange={(e) => this.setState({ dataIngresso: e.target.value })}
                    onError={this.state.dataIngressoInvalido}
                    onErrorMessage={'Você não inseriu uma data válida!'}
                    tipo={"date"}
                />
                <SACEInput
                    label={'Login'}
                    value={this.state.login}
                    placeholder={'Informe um login. '}
                    onChange={(e) => this.setState({ login: e.target.value })}
                    onError={this.state.loginInvalido}
                    onErrorMessage={'Você não inseriu um login válido!'}
                />
                <SACEInput
                    label={'Senha'}
                    value={this.state.senha}
                    placeholder={'Informe uma senha. '}
                    onChange={(e) => this.setState({ senha: e.target.value })}
                    onError={this.state.senhaInvalida}
                    onErrorMessage={'Você inseriu uma senha inválida!'}
                    tipo={"password"}
                />
                <SACEInput
                    label={'Confirme a sua senha'}
                    value={this.state.novaSenha}
                    placeholder={'Informe a mesma senha que a anterior. '}
                    onChange={(e) => this.setState({ novaSenha: e.target.value })}
                    onError={this.state.confirmaSenhaInvalida}
                    onErrorMessage={'As senhas não conferem! ou campo está vazio!'}
                    tipo={"password"}
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