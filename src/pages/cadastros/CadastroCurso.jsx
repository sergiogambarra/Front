import React, { Component } from 'react';
import SACEInput from '../../components/inputs/SACEInput';
import { Form, Button, } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert'
import { post,  put, getId, get } from '../../services/ServicoCrud';


export default class CadastroCurso extends Component {
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
     
                <br /><br />
                <Alert key={"idx"} variant={"success"} show={this.state.modal}>Cadastrado com sucesso</Alert>
                <fieldset>
                    <h2>Cadastrar Curso</h2>
                    <br />
                    <SACEInput label={'Nome do Curso'} value={this.state.nome} placeholder={'Preencha com o nome do curso que você deseja cadastrar'}
                        onChange={(e) => this.setState({ nome: e.target.value })} onError={this.state.texto} onErrorMessage={'Nome do curso não encontrado'} />
                    <Form.Group className="d-flex justify-content-end">
                        {this.state.editar === false ? <Button className="btn btn-primary m-1" onClick={() => this.enviar()}>
                        Salvar  </Button> : <Button className="btn btn-primary m-1" onClick={(e) => this.atualizar()} >Confirmar editar</Button>}
                        <Button variant="danger" className="btn btn-primary m-1" onClick={() => this.limpar()}> Limpar </Button>
                    </Form.Group>
                </fieldset >
            </div>
        );
    }
}