import React, { Component } from 'react';
import { get } from '../../services/ServicoCrud';

class RequisicaoAluno extends Component {
    constructor(props) {
        super(props);
        this.state = {
           requisicoes:[],
           mostraTable:false
        }
    }

   async pesquisarNomeSolicitante() {
       const requisicoes =  await get(`requisicoes/solicitante/${this.props.match.params.id}`);
       if(requisicoes.length !== 0){
        this.setState({requisicoes,mostraTable:true});
       }       
    }

    componentDidMount() {
        this.pesquisarNomeSolicitante()
    }
    render() {
        return (
            <div>
                 { this.state.mostraTable && <><br/><br/>
                    <h3>Requisições do Aluno: {this.state.requisicoes[0].usuario.perfil.nome} </h3>
                    <table className="table" >
                        <thead className="p-3 mb-2 bg-primary text-white">
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Data</th>
                                <th scope="col">Tipo de requisição</th>
                                <th scope="col">Disciplina</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.requisicoes &&
                                this.state.requisicoes.map((u) =>
                                    <tr key={u.id}>
                                        <td>{u.id}</td>
                                        <td>{u.dataRequisicao}</td>
                                        <td>{u.tipo === "aproveitamento" ? "Aproveitamentos de estudos" : "Certificação de conhecimentos "}</td>
                                        <td>{u.disciplinaSolicitada.nome}</td>
                                        <td>{u.deferido}</td>
                                    </tr>
                                )}
                        </tbody>
                    </table> </>

                            }
            </div>

        );
    }
}
export default RequisicaoAluno;


