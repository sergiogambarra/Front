import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { get, delDisciplinaCurso, getIdDisciplina, putDisciplinas } from '../services/ServicoCrud';
import SACEInput from '../components/inputs/SACEInput';
import Alert from 'react-bootstrap/Alert'

class ListaDiscipinas extends Component {
    constructor(props) {

        super();
        this.state = {
            disciplinas: [],
            cursos: [],
            disciplina: {
                nome: "", cargaHoraria: ""
            }, variant: "", msgAlert: "Atualizado com sucesso!",
            mostraEditar: false, idDisciplina: "", modalShow: false, alert: false,
            nomeInvalido: false, cargaHorariaInvalida: false,
            page: 0,
            last: false,
            first: true,
            total:0

        }
    }

    async apagar(e) {
        await delDisciplinaCurso(`cursos/${this.state.idcurso}/disciplinas/${e}`).then(() => {
            this.listarDisciplinas()
            this.setState({ modalShow: false, mostraEditar: false, alert: false, variant: "danger", msgAlert: "Apagou com sucesso" })
            setTimeout(() => {
                this.setState({ alert: false })
            }, 2000)
        })
    }
    async listarCurso() {
        const cursos = await get("cursos/");
        this.setState({ cursos });
    }
    async  listarDisciplinas() {

        await get(`cursos/${this.state.idcurso}/disciplinas/paginacao?page=${this.state.page}&size=6`).then((retorno) => {
            console.log(retorno)
            if(retorno) this.setState({ disciplinas: retorno.content, last: retorno.last, first: retorno.first, total:retorno.totalPages })
        });
    }
    async componentDidMount() {
        this.listarCurso();
        this.listarDisciplinas()
    }

    async busca(e) {
        await getIdDisciplina(`cursos/${this.state.idcurso}/disciplinas/${e}`).then((retorno) => {
            this.setState({
                idDisciplina: retorno.id,
                nome: retorno.nome,
                cargaHoraria: retorno.cargaHoraria,
                mostraEditar: true
            })
        })
        this.limpar()
    }
    control(e){
        if(e.target.id === "+"){
            this.setState({page:this.state.page+1},()=>this.listarDisciplinas())
        }else{
            this.setState({page:this.state.page-1},()=>this.listarDisciplinas())
        }
    }

    async editarDisciplina() {

        if (this.state.nome === null || this.state.nome === "" ? this.setState({ nomeInvalido: true }) : this.setState({ nomeInvalido: false })) { }
        if (this.state.cargaHoraria === null || this.state.cargaHoraria === "" || this.state.cargaHoraria < 15 ? this.setState({ cargaHorariaInvalida: true }) : this.setState({ cargaHorariaInvalida: false })) { }
        if (this.state.nome === null || this.state.nome === "" || this.state.cargaHoraria === null || this.state.cargaHoraria === "" || this.state.cargaHoraria < 15) { return }
        putDisciplinas(`cursos/${this.state.idcurso}/disciplinas`, {
            id: this.state.idDisciplina,
            nome: this.state.nome,
            cargaHoraria: this.state.cargaHoraria
        }).then(() => this.listarDisciplinas(),
            this.setState({ mostraEditar: false, alert: true, variant: "success" }))
        setTimeout(() => {
            this.setState({ alert: false })
        }, 2000)
    }
    limpar() {
        this.setState({
            nomeInvalido: false, cargaHorariaInvalida: false
        })
    }
    render() {
        return (
            <div ><br /><br />
                <label>Selecione um Curso</label>
                <select className="browser-default custom-select" disabled={this.state.disabled}
                    id={this.state.idcurso}
                    value={this.state.idcurso}
                    onClick={() => this.listarDisciplinas(this.state.idcurso)}
                    onChange={(e) =>
                        this.setState({
                            idcurso: e.target.value,
                        })
                    }>
                    <option idcurso={"undefined"}></option>
                    {this.state.cursos && this.state.cursos.map((curso) =>
                        <option key={curso.id} value={curso.id}>{curso.nome}</option>
                    )}
                </select>
                <br /><br /><br />
                <Alert key={"idx"} variant={this.state.variant} show={this.state.alert}>{this.state.msgAlert}</Alert>
                {typeof this.state.idcurso === "undefined" ? "" : <div><h3>Disciplinas </h3>
                    <table class="table">
                        <thead class="p-3 mb-2 bg-primary text-white">
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Carga Horária</th>
                                <th scope="col">Apagar</th>
                                <th scope="col">Editar</th>

                            </tr>
                        </thead>
                        <tbody>
                            {this.state.disciplinas && this.state.disciplinas.map((d) =>
                                <tr>
                                    <td>{d.id}</td>
                                    <td>{d.nome}</td>
                                    <td>{d.cargaHoraria}</td>
                                    <td><Button variant="primary"
                                        className="btn btn-danger m-1"
                                        onClick={(e) => this.setState({ modalShow: true, idDisciplina: d.id, mostraEditar: false, nome: d.nome }, this.limpar())}
                                    > Apagar </Button></td>
                                    <td><Button variant="primary"
                                        className="btn btn-success m-1"
                                        onClick={(e) => this.busca(d.id)}
                                    > Editar </Button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {
                        <>
                            {this.state.first || <button id="-" onClick={(e) => this.control(e)}>Anterior</button>}
                            &nbsp;&nbsp;
                            {this.state.last  || <button id="+" onClick={(e) => this.control(e)}>Próximo</button>}

                            <span style={{float:"right"}}>Página  { this.state.page+1 } / {this.state.total}</span>
                        </>

                    }

                    <hr></hr><br /><br />
                    {this.state.mostraEditar === true ?
                        <><h3 id={"top"} style={{ textAlign: 'center' }}>Formulário de Edição</h3>
                            <p >ID : <span style={{
                                color: 'red'
                            }}>{this.state.idDisciplina}</span></p>

                            <SACEInput
                                autoFocus
                                placeholder={'Digite o nome da disciplina'}
                                value={this.state.nome}
                                label={'Nome da Disciplina'}
                                onChange={(e) => this.setState({ nome: e.target.value })}
                                onError={this.state.nomeInvalido}
                                onErrorMessage={'Campo da disciplina obrigatório'}
                            />

                            <b />
                            <SACEInput tipo="number" id="quantity" name="cargaHoraria" min="15" max=""
                                placeholder={'Digite a carga horária da disciplina'}
                                label="Carga Horária"
                                value={this.state.cargaHoraria}
                                onChange={(e) => this.setState({ cargaHoraria: e.target.value })}
                                onError={this.state.cargaHorariaInvalida}
                                onErrorMessage={'Campo carga Horária é obrigatório e não pode ser menor que 15 horas'}
                            />
                            <Button variant="primary" className="btn btn-primary m-1" onClick={(e) => this.editarDisciplina()}>
                                Salvar
                </Button></> : ""}
                </div>

                }
                <Modal show={this.state.modalShow} onHide={() => this.setState({ modalShow: false })} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title > Confirmar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Apagar disciplina? </Modal.Body>
                    <Modal.Body>ID : &nbsp;{this.state.idDisciplina} </Modal.Body>
                    <Modal.Body>Nome : &nbsp;{this.state.nome} </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary"
                            className="btn btn-danger m-1"
                            onClick={(e) => this.apagar(this.state.idDisciplina)}
                        > Apagar </Button>
                    </Modal.Footer>
                </Modal>

            </div >
        );
    }
}

export default ListaDiscipinas;


