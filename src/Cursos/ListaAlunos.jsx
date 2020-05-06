import React, { Component } from 'react'
import { get, getId } from './../services/ServicoCrud'
import { Button, Modal } from 'react-bootstrap'
import { delAluno, putAluno } from '../services/AlunoService';
import SACEInput from '../components/inputs/SACEInput';
import { format } from '../auxiliares/FormataData';

class ListaAlunos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alunos: [],
            mostraEditar: false,
            nome: "",
            matricula: "",
            dataIngresso: "",
            email: "",
            username: "",
            id: "", alert: false,  page: 0,
            last: false,
            first: true,
            total:0
        }
    }
    listarAlunos() {
        get("usuarios/alunos/").then((retorno) => {
            this.setState({ alunos: retorno })
            console.log(this.state.alunos);
        })
    }

    async buscaPeloId(e) {
        const usuario = await getId("usuarios/", e)
        this.setState({
            id: usuario.id,
            nome: usuario.perfil.nome,
            dataIngresso: usuario.perfil.dataIngresso,
            matricula: usuario.perfil.matricula,
            email: usuario.email,
            mostraEditar: true
        })
    }
    control(e){
        if(e.target.id === "+"){
            this.setState({page:this.state.page+1},()=>this.listarDisciplinas())
        }else{
            this.setState({page:this.state.page-1},()=>this.listarDisciplinas())
        }
    }

    componentDidMount() {
        this.listarAlunos()
    }
    editar(e) {
        console.log(this.state.nome);

        if (this.state.nome === "" || this.state.nome === null ? this.setState({ nomeInvalido: true }) : this.setState({ nomeInvalido: false })) { }
        if (this.state.matricula === "" || this.state.matricula === null || this.state.matricula <= 0 ? this.setState({ matriculaInvalida: true }) : this.setState({ matriculaInvalida: false })) { }
        if (this.state.email === "" || this.state.email === null ? this.setState({ emailInvalido: true }) : this.setState({ emailInvalido: false })) { }
        if (this.state.nome === null || this.state.nome === "" || this.state.email === "" || this.state.email === null || this.state.matricula === null || this.state.siape === null || this.state.matricula === "" || this.state.siape === ""|| this.state.matricula <= 0) {
            return
        }
        putAluno("usuarios", e,
            {
                email: this.state.email,
                perfil: {
                    nome: this.state.nome,
                    tipo: "ALUNO",
                    dataIngresso: this.state.dataIngresso,
                    matricula: this.state.matricula,
                    email: this.state.email
                }
            }).then(() => {
                this.setState({ mostraEditar: false });
                this.listarAlunos()
                this.limpar()
            })
    }
    limpar() {
        this.setState({ nomeInvalido: false, matriculaInvalida: false, emailInvalido: false })
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
                            <th scope="col">Data de Ingresso</th>
                            <th scope="col">Matrícula</th>
                            <th scope="col">E-mail</th>
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
                                    <td>{format(aluno.perfil.dataIngresso)}</td>
                                    <td>{aluno.perfil.matricula}</td>
                                    <td>{aluno.email}</td>
                                    <td> {aluno.perfil.nome === "" ? "" : <Button
                                        variant="primary"
                                        className="btn btn-danger m-1"
                                        onClick={(e) => this.setState({ modalShow: true, id: aluno.id, nome: aluno.perfil.nome, mostraEditar: false } , this.limpar())
                                    }
                                    > Apagar </Button>}
                                    </td>
                                    <td> {aluno.perfil.nome === "" ? "" : <a href={"#top"}> <Button
                                        variant="primary"
                                        className="btn btn-success m-1"
                                        onClick={() => this.buscaPeloId(aluno.id)}
                                    > Editar </Button></a>}
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>
                {this.state.mostraEditar && this.state.mostraEditar === true ? <>
                    <hr /><br /><br />

                    <h3 id={"top"} style={{ textAlign: 'center' }}>Formulário de Edição</h3>
                    <p >ID : <span style={{
                        color: 'red'
                    }}>{this.state.id}</span></p>
                    <SACEInput
                        autoFocus
                        label={'Nome'}
                        value={this.state.nome}
                        placeholder={'Informe o seu nome. '}
                        onChange={(e) => this.setState({ nome: e.target.value })}
                        onError={this.state.nomeInvalido}
                        onErrorMessage={'Você não inseriu o seu nome corretamente!'}
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
                        label={'Matrícula'}
                        tipo="number"
                        min="0"
                        value={this.state.matricula}
                        placeholder={'Informe a sua matrícula. '}
                        onChange={(e) => this.setState({ matricula: e.target.value })}
                        onError={this.state.matriculaInvalida}
                        onErrorMessage={'Você não inseriu a matrícula corretamente!'}
                    />
                    <SACEInput
                        label={'E-mail'}
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

                <Modal show={this.state.modalShow} onHide={() => this.setState({ modalShow: false })} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title > Confirmar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Apagar cadastro do aluno/aluna? </Modal.Body>
                    <Modal.Body>ID :&nbsp;{this.state.id} </Modal.Body>
                    <Modal.Body>Nome :&nbsp;{this.state.nome} </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary"
                            className="btn btn-danger m-1"
                            onClick={(e) => delAluno("usuarios", this.state.id).then(() => {
                                this.setState({ modalShow: false, mostraEditar: false, alert: true })
                                setTimeout(() => {
                                    this.setState({ alert: false })
                                }, 2000)
                                this.listarAlunos()
                            })}
                        > Apagar </Button>
                    </Modal.Footer>
                </Modal>
                {
                        <>
                            {this.state.first || <button id="-" onClick={(e) => this.control(e)}>Anterior</button>}
                            &nbsp;&nbsp;
                            {this.state.last  || <button id="+" onClick={(e) => this.control(e)}>Próximo</button>}

                            <span style={{float:"right"}}>Página  { this.state.page+1 } / {this.state.total}</span>
                        </>

                    }

            </div>
        );
    }
}

export default ListaAlunos;