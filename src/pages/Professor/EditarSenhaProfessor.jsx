import React, { Component } from 'react';
import { get, put } from '../../services/ServicoCrud';
import SACEInput from '../../components/inputs/SACEInput';
import { Button, Alert } from 'react-bootstrap';


class EditarSenhaProfessor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "", username: "", id: "",
            novaSenha: "",confirmaSenhaInvalida:false,
            senhaInvalida:false,alert:false,msgPassword:""
        }
    }
    async componentDidMount() {
        const user = await get("usuarios/auth/")
        this.setState({
            id: user.id,
            username: user.username
        })
    }
    async editar() {
        console.log(this.state.senhaInvalida);
        console.log(this.state.msgPassword);
        
        if(this.state.password.trim() ===""?this.setState({ senhaInvalida:true,msgPassword:"Campo senha é obrigatório"}):this.setState({ senhaInvalida:false})){}
        if (this.state.password.length > 30) {
            this.setState({ senhaInvalida: true, msgPassword: "Limite máximo de cadastro de 30 caracteres" })
            return
        }
        if(this.state.password !== this.state.novaSenha || this.state.novaSenha.trim() ===""){
            this.setState({confirmaSenhaInvalida:true})
            return
        }
        put("usuarios/senha",this.state.id, {
                password:this.state.password
        }).then(()=>{this.setState({alert:true})})
        setTimeout(()=>{this.setState({alert:false})},3000)
        this.limpar()
    }
    limpar(){
        this.setState({confirmaSenhaInvalida:false,senhaInvalida:false,password:"",novaSenha:""})
    }

    render() {
        return (<div>
            <br /><br /><br />
            <Alert show={this.state.alert} variant={"success"}>Salvo com sucesso!</Alert>
            <h2>Alterar senha</h2>
            <SACEInput
                label={'Login'}
                value={this.state.username}
                disabled
            />
            <SACEInput
                label={'Senha'}
                value={this.state.password}
                placeholder={'Informe uma senha. '}
                onChange={(e) => this.setState({ password: e.target.value })}
                onError={this.state.senhaInvalida}
                onErrorMessage={this.state.msgPassword}
                type={"password"}
            />
            <SACEInput
                label={'Confirme a sua senha'}
                value={this.state.novaSenha}
                placeholder={'Informe a mesma senha que a anterior. '}
                onChange={(e) => this.setState({ novaSenha: e.target.value })}
                onError={this.state.confirmaSenhaInvalida}
                onErrorMessage={'As senhas não conferem! Favor inserir a mesma senha!'}
                type={"password"}
            /><br />
            <Button variant="primary" onClick={() => this.editar()}>Salvar</Button>&nbsp;
            <Button variant="danger" onClick={() => this.limpar()}>Limpar</Button>
        </div>);
    }
}

export default EditarSenhaProfessor;