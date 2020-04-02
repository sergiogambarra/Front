import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

class RequisicaoAluno extends Component {
    constructor(props) {
        super();
        this.state = {
            id: "",
            dataRequisicao: "",
            requisicoes: "",
            disciplinaSolicitada: [
                this.state = {
                    nome: ""
                } ],
            deferido: "",
            parecer: "",
            usuario: []

        }
    }



    pesquisarNomeSolicitante() {
        axios.get(`/api/requisicoes/solicitante/${this.props.match.params.id}`).then((retorno) => {
            this.setState({ usuario: retorno.data })
        });
    }
    componentDidMount() {
        this.pesquisarNomeSolicitante()
    }
    render() {
        return (
            <div>
                 {this.state.usuario.length === 0 ? /*<><br /><br /><br /><h2 align={"center"}>"Você não possui requisições"</h2></>*/"": <div id="FormPesquisaNome" ><br /><br /><br />
                    <h3>Requisições do Aluno: {this.props.match.params.id} </h3>
                    <table class="table" >
                        <thead class="p-3 mb-2 bg-primary text-white">
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Data</th>
                                <th scope="col">Aluno</th>
                                <th scope="col">Tipo de requisição</th>
                                <th scope="col">Disciplina</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.usuario &&
                                this.state.usuario.map((u) =>
                                    <tr>
                                        <td>{u.id}</td>
                                        <td>{u.dataRequisicao}</td>
                                        <Link to={`/editar-aluno/${u.id}`}><td>{u.usuario.nome}</td></Link>
                                        <td>{u.tipo === "aproveitamento" ? "Aproveitamentos de estudos" : "Certificação de conhecimentos "}</td>
                                        <td>{u.disciplinaSolicitada.nome}</td>
                                        <td>{u.deferido}</td>

                                    </tr>

                                )}
                        </tbody>
                    </table></div>

                            }
            </div>

        );
    }
}
export default RequisicaoAluno;


