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
            mgsErro: "",
            idProfessor: "",
            listaProfessores: [],
            msgErrorProfessor:""
        }
    }
    async listarCursos() {
        const cursosLista = await get("cursos/");
        this.setState({ cursosLista });
    }
    async buscaProfessores() {
        await get("usuarios/professores/").then((r) => {
             this.setState({ listaProfessores: r })
             
        })
    }
 
    async componentDidMount() {
        this.buscaProfessores()
        this.listarCursos();
    }

    enviar() {
        if (this.state.nome.trim() === "") {
            this.setState({ texto: true, mgsErro: "Campo nome é obrigatório" })
            return
        }
        if (this.state.nome.length > 100) {
            this.setState({ texto: true, mgsErro: "Limite máximo de 100 caracteres para cadastro" })
            return
        }
        if(this.state.idProfessor === ""){
            this.setState({msgErrorProfessor:"Campo coordenador de curso é obrigatório"})
            return
        }
        if(this.state.nome && this.state.idProfessor){
            post("cursos/", { 
                nome: this.state.nome,
                usuario:{
                    id:this.state.idProfessor
                }
            }).then((r) => {
                this.setState({ modal: true })
                setTimeout(() => {
                    this.setState({ modal: false })
                }, 2000)
                this.listarCursos();
                this.limpar();
            })

        }
    }
    limpar() {
        this.setState({ nome: "", texto: "",msgErrorProfessor:"" })
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
                      
                    </Form.Group>
                </fieldset >

                <Form>
                    <Form.Group controlId="exampleForm.SelectCustom">
                       
                        <Form.Label>Selecionar coordenador do curso <span style={{color:"red"}}>(o professor deve ter marcado em seu cadastro que é coordenador)</span></Form.Label>
                        <Form.Control as="select" custom
                            id={this.state.idProfessor}
                            value={this.state.idProfessor}
                            isInvalid={this.state.listaProfessoresInvalido}
                            onChange={(e) => this.setState({ idProfessor: e.target.value })} >
                            <option ></option>
                            {this.state.listaProfessores && this.state.listaProfessores.map((p) =>
                                    p.perfil.coordenador === true ?  <option key={p.id} value={p.id}>{p.perfil.nome}</option>:""

                                )}
                        </Form.Control>
                        <Form.Text className="text-danger">{this.state.msgErrorProfessor} </Form.Text> <br />
                        <Button className="btn btn-primary m-1" onClick={() => this.enviar()}> Salvar</Button>
                        <Button variant="danger" className="btn btn-primary m-1" onClick={() => this.limpar()}> Limpar </Button>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}