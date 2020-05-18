import React, { Component } from 'react';
import { get, put } from '../../services/ServicoCrud';
import SACEInput from '../../components/inputs/SACEInput';
import { Button, Alert } from 'react-bootstrap';


class EditarSenha extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "", username: "", id: "",
            novaSenha: "",confirmaSenhaInvalida:false,
            senhaInvalida:false,alert:false,msgPassword:"",alterouSenha:false
        }
    }
    async componentDidMount() {
     
        const user = await get("usuarios/auth/");
        console.log(user);
        
        this.setState({
            id: user.id,
            username: user.username,
            alterouSenha:user.alterouSenha
        })
    }
    async editar() {
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
        }).then(()=>{this.setState({alert:true,alterouSenha:false})})
        setTimeout(()=>{this.setState({alert:false})},3000)
        this.limpar()
    }
    limpar(){
        this.setState({confirmaSenhaInvalida:false,senhaInvalida:false,password:"",novaSenha:""})
    }

    render() {
        return (<div>
            <br /><br /><br />
            {this.props.match.params.trocar && (()=> this.setState({alert:true}))}
        <Alert show={this.state.alert || this.state.alterouSenha} variant={this.state.alterouSenha ? "warning":"success"}>{this.state.alterouSenha ? "Troque sua senha !" : " Salvo com sucesso!"}</Alert>
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

export default EditarSenha;