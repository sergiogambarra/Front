import React, { Component } from "react";
import axios from 'axios';
import SACEInput from '../../../src//components/inputs/SACEInput';
import { Button, Alert } from 'react-bootstrap';
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
            cordenador: "",
            modal:false
            
            
        }
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
                if (this.state.siape === "") {
                    this.setState({
                        siapeInvalido: true
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
            this.setState({ modal: true })
            setTimeout(()=>{
                this.setState({modal:false})
            },3000)
            this.limpar() })

    }

    limpar() {
        this.setState({
            confirmaSenha: "",
            nomeInvalido: false,
            emailInvalido: false,
            siapeInvalido: false,
            loginInvalido: false,
            senhaInvalida: false,
            confirmaSenhaInvalida: false,
            nome:"",
            siape:"",
            login:"",
            senha:"",
            email:"",
            novaSenha:""

        })
    }
    render() {
        return (
            <Form.Group className="col-md-6 container">

                <TituloPagina titulo="Cadastro Servidor" />
                <Alert key={"idx"}variant={"success"} show={this.state.modal}>Cadastrado com Sucesso</Alert>
                <SACEInput
                    label={'Nome'}
                    value={this.state.nome}
                    placeholder={'Informe o seu nome. '}
                    onChange={(e) => this.setState({ nome: e.target.value })}
                    onError={this.state.nomeInvalido}
                    onErrorMessage={'Você não inseriu o seu nome corretamente!'}
                />
                <SACEInput
                    tipo={"email"}
                    value={this.state.email}
                    label={'Email'}
                    placeholder={'Informe o seu email. '}
                    onChange={(e) => this.setState({ email: e.target.value })}
                    onError={this.state.emailInvalido}
                    onErrorMessage={'Você não inseriu o seu email corretamente!'}
                />
                <SACEInput
                    tipo={"number"}
                    min="0"
                    label={'Siape'}
                    value={this.state.siape}
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
                    <option value="professor">Cordenador</option>

                </select>
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