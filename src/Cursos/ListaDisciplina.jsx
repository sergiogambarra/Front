import React, { Component } from 'react';
import axios from 'axios';
import SACEInput from '../components/inputs/SACEInput';
import { Button } from 'react-bootstrap';


class ListaDiscipinas extends Component {
    constructor(props) {
        const senhaInvalida = false;
        super();
        this.state = {
            curso: [
                this.state = {
                    idCurso: "",
                    nome: ""
                }
            ],

            diciplinas: [
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
                diciplinas: retorno.data
            })

        });
    }
    limpar() {

        this.setState({
            nome: ""
        });
        
    }

    listarCursoNome() {

        axios.get(`/api/cursos/pesquisar/nome/${this.state.nome}`).then((retorno) => {
            this.setState({
                curso: retorno.data,

            })
           
            this.listarDisciplina()
            if (retorno.data === "") {
               this.limpar();
            }

        });
    }
    componentDidMount() {
        this.listarCursoNome()
    }

    render() {
       
        const inputStyle = {
            margin: "0px 0px 10px 30%",
            width: "400px",
            padding: "10px",
            fontFamily: "Arial"

        };

        return (
            <div>

                <SACEInput
                    label={'Digite o nome do curso que deseja ver as Diciplinas'}
                    value={this.state.nome} style={inputStyle}
                    onChange={(e) => this.setState({ nome: e.target.value })}
                    onError={this.state.senhaInvalida}
                    onErrorMessage={'Você não inseriu o sua senha corretamente!'}
                />
                <Button variant="primary" className="btn btn-primary m-1"  onClick={(e) => this.listarCursoNome()}>
                    Enviar
                </Button>
              

                <h1>Diciplinas</h1>

                <table class="table">
                    <thead class="p-3 mb-2 bg-primary text-white">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Carga Horária</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.diciplinas.map((disciplina) =>

                            <tr>
                                <td>{disciplina.id}</td>
                                <td>{disciplina.nome}</td>
                                <td>{disciplina.cargaHoraria}</td>
                            </tr>
                        )}
                    </tbody>
                </table>



            </div>
        );
    }
}

export default ListaDiscipinas;


