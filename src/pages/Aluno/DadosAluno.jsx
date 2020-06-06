import React, { Component } from 'react';
import {  get, getId } from '../../services/ServicoCrud';
import SACEInput from '../../../src//components/inputs/SACEInput';

class DadosAluno extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                id:"",nome:"",dataIngresso:"",matricula:"",email:""
            }
        }
    }

    async componentDidMount() {
        this.listaAth()
        this.buscaPeloId()
    }
    async listaAth() {
        await get("usuarios/auth/").then((r) => {
            this.setState({ user: r ,id:r.id})
        })
        this.buscaPeloId()
    }
    async buscaPeloId() {
      await getId("usuarios/", this.state.id).then((retorno) => {
            this.setState({
                id: retorno&&retorno.id,
                nome: retorno&&retorno.perfil.nome,
                dataIngresso: retorno&&retorno.perfil.dataIngresso,
                matricula: retorno&&retorno.perfil.matricula,
                email: retorno&&retorno.email,
            })
        })
    }

    render() {
        return (<div>

            <br /><br /><br />
            <u><h3 style={{ textAlign: "center" }}>Dados do Aluno</h3></u>
        <strong> ID da aluno :<span style={{ color: "red" }}>&nbsp;{this.state.id}</span></strong>
            <SACEInput
                label={'Nome'}
                value={this.state.nome}
                disabled={true}
            />
            <SACEInput
                label={'Matrícula'}
                value={this.state.matricula}
                disabled={true}
            />
            <SACEInput
                label={'Email'}
                value={this.state.email}
                disabled={true}
            />


        </div>);
    }
}

export default DadosAluno;