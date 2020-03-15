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
            textodisciplina: false,
            textocargahoraria: false,
            textooption: false,


        }
    }
    listarCurso() {
        axios.get(`/api/cursos/`).then((retorno) => {
            this.setState({
                cursos: retorno.data,
            })
        });
    }
    cadastrarDisciplinas() {


        if (this.state.idcurso === "") {
            alert("Selecione o curso")
            this.setState({
                textooption: true
            })
        }
        if (typeof this.state.nome === "undefined") {
            this.setState({
                textodisciplina: true
            })
        }
        if (typeof this.state.cargaHoraria === "undefined") {
            alert("Campo carga horária é obrigatório")
            this.setState({
                textocargahoraria: true
            })


        } else {
            alert("Cadastrado com sucesso")
            axios.post(`/api/cursos/${this.state.idcurso}/disciplinas`, {
                nome: this.state.nome,
                cargaHoraria: this.state.cargaHoraria
            }) 
        }
    }
 

    componentDidMount() {
        this.listarCurso();

    }
    render() {
        return (<div>
            <h1>Selecione o curso para cadastrar disciplinas</h1>

            <label for="cars">Cursos</label>

            <select id={this.state.idcurso}
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
                label={'Nome Disciplina'}
                onChange={(e) => this.setState({ nome: e.target.value })}
                onError={this.state.textodisciplina}
                onErrorMessage={'Campo da disciplina obrigatório'}
            />

            <label>Carga Horária</label>
            <b />
            <input type="number" id="quantity" name="cargaHoraria" min="15" max=""
                onChange={(e) => this.setState({ cargaHoraria: e.target.value })}
                onError={this.state.textocargahoraria}
                onErrorMessage={'Nome do curso não encontrado'}
            />
            <Button variant="primary" className="btn btn-primary m-1" onClick={(e) => this.cadastrarDisciplinas()}>
                Enviar
                </Button>
        </div>);

    }
}


export default CadastrarDisciplinas;