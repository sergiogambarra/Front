import React, { Component } from 'react';
import SACEInput from '../../components/inputs/SACEInput';
import { Form, Button, } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert'
import { post, del, put, getId, get } from '../../services/ServicoCrud';


export default class ListaCursos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cursos: [],
            nome: "",
            id: "",
            editar: false,
            texto: false,
            modal: false,
        }
    }
    async listarCursos() {
        const cursosLista = await get("cursos/");
        this.setState({ cursosLista });
    }

    async listarCursosId(id) {    
        const curso = await getId("cursos/", id);
        this.setState({ nome: curso.nome, id: id, editar: true });
    }

 async componentDidMount() {
        this.listarCursos();
    }

    enviar() {
        if (this.state.nome === "") {
            this.setState({
                texto: true
            })
        }
        post("cursos/", { nome: this.state.nome }).then((r) => {
            
            if (this.state.nome === "") { return }
            this.setState({ modal: true })
            setTimeout(() => {
                this.setState({ modal: false })
            }, 2000)
            this.listarCursos();
            this.limpar();
        })
    }
        atualizar() {
        put("cursos",this.state.id, { nome: this.state.nome }).then(() => {
            this.setState({ modal: true })
            setTimeout(() => {
                this.setState({ modal: false })
            }, 2000)
            this.listarCursos()
            this.limpar();
            console.log("nhjiuohj");
            
        })
    }


    limpar() {
        this.setState({
            nome: "",
            texto: false,
            editar: false
        })
    }

    render() {
        return (
            <div>
                <br />
                <br />
                <h2>Lista de Cursos cadastrados</h2>
                <table className="table">
                    <thead className="p-3 mb-2 bg-primary text-white">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Apagar</th>
                            <th scope="col">Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.cursosLista && this.state.cursosLista.map((curso) =>
                            <tr key={curso.id + curso.nome}>
                                <td>{curso.id}</td>
                                <td><Link to="/cadastrar-disciplina">{curso.nome}</Link></td>
                                <td> <Button variant="primary" className="btn btn-danger m-1"
                                    onClick={() => { del("cursos", curso.id).then(() => { this.listarCursos() }) }}>
                                    Deletar
                                        </Button>
                                </td>
                                <td>
                                 <a href={"#top"}> <Button id={curso.id} type="button" className="btn btn-success m-1"
                                        onClick={(e) => this.listarCursosId(e.target.id)}> Editar </Button></a>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <hr/>
                <br /><br />
                <Alert key={"idx"} variant={"success"} show={this.state.modal}>Cadastrado com sucesso</Alert>
                <fieldset>
                    {this.state.editar===true?<h3 id={"top"}style={{textAlign:"center"}}>Formulário de edição</h3>:""}
                    <SACEInput label={'Nome do Curso'} value={this.state.nome} placeholder={'Preencha com o nome do curso que você deseja cadastrar'}
                        onChange={(e) => this.setState({ nome: e.target.value })} onError={this.state.texto} onErrorMessage={'Nome do curso não encontrado'} />
                    <Form.Group className="d-flex justify-content-end">
                        {this.state.editar === false ? <Button className="btn btn-primary m-1" onClick={() => this.enviar()}>
                            Enviar  </Button> : <Button className="btn btn-primary m-1" onClick={(e) => this.atualizar()} >Confirmar editar</Button>}
                        <Button variant="danger" className="btn btn-primary m-1" onClick={() => this.limpar()}> Limpar </Button>
                    </Form.Group>
                </fieldset >
            </div>
        );
    }
}