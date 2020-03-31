import React, { Component } from 'react';
import axios from 'axios';
import SACEInput from '../../../src//components/inputs/SACEInput';
import { Button, Alert } from 'react-bootstrap';
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
            tipo: "",
            novaSenha: "",
            modal: false
        }
    }

    limpar() {
        this.setState({
            nome: "",
            email: "",
            matricula: "",
            dataIngresso: "",
            login: "",
            senha: "",
            novaSenha: "",
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
        if (this.state.nome === "") {
            this.setState({
                nomeInvalido: true
            })
        } else
            if (this.state.email === "") {
                this.setState({
                    emailInvalido: true
                })
            } else
                if (this.state.matricula === "" || this.state.matricula <= 0) {
                    this.setState({
                        matriculaInvalida: true
                    })
                } else
                    if (this.state.dataIngresso === "") {
                        this.setState({
                            dataIngressoInvalido: true
                        })
                    } else
                        if (this.state.login === "") {
                            this.setState({
                                loginInvalido: true
                            })
                        } else
                            if (this.state.senha === "") {
                                this.setState({
                                    senhaInvalida: true
                                })
                            } else
                                if (this.state.novaSenha === "" || this.state.senha !== this.state.novaSenha) {
                                    this.setState({
                                        confirmaSenhaInvalida: true
                                    })
                                } else
                                    axios.post("/api/usuarios/aluno/", {
                                        tipo: "aluno",
                                        nome: this.state.nome,
                                        email: this.state.email,
                                        matricula: this.state.matricula,
                                        dataIngresso: this.state.dataIngresso,
                                        login: this.state.login,
                                        novaSenha: this.state.novaSenha,
                                        senha: this.state.senha,
                                    }).then(() => {
                                        this.setState({ modal: true })
                                        setTimeout(()=>{
                                            this.setState({modal:false})
                                        },3000)
                                        this.limpar() })

    }


    render() {
        return (
            <div>
                <Form.Group className="col-md-6 container">

                    <TituloPagina titulo="Cadastro de Alunos" />
                    <Alert key={"idx"} variant={"success"} show={this.state.modal}>
                        Cadastrado com sucesso</Alert>
                    <SACEInput
                        label={'Nome'}
                        value={this.state.nome}
                        placeholder={'Informe o seu nome. '}
                        onChange={(e) => this.setState({ nome: e.target.value })}
                        onError={this.state.nomeInvalido}
                        onErrorMessage={'Você não inseriu o seu nome corretamente!'}
                    />
                    <SACEInput
                        label={'Email'}
                        value={this.state.email}
                        placeholder={'Informe o seu email. '}
                        onChange={(e) => this.setState({ email: e.target.value })}
                        onError={this.state.emailInvalido}
                        onErrorMessage={'Você não inseriu o seu email corretamente!'}
                    />
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
                </Form.Group> </div>
        );
    }
}

export default CadastroAluno;


