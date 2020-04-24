import React, { Component } from 'react';
import { get, put } from '../../services/ServicoCrud';
import SACEInput from '../../components/inputs/SACEInput';
import { Button } from 'react-bootstrap';


class EditarSenhaProfessor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "", username: "", id: "",
            novaSenha: ""
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
        put("usuarios/senha",this.state.id, {
                password:this.state.password
        })
    }

    render() {
        return (<div>
            <br /><br /><br />
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
            <Button variant="primary" onClick={() => this.editar()}>Salvar</Button>
        </div>);
    }
}

export default EditarSenhaProfessor;