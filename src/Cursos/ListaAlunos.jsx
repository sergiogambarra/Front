import React, { Component } from 'react'
import { get, getId } from './../services/ServicoCrud'
import { Button } from 'react-bootstrap'
import { delAluno,putAluno } from '../services/AlunoService';
import SACEInput from '../components/inputs/SACEInput';

class ListaAlunos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alunos: [],
            mostraEditar: false,
            nome: "",
            matricula: "",
            email: "",
            username: "",
            id:""
        }
    }
    listarAlunos() {
        get("usuarios/alunos/").then((retorno) => {
            this.setState({ alunos: retorno })
        })
    }

    async buscaPeloId(e) {
        const usuario = await getId("usuarios/", e)
        this.setState({
            
            id:usuario.id,
            nome: usuario.perfil.nome,
            matricula: usuario.perfil.matricula,
            email: usuario.perfil.email,
            mostraEditar: true
        })
    }

    componentDidMount() {
        this.listarAlunos()
    }
    editar(e) {
    console.log(this.state.nome);
    console.log(this.state.matricula);
    console.log(this.state.email);
    
        putAluno("usuarios",e,
        {tipo:"ALUNO",
        nome:this.state.nome,
         matricula:this.state.matricula,
         email:this.state.email,
        }
        )
    }
    render() {
        return (
            <div>
                <br /><br />
                <h3>Alunos </h3>
                <table className="table">
                    <thead className="p-3 mb-2 bg-primary text-white">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Matrícula</th>
                            <th scope="col">Email</th>
                            <th scope="col">Login</th>
                            <th scope="col">Apagar</th>
                            <th scope="col">Editar</th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.state.alunos &&
                            this.state.alunos.map((aluno) =>
                                <tr key={aluno.id}>
                                    <td>{aluno.id}</td>
                                    <td>{aluno.perfil.nome}</td>
                                    <td>{aluno.perfil.matricula}</td>
                                    <td>{aluno.perfil.email}</td>
                                    <td>{aluno.username}</td>
                                    <td> {aluno.perfil.nome === "" ? "" : <Button
                                        variant="primary"
                                        className="btn btn-danger m-1"
                                        onClick={(e) => delAluno("usuarios", aluno.id).then(() => { this.listarAlunos() })}
                                    > Deletar </Button>}
                                    </td>
                                    <td> {aluno.perfil.nome === "" ? "" : <Button
                                        variant="primary"
                                        className="btn btn-success m-1"
                                        onClick={() => this.buscaPeloId(aluno.id)}
                                    > Editar </Button>}
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>
                {this.state.mostraEditar && this.state.mostraEditar === true ? <>
                    <SACEInput
                        label={'Nome'}
                        value={this.state.nome}
                        placeholder={'Informe o seu nome. '}
                        onChange={(e) => this.setState({ nome: e.target.value })}
                        onError={this.state.nomeInvalido}
                        onErrorMessage={'Você não inseriu o seu nome corretamente!'}
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
                        label={'Email'}
                        value={this.state.email}
                        placeholder={'Informe o seu email. '}
                        onChange={(e) => this.setState({ email: e.target.value })}
                        onError={this.state.emailInvalido}
                        onErrorMessage={'Você não inseriu o seu email corretamente!'}
                    />

                    <Button
                        variant="primary"
                        className="btn btn-primary m-1"
                        onClick={() => this.editar(this.state.id)}
                    > Salvar </Button>

                </> : ""}
            </div>
        );
    }
}

export default ListaAlunos;