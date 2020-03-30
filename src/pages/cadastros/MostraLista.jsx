import React,{Component} from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
class MostraLista extends Component {
    constructor(props) {
        super();
        this.state = {
          id: "",
          dataRequisicao: "",
          requisições: "", escolha: "",
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
          usuario: [{
            mome: "",
          }],
    
        }
      }
    
      listarRequisicoesNomeDisciplina() {
    
        if (typeof this.state.nomeDisciplina === "undefined" || this.state.nomeDisciplina.length === 0 ) {
          this.setState({ texto: true })
        }
        axios.get(`/api/requisicoes/nomedisciplina/${this.state.nomeDisciplina}`).then((retorno) => {
          this.setState({
            pesquisaRequisicoes: retorno.data,
          })
          if (this.state.pesquisaRequisicoes.length === 0) {
            this.setState({ texto: true })
          }
          if (this.state.pesquisaRequisicoes.length !== 0) {
            this.setState({ texto: false })
          }
          if (this.state.pesquisaRequisicoes.length !== 0) {
            this.setState({
              cont: "1",
            })
          } else { this.setState({ cont: "" }) }
        });
      }
      pesquisarNomeSolicitante() {
    
        if (typeof this.state.nomeAluno === "undefined" || this.state.nomeAluno.length === 0
        ) {
          this.setState({ texto: true })
        }
        axios.get(`/api/requisicoes/solicitante/${this.state.nomeAluno}`).then((retorno) => {
          this.setState({
            usuario: retorno.data,
          })
          if (this.state.nomeAluno.length === 0) {
            this.setState({ texto: true })
          }
          if (this.state.nomeAluno.length !== 0) {
            this.setState({ texto: false })
          }
          if (this.state.nomeAluno.length !== 0) {
            this.setState({
              cont: "1",
            })
          } else { this.setState({ cont: "" }) }
        });
      }
      limpar() {
        this.setState({
          cont: "", texto: false, nomeDisciplina: "",
          parecer: "", nomeAluno: ""
        })
      }
    
    render() { 
        return ( 
            <div>
<div id="FormPesquisaNome" Style={{ display: "none" }}><br /><br /><br />
          <h3>Lista Requisições </h3>
          <table class="table" >
            <thead class="p-3 mb-2 bg-primary text-white">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Data</th>
                <th scope="col">Solicitante</th>
                <th scope="col">Disciplina</th>
                <th scope="col">Deferido</th>
              </tr>
            </thead>
            <tbody>
              {this.state.pesquisaRequisicoes &&
                this.state.pesquisaRequisicoes.map((requisicao) =>
                  <tr>
                    <td>{requisicao.id}</td>
                    <td>{requisicao.dataRequisicao}</td>
                    <Link to={`/parecer/${requisicao.id}`}><td>{requisicao.usuario.nome + ""}</td></Link>
                    <td>{requisicao.disciplinaSolicitada.nome}</td>
                    <td>{requisicao.deferido + ""}</td>
                  </tr>
                )}
            </tbody>
          </table></div>
            </div>
         );
    }
}
 
export default MostraLista;