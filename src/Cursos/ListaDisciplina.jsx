import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { get, delDisciplinaCurso, getIdDisciplina, putDisciplinas } from '../services/ServicoCrud';
import SACEInput from '../components/inputs/SACEInput';


class ListaDiscipinas extends Component {
    constructor(props) {

        super();
        this.state = {
            disciplinas: [],
            cursos: [],
            disciplina: {
                nome: "", cargaHoraria: ""
            },
            mostraEditar: false, idDisciplina: "",modalShow:false
        }
    }


    async apagar(e) {
        await delDisciplinaCurso(`cursos/${this.state.idcurso}/disciplinas/${e}`).then(() => {
            this.listarDisciplinas()
            this.setState({modalShow:false})
        })
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
    componentDidMount() {
        this.listarCurso();
        this.listarDisciplinas();
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
    }
    editarDisciplina() {
        putDisciplinas(`cursos/${this.state.idcurso}/disciplinas`, {
            id: this.state.idDisciplina,
            nome: this.state.nome,
            cargaHoraria: this.state.cargaHoraria
        }).then(() => this.listarDisciplinas(),
            this.setState({ mostraEditar: false }))
    }

    render() {

        return (
            <div ><br /><br />
                <label>Selecione Curso</label>
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
                {typeof this.state.idcurso === "undefined" ? "" : <div><h3>Diciplinas </h3>
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
                                        onClick={(e) => this.setState({modalShow:true,idDisciplina:d.id})}
                                    > Deletar </Button></td>
                                    <td><Button variant="primary"
                                        className="btn btn-success m-1"
                                        onClick={(e) => this.busca(d.id)}
                                    > Editar </Button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <hr></hr><br /><br />
                    {this.state.mostraEditar === true ?
                        <><h3 id={"top"} style={{ textAlign: 'center' }}>Formulário Edição</h3>
                            <p >ID : <span style={{
                                color: 'red'
                            }}>{this.state.idDisciplina}</span></p>

                            <SACEInput
                                autoFocus
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
                                value={this.state.cargaHoraria}
                                onChange={(e) => this.setState({ cargaHoraria: e.target.value })}
                                onError={this.state.textocargahoraria}
                                onErrorMessage={'Campo carga Horária é obrigatório e não pode ser menor que 15 horas'}
                            />
                            <Button style={{ position: 'relative', left: '80%' }} variant="primary" className="btn btn-primary m-1" onClick={(e) => this.editarDisciplina()}>
                                Enviar
                </Button></> : ""}
                </div>

                }
                <Modal show={this.state.modalShow} onHide={() => this.setState({ modalShow: false })} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title > Confirmar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Apagar disciplina? </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary"
                                        className="btn btn-danger m-1"
                                        onClick={(e) => this.apagar(this.state.idDisciplina)}
                                    > Deletar </Button>
                    </Modal.Footer>
                </Modal>

            </div >
        );
    }
}

export default ListaDiscipinas;


