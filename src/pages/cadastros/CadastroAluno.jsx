import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import SACEInput from '../../../src//components/inputs/SACEInput';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import TituloPagina from '../../components/TituloPagina';
import { Form } from 'react-bootstrap';



class CadastroAluno extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: "",
            nomeInvalido: false,
            email: "",
            emailInvalido: false,
            matriculaInvalida: false,
            matricula: "",
            dataIngresso: "",
            dataIngressoInvalido: false,
            login: "",
            loginInvalido: false,
            senha: "",
            senhaInvalida: false,
            confirmaSenha: "",
            confirmaSenhaInvalida: false,
            tipo: ""
        }
    }
    limpar() {
        this.setState({
            nomeInvalido: false,
            emailInvalido: false,
            matriculaInvalida: false,
            dataIngressoInvalido: false,
            loginInvalido: false,
            senhaInvalida: false,
            confirmaSenhaInvalida: false,
        })
    }
    enviarCadastro(e) {
        console.log(this.state.nome,
            this.state.email,
            this.state.matricula,
            this.state.dataIngresso,
            this.state.login,
            this.state.senha,
            this.state.confirmaSenha)
        if (this.state.nome === "" || this.state.email || this.state.matricula || this.state.dataIngresso || this.state.login ||
            this.state.senha || this.state.confirmaSenha) {
            this.setState({
                nomeInvalido: true,
                emailInvalido: true,
                matriculaInvalida: true,
                dataIngressoInvalido: true,
                loginInvalido: true,
                senhaInvalida: true,
                confirmaSenhaInvalida: true,
            })
        }
        axios.post("/api/usuarios/aluno/", {
            tipo: "aluno",
            nome: this.state.nome,
            email: this.state.email,
            matricula: this.state.matricula,
            dataIngresso: this.state.dataIngresso,
            login: this.state.login,
            senha: this.state.senha,
            confirmaSenha: this.state.confirmaSenha,
        })
    }

    render() {
        return (
            <div>

                <Form.Group className="col-md-6 container">

                    <TituloPagina titulo="Cadastro de Alunos" />
                    <SACEInput
                        label={'Nome'}
                        placeholder={'Informe o seu nome. '}
                        onChange={(e) => this.setState({ nome: e.target.value })}
                        onError={this.state.nomeInvalido}
                        onErrorMessage={'Você não inseriu o seu nome corretamente!'}
                    />
                    <SACEInput
                        label={'Email'}
                        placeholder={'Informe o seu email. '}
                        onChange={(e) => this.setState({ email: e.target.value })}
                        onError={this.state.emailInvalido}
                        onErrorMessage={'Você não inseriu o seu email corretamente!'}
                    />
                    <SACEInput
                        label={'Matricula'}
                        placeholder={'Informe a sua matrícula. '}
                        onChange={(e) => this.setState({ matricula: e.target.value })}
                        onError={this.state.matriculaInvalida}
                        onErrorMessage={'Você não inseriu a sua matrícula corretamente!'}
                    />

                    <SACEInput
                        label={'Data de Ingresso'}
                        placeholder={'Informe a data de Ingresso. '}
                        onChange={(e) => this.setState({ dataIngresso: e.target.value })}
                        onError={this.state.dataIngressoInvalido}
                        onErrorMessage={'Você não inseriu uma data válida!'}
                        tipo={"date"}
                    />
                    <SACEInput
                        label={'Login'}
                        placeholder={'Informe um login. '}
                        onChange={(e) => this.setState({ login: e.target.value })}
                        onError={this.state.loginInvalido}
                        onErrorMessage={'Você não inseriu um login válido!'}
                    />
                    <SACEInput
                        label={'Senha'}
                        placeholder={'Informe uma senha. '}
                        onChange={(e) => this.setState({ senha: e.target.value })}
                        onError={this.state.senhaInvalida}
                        onErrorMessage={'Você inseriu uma senha inválida!'}
                        tipo={"password"}
                    />
                    <SACEInput
                        label={'Confirme a sua senha'}
                        placeholder={'Informe a mesma senha que a anterior. '}
                        onChange={(e) => this.setState({ senha: e.target.value })}
                        onError={this.state.confirmaSenhaInvalida}
                        onErrorMessage={'As senhas não conferem! Favor inserir a mesma senha!'}
                        tipo={"password"}
                    />

                    <div className="row container" style={{ position: 'relative', left: '32%' }}>
                        <Button onClick={(e) => this.enviarCadastro(e)} className="btn btn-dark" style={{ border: "5px solid white" }}>Enviar</Button>
                        <Button onClick={() => this.limpar()} className="btn btn-danger" style={{ border: "5px solid white" }}>Limpar</Button>
                        <Link to="/login"> <Button variant="primary" className="btn btn-primary m-1" >Voltar </Button></Link>
                    </div>
                </Form.Group>

            </div>
        );
    }
}

export default CadastroAluno;


