import React, { Component } from 'react';
import { get } from '../../services/ServicoCrud';

class RequisicaoAluno extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aluno: {},
            requisicoes: [],
            mostraTable: false,
            page: 0,
            last: false,
            first: true,
            total: 0
        }
    }

    async pesquisarNomeSolicitante() {
        const aluno = await get(`usuarios/auth/`);
        get(`requisicoes/solicitante/${aluno.id}`).then((retorno) => {
            this.setState({ requisicoes: retorno, last: retorno.last, first: retorno.first, total: retorno.totalPages, aluno, mostraTable: true });
        })
    }

    componentDidMount() {
        this.pesquisarNomeSolicitante()
    }
    control(e) {
        if (e.target.id === "+") {
            this.setState({ page: this.state.page + 1, mostraEditar: false }, () => this.pesquisarNomeSolicitante())
        } else {
            this.setState({ page: this.state.page - 1, mostraEditar: false }, () => this.pesquisarNomeSolicitante())
        }
    }
    render() {
        return (
            <div>
                {this.state.mostraTable && <><br /><br />
                    <h3>Requisições do Aluno: {this.state.aluno && this.state.aluno.perfil.nome}</h3>
                    <table className="table" >
                        <thead className="p-3 mb-2 bg-primary text-white">
                            <tr >
                                <th scope="col">Id</th>
                                <th scope="col">Data</th>
                                <th scope="col">Tipo de requisição</th>
                                <th scope="col">Disciplina</th>
                                <th style={{ textAlign: "center" }} scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.requisicoes &&
                                this.state.requisicoes.map((u) =>
                                    <tr key={u.id}>
                                        <td>{u.id}</td>
                                        <td>{u.dataRequisicao}</td>
                                        <td>{u.tipo === "aproveitamento" ? "Aproveitamentos de estudos" : "Certificação de conhecimentos "}</td>
                                        <td>{u.disciplinaSolicitada && u.disciplinaSolicitada.nome}</td>
                                        <td style={{
                                            backgroundColor:
                                                u.deferido === "DEFERIDO" ? 'green' : u.deferido === "INDEFERIDO" ? 'red' : 'orange'
                                            , textAlign: "center"
                                        }}>
                                            {u.deferido}
                                        </td>
                                    </tr>
                                )}
                        </tbody>
                    </table> </>}
                {
                    <>
                        {this.state.first || <button id="-" onClick={(e) => this.control(e)}>Anterior</button>}
                        &nbsp;&nbsp;
                        {this.state.last || <button id="+" onClick={(e) => this.control(e)}>Próximo</button>}

                        <span style={{ float: "right" }}>Página  {this.state.page + 1} / {this.state.total}</span>
                    </>

                }
            </div>

        );
    }
}
export default RequisicaoAluno;


