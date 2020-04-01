import React, { Component } from 'react';
import axios from 'axios';

class RequisicaoAluno extends Component {
    constructor(props) {
        super();
        this.state = {
            id: "",
            dataRequisicao: "",
            requisicoes: "", escolha: "",
            pesquisaRequisicoes: [],
            texto: false,
            disciplinaSolicitada: [
                this.state = {
                    nome: ""
                }
            ],
            deferido: "",
            cont: "",
            parecer: "",
            usuario: [],
            guardaTipo: ""

        }
    }



    pesquisarNomeSolicitante() {
        if (typeof this.state.nomeAluno === "undefined") {
            this.setState({ texto: true })
        }
        if (this.state.nomeAluno === "") {
            this.setState({ texto: true })
        }

        axios.get(`/api/requisicoes/solicitante/${this.props.match.params.id}`).then((retorno) => {
            this.setState({ usuario: retorno.data })

            if (this.state.usuario.nome !== "undefined") {
                this.setState({ cont: "1", texto: false })
            }
        });
    }
    componentDidMount() {
        this.pesquisarNomeSolicitante()
    }
    render() {
        return (
            <div>
                <div id="FormPesquisaNome" ><br /><br /><br />
                    <h3>Requisições do Aluno: {this.props.match.params.id} </h3>
                    <table class="table" >
                        <thead class="p-3 mb-2 bg-primary text-white">
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Data</th>
                                <th scope="col">Aluno</th>
                                <th scope="col">Tipo requisição</th>
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
                                        <td>{u.usuario.nome}</td>
                                        <td>{u.tipo}</td>
                                        <td>{u.disciplinaSolicitada.nome}</td>
                                        <td>{u.deferido}</td>

                                    </tr>

                                )}
                        </tbody>
                    </table></div>


            </div>

        );
    }
}
export default RequisicaoAluno;


