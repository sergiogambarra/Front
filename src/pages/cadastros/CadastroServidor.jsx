import React, { Component } from "react";
import axios from 'axios';
import SACEInput from '../../../src//components/inputs/SACEInput';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import TituloPagina from '../../components/TituloPagina';
import { Form } from 'react-bootstrap';


class CadastroServidor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: "",
            nomeInvalido: false,
            email: "",
            emailInvalido: false,
            login: "",
            loginInvalido: false,
            senha: "",
            senhaInvalida: false,
            confirmaSenhaInvalida: false,
            tipo: "",
            novaSenha: "",
            siape: "",
            siapeInvalido: false,
            cargo: "",
            cargoInvalido: false,
            cordenador: ""


        }
    }

    enviarCadastro(e) {
        if (this.state.nome === "") {
            this.setState({
                nomeInvalido: true
            })
        }
        if (this.state.email === "") {
            this.setState({
                emailInvalido: true
            })
        } if (this.state.siape === "") {
            this.setState({
                siapeInvalido: true
            })
        } if (this.state.login === "") {
            this.setState({
                loginInvalido: true
            })
        }
        if (this.state.senha === "") {
            this.setState({
                senhaInvalida: true
            })
        }
        if (this.state.novaSenha === "") {
            this.setState({
                confirmaSenhaInvalida: true
            })
        }
        axios.post("/api/usuarios/", {
            tipo: "servidor",
            nome: this.state.nome,
            login: this.state.login,
            senha: this.state.senha,
            novaSenha: this.state.novaSenha,
            email: this.state.email,
            siape: this.state.siape,
            cargo: this.state.cargo,
        }).then(() => {
            this.limpar()
        }
        )
    }

    limpar() {
        this.setState({
            confirmaSenha: "",
            nomeInvalido: false,
            emailInvalido: false,
            siapeInvalido: false,
            loginInvalido: false,
            senhaInvalida: false,
            confirmaSenhaInvalida: false
        })
        window.location.reload(); 
    }
    render() {
        return (
            <Form.Group className="col-md-6 container">

                <TituloPagina titulo="Cadastro Servidor" />
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
                    label={'Siape'}
                    placeholder={'Informe a sua siape. '}
                    onChange={(e) => this.setState({ siape: e.target.value })}
                    onError={this.state.siapeInvalido}
                    onErrorMessage={'Você não inseriu a seu siape corretamente!'}
                />
                <label >Cargo</label>
                <select class="custom-select"
                    onChange={(e) =>
                        this.setState({
                            cargo: e.target.value
                        })
                    }
                >
                    <option></option>
                    <option value="servidor">Servidor</option>
                    <option value="professor">Professor</option>

                </select>
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
                    onChange={(e) => this.setState({ novaSenha: e.target.value })}
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

        );
    }
}

export default CadastroServidor;