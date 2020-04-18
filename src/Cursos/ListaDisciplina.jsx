import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { get, delDisciplinaCurso } from '../services/ServicoCrud';



class ListaDiscipinas extends Component {
    constructor(props) {

        super();
        this.state = {
            disciplinas: [],
            cursos:[],
            nome:""
        }
    }

 
    async apagar(e) {
        await delDisciplinaCurso(`cursos/${this.state}/disciplinas/${e}`).then(() => {
        })
    }
    async listarCurso() {
        const cursos = await get("cursos/");
        this.setState({ cursos });
    }

    async  listarDisciplinas() {
        console.log(this.state.idcurso);
        await get(`cursos/${this.state.idcurso}/disciplinas/`).then((retorno) => {
            this.setState({ disciplinas: retorno })
        });
    }
    componentDidMount() {
        this.listarCurso();
        this.listarDisciplinas();
        
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
                { typeof this.state.idcurso === "undefined"?"":<div><h3>Diciplinas </h3>
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
                            {this.state.disciplinas && this.state.disciplinas.map((d) =>
                                <tr>
                                    <td>{d.id}</td>
                                    <td>{d.nome}</td>
                                    <td>{d.cargaHoraria}</td>
                                    <td><Button variant="primary"
                                        className="btn btn-danger m-1"
                                        onClick={(e) => this.apagar(d.id)}
                                    > Deletar </Button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                }
            </div>
        );
    }
}

export default ListaDiscipinas;


