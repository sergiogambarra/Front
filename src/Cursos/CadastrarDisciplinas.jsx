import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import SACEInput from '../components/inputs/SACEInput';

class CadastrarDisciplinas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cursos: [],
            idcurso: "",
            option:"",
            textodisciplina: false,
            textocargahoraria: false,
            textooption: "erro",
            disciplinas: []


        }
    }
    listarCurso() {
        axios.get(`/api/cursos/`).then((retorno) => {
            this.setState({
                cursos: retorno.data,
            })
        });
    }
    listarDisciplinas() {
        axios.get(`/api/cursos/${this.state.idcurso}/disciplinas`).then((retorno) => {
            this.setState({
                disciplinas: retorno.data
            })
        });
    }
    cadastrarDisciplinas() {
        
        if (typeof this.state.nome === "undefined") {
            this.setState({
                textodisciplina: true
            })
        }
        if (typeof this.state.cargaHoraria === "undefined" || this.state.cargaHoraria < 15) {
            this.setState({
                textocargahoraria: true
            })}
         else {

            axios.post(`/api/cursos/${this.state.idcurso}/disciplinas`, {
                nome: this.state.nome,
                cargaHoraria: this.state.cargaHoraria
            }).then(() => {
                this.listarDisciplinas();
            }
            )
           
        }
    }


    componentDidMount() {
        this.listarCurso();
    }
    limpar(){
        this.setState({
            textodisciplina:false,
            textocargahoraria:false,
            nome:"",cargaHoraria:""
        })
    }
   

    render() {
        return (<div >

            <h2>Cadastrar disciplinas</h2>
            <label >curso</label>
            <select class="browser-default custom-select"
                id={this.state.idcurso}
                onChange={(e) =>
                    this.setState({
                        idcurso: e.target.value
                    })
                }>
                <option></option>
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
            <Button style={{ position: 'relative', left: '80%' }} variant="danger" className="btn btn-primary m-1"onClick={(e) => this.limpar()}>
                Limpar
                </Button>
            <br /><br /><br />
            <h3>Disciplinas </h3>
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
                                    onClick={(e) => this.limpar()}
                                > Deletar </Button>}
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>

        </div>);

    }
}


export default CadastrarDisciplinas;