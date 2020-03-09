import React, { Component } from 'react';
import Disciplinasview from '../Disciplinas/DisciplinaView';
import axios from 'axios';


class ListaDiscipinas extends Component {
    constructor(props) {
        super();
        this.state = {
            curso: "",
            diciplinas: [
                this.state = {
                    id: ""
                }
            ]
        }
    }

    listarDisciplina() {
        axios.get(`/api/cursos/${this.state.id}/disciplinas`).then((retorno) => {
            this.setState({
                diciplinas: retorno.data
            })
        });
    }


    listarCurso() {
        axios.get(`/api/cursos/${this.state.id}`).then((retorno) => {
            this.setState({
                curso: retorno.data
            })
        });
    }
    componentDidMount() {
        this.listarDisciplina()
        this.listarCurso()
    }
    limpar(){
        this.setState({
            curso:""
        })
    }

    render() {
        const btnCadastrar = {

            padding: "10px",
            fontFamily: "Arial"
        };
        const inputStyle = {
            margin: "0px 0px 10px 30%",
            width: "400px",
            padding: "10px",
            fontFamily: "Arial"

        };
        const label = {
            margin: "0px 0px 0px 30%",
            width: "400px",
            padding: "0px",
            fontFamily: "Arial"
        };
        return (
            <div>

                <b> <label style={label}>Digite o nome do curso que deseja ver as Diciplinas  </label></b>
                <input value ={this.state.curso}style={inputStyle} 
                onChange={(e)=>this.setState({curso:e.target.value})}
                />
                <button style={btnCadastrar}
                    onClick={() => this.limpar()}
                >{"Buscar"}</button>    

        <h1>Diciplinas</h1>
                
                
                                <table className="table table-striped">
                    <th scope="col">Nome</th>
                    <th scope="col">Carga Horária</th>
                </table>
                <tbody>
                    {
                        this.state.diciplinas.map((diciplina) =>
                            <tr>

                                <td>{diciplina.nome}</td>
                                <td>{diciplina.cargaHoraria}</td>
                            </tr>

                        )}
                </tbody>


            </div>
        );
    }
}

export default ListaDiscipinas;


