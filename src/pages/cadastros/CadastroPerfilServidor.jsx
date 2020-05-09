import React, { Component } from "react";
import SACEInput from '../../components/inputs/SACEInput';
import { Button, Alert } from 'react-bootstrap';
import TituloPagina from '../../components/TituloPagina';
import { Form } from 'react-bootstrap';
import { postCadastroUsuarioServidor, getPesquisaLogin } from '../../services/UsuarioService';

class CadastroPerfilServidor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: "",
            userName: "",
            password: "",
            novaSenha: "",
            siape: "",
            email: "",
            cargo: "",
            permissao: "SERVIDOR",
            isCoordenador: false,
            loginInvalido: false,
            confirmaSenhaInvalida: false,
            loginPesquisa: "",
            senhaInvalida: false,
            siapeInvalido: false,
            emailInvalido: false,
            cargoInvalido: false,
            nomeInvalido: false,
            modal: false,
            msgLogin: false,msgError:""
            
        }
    }
    
    async verifica() {
        await getPesquisaLogin(`usuarios/pesquisa/${this.state.userName}`).then((retorno) => {
            this.setState({ loginPesquisa: retorno })
            
        });
        console.log(this.state.cargo);
        
        if(this.state.cargo === null||this.state.cargo === ""?this.setState({msgError:"Você não inseriu o cargo corretamente"}):this.setState({msgError:""})){}
        if (this.state.nome === "" ? this.setState({ nomeInvalido: true }) : this.setState({ nomeInvalido: false })) { }
        if (this.state.cargo === "" ? this.setState({ cargoInvalido: true }) : this.setState({ cargoInvalido: false })) { }
        if (this.state.siape === "" ? this.setState({ siapeInvalido: true }) : this.setState({ siapeInvalido: false })) { }
        if (this.state.email === "" ? this.setState({ emailInvalido: true }) : this.setState({ emailInvalido: false })) { }
        if (this.state.password === "" ? this.setState({ senhaInvalida: true }) : this.setState({ senhaInvalida: false })) { }
        if (this.state.novaSenha === "" ? this.setState({ confirmaSenhaInvalida: true }) : this.setState({ confirmaSenhaInvalida: false })) { }
        if (this.state.userName === "") { this.setState({ loginInvalido: true }) }
        if (this.state.password !== this.state.novaSenha) { this.setState({ confirmaSenhaInvalida: true }) }
        if (this.state.loginPesquisa === this.state.userName.toUpperCase()) { this.setState({ loginInvalido: true }) }
        if (this.state.userName !== "" && this.state.email !== "" && this.state.siape !== "" && this.state.password !== ""
        && this.state.login !== "" && this.state.password === this.state.novaSenha) {
            if (this.state.loginPesquisa === this.state.userName.toUpperCase()) { this.setState({ loginInvalido: true }); return }
            if(this.state.nomeInvalido === true|| this.state.siapeInvalido  === true||this.state.emailInvalido  === true||this.state.loginInvalido === true||
                this.state.confirmaSenhaInvalida  === true||this.state.senhaInvalida === true|| this.state.msgError === "Você não inseriu o cargo corretamente"){return}
            postCadastroUsuarioServidor({
                password: this.state.password,
                userName: this.state.userName,
                email: this.state.email,
                isCoordenador: this.state.isCoordenador,
                nome: this.state.nome,
                permissao: this.state.permissao,
                siape: this.state.siape,
                cargo: this.state.cargo
            }).then(() => {
                this.setState({ modal: true})
                setTimeout(() => {
                    this.setState({ modal: false })
                }, 3000)
                this.limpar()
                
            })
            
            return
        }
    }
    
    
    
    limpar() {
        this.setState({
            msgError:"",
            confirmaSenha: "",
            nomeInvalido: false,
            siapeInvalido: false,
            emailInvalido: false,
            loginInvalido: false,
            senhaInvalida: false,
            isCoordenador: false,
            confirmaSenhaInvalida: false,
            nome: "",
            siape: "",
            email: "",
            userName: "",
            password: "",
            novaSenha: "",
            cargo: ""
        })
    }
    
    
    
    render() {
        return (
            <Form.Group className="col-md-6 container">
                <TituloPagina titulo="Cadastrar Servidor" />
                <Alert key={"idx"} variant={"success"} show={this.state.modal}>Cadastrado com Sucesso</Alert>
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
                    label={'SIAPE'}
                    value={this.state.siape}
                    placeholder={'Informe a sua siape. '}
                    onChange={(e) => this.setState({ siape: e.target.value })}
                    onError={this.state.siapeInvalido}
                    onErrorMessage={'Você não inseriu a seu siape corretamente!'}
                    />
                <SACEInput
                    label={'E-mail'}
                    value={this.state.email}
                    placeholder={'Informe o seu E-mail. '}
                    onChange={(e) => this.setState({ email: e.target.value })}
                    onError={this.state.emailInvalido}
                    onErrorMessage={'Você não inseriu o seu email corretamente!'}
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
                    <option value="SERVIDOR" selected={true}>Servidor</option>
                    <option value="PROFESSOR">Professor</option>
                </select>
                <Form.Text className="text-danger">{this.state.msgError} </Form.Text>
                <br />
                <br />
                {this.state.cargo === "PROFESSOR" &&
                    <Form.Check type="switch" id="custom-switch" label="Cordenador" value={this.state.isCoordenador}
                        onChange={() => this.setState({ isCoordenador: !this.state.isCoordenador })} />}
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
                    <Button onClick={(e) => this.verifica(e)} variant="primary" className="btn btn-primary m-1">Salvar</Button>
                    <Button onClick={() => this.limpar()} variant="danger"className="btn btn-primary m-1" >Limpar</Button>
                </div>
            </Form.Group>

        );
    }
}

export default CadastroPerfilServidor;