import React, { Component } from "react";
import SACEInput from '../../components/inputs/SACEInput';
import { Button, Alert } from 'react-bootstrap';
import TituloPagina from '../../components/TituloPagina';
import { Form,Modal } from 'react-bootstrap';
import { postCadastroUsuario } from '../../services/AlunoService';
import { get } from "../../services/ServicoCrud";


class CadastroPerfilServidor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: "",
            userName: "",
            password: "",
            novaSenha: "",
            siape: "",
            cargo: "",
            permissao: "SERVIDOR",
            isCordenador: false,
            loginInvalido: "",
            confirmaSenhaInvalida: false,
            senhaInvalida: false,
            siapeInvalido: false,
            cargoInvalido: false,
            nomeInvalido: false,
            alert: false,
            msgLogin: false,
            modalShow:false,
            loginPesquisa:""

        }
    }

    
    async verifica() {
              await get(`usuarios/pesquisa/${this.state.userName}`).then((r)=>{
                this.setState({ loginPesquisa:r})})
        if (this.state.nome === "" ? this.setState({ nomeInvalido: true }) : this.setState({ nomeInvalido: false })) { }
        if (this.state.cargo === "" ? this.setState({ cargoInvalido: true }) : this.setState({ cargoInvalido: false })) { }
        if (this.state.siape === "" ? this.setState({ siapeInvalido: true }) : this.setState({ siapeInvalido: false })) { }
        if (this.state.password === "" ? this.setState({ senhaInvalida: true }) : this.setState({ senhaInvalida: false })) { }
        if (this.state.novaSenha === "" ? this.setState({ confirmaSenhaInvalida: true }) : this.setState({ confirmaSenhaInvalida: false })) { }
        if (this.state.userName === "" ? this.setState({ loginInvalido: true }) : this.setState({ loginInvalido: false })) { }
        if (this.state.password !== this.state.novaSenha) { this.setState({ confirmaSenhaInvalida: true }) }
        if ( this.state.loginPesquisa ===  this.state.userName.toUpperCase()) { this.setState({ loginInvalido: true })}
        if(this.state.nome !== "" && this.state.cargo !== "" && this.state.siape !== "" && this.state.password !== "" && this.state.userName !== "" &&
          this.state.novaSenha !== ""){this.setState({modalShow:true})}
          
    }
    async enviarCadastro() {
        postCadastroUsuario({
            password: this.state.password,
            userName: this.state.userName,
            isCordenador: this.state.isCordenador,
            nome: this.state.nome,
            permissao: this.state.permissao,
            siape: this.state.siape,
            cargo: this.state.cargo
        }).then(() => {
            this.setState({ alert: true,modalShow:false })
            setTimeout(() => {
                this.setState({ alert: false })
            }, 2000)
            this.limpar()
        })
    }


    limpar() {
        this.setState({
            confirmaSenha: "",
            nomeInvalido: false,
            siapeInvalido: false,
            loginInvalido: false,
            senhaInvalida: false,
            isCordenador: false,
            confirmaSenhaInvalida: false,
            nome: "",
            siape: "",
            userName: "",
            password: "",
            novaSenha: "",
            cargo: ""
        })
    }

    render() {
        return (
            <Form.Group className="col-md-6 container">
                <TituloPagina titulo="Cadastro Servidor" />
                <Alert key={"idx"} variant={"success"} show={this.state.alert}>Cadastrado com Sucesso</Alert>
                <SACEInput
                    label={'Nome'}
                    value={this.state.nome}
                    placeholder={'Informe o seu nome. '}
                    onChange={(e) => this.setState({ nome: e.target.value })}
                    onError={this.state.nomeInvalido}
                    onErrorMessage={'Você não inseriu o seu nome corretamente!'}
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
                <select class="custom-select" value={this.state.cargo}
                    onChange={(e) => {
                        this.setState({
                            cargo: e.target.value,
                            permissao: e.target.value
                        })
                    }
                    }
                >
                    <option ></option>
                    <option value="SERVIDOR" >Servidor</option>
                    <option value="PROFESSOR">Professor</option>

                </select>
                <br />
                <br />
                {this.state.cargo === "PROFESSOR" &&
                    <Form.Check type="switch" id="custom-switch" label="Cordenador" value={this.state.isCordenador}
                        onChange={() => this.setState({ isCordenador: !this.state.isCordenador })} />}
                <SACEInput
                    label={'Login'}
                    value={this.state.userName}
                    placeholder={'Informe um login. '}
                    onChange={(e) => this.setState({ userName: e.target.value })}
                    onError={this.state.loginInvalido}
                    onErrorMessage={'Campo obrigatório ou nome de login já existe!'}
                />
                <SACEInput
                    label={'Senha'}
                    value={this.state.password}
                    placeholder={'Informe uma senha. '}
                    onChange={(e) => this.setState({ password: e.target.value })}
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
                    <Button variant="primary" className="btn btn-primary m-1" onClick={() => this.verifica()}> Enviar </Button>
                    <Modal show={this.state.modalShow} onHide={() => this.setState({ modalShow: false })} animation={false}>
                        <Modal.Header closeButton>
                            <Modal.Title > Confirmar</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Confira seus dados você antes de salvar</Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={() => this.setState({ modalShow: false })}>  Fechar </Button>
                            <Button onClick={() => this.enviarCadastro()} className="btn btn-primary m-1" data-toggle="modal" data-target="#exampleModal" style={{ border: "5px solid white" }}>Salvar</Button>
                        </Modal.Footer>
                    </Modal>
                    <Button onClick={() => this.limpar()} className="btn btn-danger" style={{ border: "5px solid white" }}>Limpar</Button>
                </div>
            </Form.Group>

        );
    }
}

export default CadastroPerfilServidor;