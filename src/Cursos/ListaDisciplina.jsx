import React, { Component } from 'react';
import axios from 'axios';
import SACEInput from '../components/inputs/SACEInput';
import { Button } from 'react-bootstrap';

class ListaDiscipinas extends Component {
    constructor(props) {


        super();
        this.state = {
            texto:false,
            curso: [
                this.state = {
                    idCurso: "",
                    nome: ""
                }
            ],

            disciplinas: [
                this.state = {
                    id: "",
                    nome: "",
                    cargaHoraria: ""
                }
            ]
        }
    }

    listarDisciplina() {

        axios.get(`/api/cursos/${this.state.curso.id}/disciplinas`).then((retorno) => {
            this.setState({
                disciplinas: retorno.data
            })
        });
    }
    limpar() {

        this.setState({
            nome: "",
            texto:false
        });
       
    }

    listarCursoNome() {
        console.log(this.state.nome)
        if (this.state.nome === ""|| typeof this.state.nome === "undefined") {
            this.setState({
                texto: true
            })
        }
        axios.get(`/api/cursos/pesquisar/nome/${this.state.nome}`).then((retorno) => {
            this.setState({
                curso: retorno.data,
            })
            this.listarDisciplina()
          
        });
    }
    apagar(e) {
        axios.delete(`/api/cursos/${this.state.curso.id}/disciplina/${e}`).then(() => {
            this.listarCursoNome()
        })
    }

    render() {

        const inputStyle = {
            margin: "0px 0px 10px 30%",
            width: "400px",
            padding: "10px",
            fontFamily: "Arial"

        };

        return (
            <div >

                
                <h2>Pesquisar disciplinas pelo nome do curso</h2>
                <SACEInput
                    placeholder={'Digite o nome do curso que deseja ver as Diciplinas'}
                    label={'Curso'}
                    value={this.state.nome} style={inputStyle}
                    onChange={(e) => this.setState({ nome: e.target.value })}
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
                    onClick={() => this.limpar()}
                >
                    Limpar
                </Button>


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
                        {this.state.disciplinas &&
                            this.state.disciplinas.map((disciplina) =>

                                <tr>
                                    <td>{disciplina.id}</td>
                                    <td>{disciplina.nome}</td>
                                    <td>{disciplina.cargaHoraria}</td>
                                    <td> {disciplina.nome === "" ? "" : <Button
                                        variant="primary"
                                        className="btn btn-danger m-1"
                                        onClick={(e) => this.apagar(disciplina.id)}
                                    > Deletar </Button>}
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>



            </div>
        );
    }
}

export default ListaDiscipinas;


