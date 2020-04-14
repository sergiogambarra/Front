import React, { Component } from 'react';
import SACEInput from '../components/inputs/SACEInput';
import { Button } from 'react-bootstrap';
import { get, delDisciplinaCurso, getNomeCurso } from '../services/ServicoCrud';



class ListaDiscipinas extends Component {
    constructor(props) {

        super();
        this.state = {
            texto: false,
            curso: "",
            nomeCurso: "",
            disciplinas: [],
            mostraLista:false
        }
    }

    limpar() {
        this.setState({
            nomeCurso: "",
            texto: false,
        });
    }

    listarCursoNome() {
        if (this.state.nomeCurso === "" || typeof this.state.nomeCurso === "undefined") {
            this.setState({ texto: true })
        }

        get(`cursos/pesquisar/nome/${this.state.nomeCurso}`).then((retorno) => {
            this.setState({ disciplinas: retorno})
                this.pesquisaNomeCurso()

        });
    }
    async apagar(e) {
        console.log(this.state.id);
        
        await delDisciplinaCurso(`cursos/${this.state.curso.id}/disciplinas/${e}`).then(() => {
            this.listarCursoNome()
        })
    }
    pesquisaNomeCurso() {
        getNomeCurso(`cursos/pesquisar/${this.state.nomeCurso}`).then((retorno) => {
            this.setState({ curso: retorno})
         
        });
    }

    render() {

        const inputStyle = {
            margin: "0px 0px 10px 30%",
            width: "400px",
            padding: "10px",
            fontFamily: "Arial"

        };

        return (
            <div ><br /><br />
                <h2>Pesquisar disciplinas pelo nome do curso </h2>
                <SACEInput
                    placeholder={'Digite o nome do curso que deseja ver as Diciplinas'}
                    label={'Curso'}
                    value={this.state.nomeCurso} style={inputStyle}
                    onChange={(e) => this.setState({ nomeCurso: e.target.value })}
                    onError={this.state.texto}
                    onErrorMessage={'Nome do curso não encontrado'}
                />
                <Button style={{ position: 'relative', left: '80%' }} variant="primary" className="btn btn-primary m-1"
                    onClick={() => this.listarCursoNome()}>
                    Enviar
                </Button>
                <Button style={{ position: 'relative', left: '80%' }}
                    variant="danger"
                    className="btn btn-primary m-1"
                    onClick={() => this.limpar()}> Limpar </Button>
                    {<div >
                <h3>Diciplinas </h3>

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


