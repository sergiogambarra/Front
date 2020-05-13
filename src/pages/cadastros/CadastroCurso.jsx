import React, { Component } from 'react';
import SACEInput from '../../components/inputs/SACEInput';
import { Form, Button, } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert'
import { post, get } from '../../services/ServicoCrud';


export default class CadastroCurso extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cursos: [],
            nome: "",
            modal: false,
            mgsErro: ""
        }
    }
    async listarCursos() {
        const cursosLista = await get("cursos/");
        this.setState({ cursosLista });
    }

    async componentDidMount() {
        this.listarCursos();
    }

    enviar() {
        post("cursos/", { nome: this.state.nome }).then((r) => {
            this.setState({ nome: this.state.nome })
            if (this.state.nome.trim() === "") {
                this.setState({ texto: true, mgsErro: "Campo nome é obrigatório" })
                return
            }
            if(this.state.nome.length > 45){
                this.setState({ texto: true, mgsErro: "Limite máximo de 45 caracteres para cadastro" })
                return
            }
            this.setState({ modal: true })
            setTimeout(() => {
                this.setState({ modal: false })
            }, 2000)
            this.listarCursos();
            this.limpar();
        })
    }
    limpar() {
        this.setState({ nome: "", texto: "" })
    }
    render() {
        return (
            <div>
                <br /><br />
                <Alert key={"idx"} variant={"success"} show={this.state.modal}>Cadastrado com sucesso</Alert>
                <fieldset>
                    <h2>Cadastrar Curso</h2>
                    <br />
                    <SACEInput autoFocus label={'Nome do Curso'} value={this.state.nome} placeholder={'Preencha com o nome do curso que você deseja cadastrar'}
                        onChange={(e) => this.setState({ nome: e.target.value })} onError={this.state.texto} onErrorMessage={this.state.mgsErro} />
                    <Form.Group className="d-flex justify-content-end">
                        <Button className="btn btn-primary m-1" onClick={() => this.enviar()}> Salvar</Button>
                        <Button variant="danger" className="btn btn-primary m-1" onClick={() => this.limpar()}> Limpar </Button>
                    </Form.Group>
                </fieldset >
            </div>
        );
    }
}