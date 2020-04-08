import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import SACEInput from '../components/inputs/SACEInput';
import Alert from 'react-bootstrap/Alert'
import { post, del, put, getId, get } from '../services/ServicoCrud';

class CadastrarDisciplinas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cursos: [],
            idcurso: "",
            option: "",
            textodisciplina: false,
            textocargahoraria: false,
            textooption: "erro",
            disciplinas: [],
            modal: "",
            nome: "",
            mostraLista:false,
            tituloCurso:""
            
            
        }
    }
    async listarCurso() {
        const cursos = await get("cursos");
        this.setState({ cursos });
    }
    listarDisciplinas() {
        axios.get(`/api/cursos/${this.state.idcurso}/disciplinas`).then((retorno) => {
            this.setState({
                disciplinas: retorno.data
            })
        });
    }

    async buscarCursoPeloId(id) {
        const curso = await getId("cursos", this.state.idcurso);
        this.setState({ tituloCurso:"" });
    }
    cadastrarDisciplinas() {
        
        if (typeof this.state.nome === "undefined" || this.state.nome === "") {
            this.setState({
                textodisciplina: true
            })
        }
        if (typeof this.state.cargaHoraria === "undefined" || this.state.cargaHoraria < 15) {
            this.setState({
                textocargahoraria: true
            })
        }
        else {
            post(`cursos/${this.state.idcurso}/disciplinas`, {
                nome: this.state.nome,
                cargaHoraria: this.state.cargaHoraria
            }).then(() => {
                this.setState({ modal: true ,mostraLista:true})
                setTimeout(() => {
                    this.setState({ modal: false })
                }, 2000)
                this.listarDisciplinas();
                this.buscarCursoPeloId();
                this.limpar();
            }
            )
            
        }
    }
    apagar(e) {
        console.log(this.state.idcurso);
        axios.delete(`/api/cursos/${this.state.idcurso}/disciplinas/${e}`).then(() => {
            this.listarDisciplinas()
        })
    }
    componentDidMount() {
        this.listarCurso();
    }
    limpar() {
        this.setState({
            
            textodisciplina: "",
            textocargahoraria: false,
            nome: "", cargaHoraria: ""
        })
    }
    
    
    render() {
        return (<div >
            <Alert key={"idx"} variant={"success"} show={this.state.modal}>
                Cadastrado com sucesso</Alert>
            <h2>Cadastrar disciplinas</h2>
            <label >curso</label>
            <select class="browser-default custom-select"
                id={this.state.idcurso}
                value={this.state.idcurso}
                    onChange={(e) =>
                    this.setState({
                        idcurso: e.target.value
                    })
                }>
                <option id={""}></option>
                {this.state.cursos.map((curso) =>
                    <option key={curso.id} value={curso.id}>{curso.nome}</option>
                )}
            </select>
            <SACEInput
                placeholder={'Digite o nome Disciplina'}
                value={this.state.nome}
                label={'Nome Disciplina'}
                onChange={(e) => this.setState({ nome: e.target.value })}
                onError={this.state.textodisciplina}
                onErrorMessage={'Campo da disciplina obrigatório'}
            />

            <b />
            <SACEInput tipo="number" id="quantity" name="cargaHoraria" min="15" max=""
                placeholder={'Digite a carga horária da disciplina'}
                label="Carga Horária"
                onChange={(e) => this.setState({ cargaHoraria: e.target.value })}
                onError={this.state.textocargahoraria}
                onErrorMessage={'Campo carga Horária é obrigatório e não pode ser menor que 15 horas'}
                value={this.state.cargaHoraria}
            />
            <Button style={{ position: 'relative', left: '80%' }} variant="primary" className="btn btn-primary m-1" onClick={(e) => this.cadastrarDisciplinas()}>
                Enviar
                </Button>
            <Button style={{ position: 'relative', left: '80%' }} variant="danger" className="btn btn-primary m-1" onClick={(e) => this.limpar()}>
                Limpar
                </Button>
            <br /><br /><br />
           {
           this.state.mostraLista ?<> <h3>Disciplinas do Curso :  {this.state.tituloCurso}</h3>
            <table class="table">
                <thead class="p-3 mb-2 bg-primary text-white">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Carga Horária</th>
                        <th scope="col">Apagar</th>

                    </tr>
                </thead>
                <tbody>
                    {this.state.disciplinas &&
                        this.state.disciplinas.map((disciplinas) =>
                            <tr>
                                <td>{disciplinas.id}</td>
                                <td>{disciplinas.nome}</td>
                                <td>{disciplinas.cargaHoraria}</td>
                                <td> {disciplinas.nome === "" ? "" : <Button
                                    variant="primary"
                                    className="btn btn-danger m-1"
                                    onClick={(e) => this.apagar(disciplinas.id)}
                                > Deletar </Button>}
                                </td>
                            </tr>
                    )}
                </tbody>
            </table> 
            </>:""}
        </div>
        );
    }
}


export default CadastrarDisciplinas;