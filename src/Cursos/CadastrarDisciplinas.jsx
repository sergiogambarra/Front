import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import SACEInput from '../components/inputs/SACEInput';
import Alert from 'react-bootstrap/Alert'
import { delDisciplinaCurso, post, get } from '../services/ServicoCrud';

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
            mostraLista: false,
            tituloCurso: "",
            disabled: false,
        }
    }
    async listarCurso() {
        const cursos = await get("cursos/");
        this.setState({ cursos });
    }

    async  listarDisciplinas() {
        await get(`cursos/${this.state.idcurso}/disciplinas/`).then((retorno) => {
            this.setState({ disciplinas: retorno })
        });
    }

    cadastrarDisciplinas() {
        if (typeof this.state.nome === "undefined" || this.state.nome === "") { this.setState({ textodisciplina: true }) }
        if (typeof this.state.cargaHoraria === "undefined" || this.state.cargaHoraria < 15) { this.setState({ textocargahoraria: true }) }
        else {
            post(`cursos/${this.state.idcurso}/disciplinas/`, {
                nome: this.state.nome,
                cargaHoraria: this.state.cargaHoraria
            }).then(() => {
                this.setState({ modal: true, mostraLista: true, disabled: true })
                setTimeout(() => {
                    this.setState({ modal: false })
                }, 2000)
                this.listarDisciplinas();
                this.limpaDados()
            }
            )

        }
    }
    async apagar(e) {
        await delDisciplinaCurso(`cursos/${this.state.idcurso}/disciplinas/${e}`).then(() => {
            this.listarDisciplinas()
        })
    }
    componentDidMount() {
        this.listarCurso();
    }
    limpaDados() {
        this.setState({
            textodisciplina: "",
            textocargahoraria: false,
            nome: "", cargaHoraria: ""
        })
    }
    limpar() {
        this.setState({
            textodisciplina: "",
            textocargahoraria: false,
            nome: "", cargaHoraria: ""
        })
        if (this.state.disabled) {
            this.setState({ mostraLista: false, disabled: false })
        }
    }


    render() {
        return (<div >
            <br /><br />
            <Alert key={"idx"} variant={"success"} show={this.state.modal}>
                Cadastrado com sucesso</Alert>
            <h2>Cadastrar Disciplina</h2><br />
            <label >Selecione o curso</label>
            <select className="browser-default custom-select" disabled={this.state.disabled}
                id={this.state.idcurso}
                value={this.state.idcurso}
                onChange={(e) =>
                    this.setState({
                        idcurso: e.target.value,

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
                Salvar
                </Button>
            <Button style={{ position: 'relative', left: '80%' }} variant="danger" className="btn btn-primary m-1" onClick={(e) => this.limpar()}>
                Limpar
                </Button>
            <br />

        </div>
        );
    }
}


export default CadastrarDisciplinas;