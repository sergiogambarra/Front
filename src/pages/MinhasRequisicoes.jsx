import React, { Component } from 'react';
import TituloPagina from '../components/TituloPagina';
import TabelaAproveitamentos from '../components/TabelaAproveitamentos';
import TabelaCertificacoes from '../components/TabelaCertificacoes';
import { Button } from 'react-bootstrap';
import SACEInput from '../components/inputs/SACEInput';
import axios from 'axios';

class MinhasRequisicoes extends Component {
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
      cont: ""
    }
  }

  listarRequisicoesNome() {
    
    axios.get(`/api/requisicoes/nome/${this.state.nomeDisciplina}`).then((retorno) => {
      this.setState({
        pesquisaRequisicoes: retorno.data,
      })
      /*if para mostrar lista pesquisa por nome disciplina apagar lista*/
      /*if (typeof this.state.nomeDisciplina === "undefined") {
        this.setState({ texto: true })
      }*/
      if (this.state.pesquisaRequisicoes.length !== 0) {
        this.setState({
          cont: "1", requisições: ""
        })
      } else { this.setState({ cont: "" }) }
    });
  }
  
  limpar() {
    this.setState({
      requisições: "",
      cont: "",
      texto:false,nomeDisciplina:""
    })
  }
  render() {

    return (
      <div>
        <TituloPagina titulo={'Visualizar Requisições'} />

        <div class="custom-control custom-radio custom-control-inline">
          <input type="radio"
            id="todasRequisições" name="customRadioInline1" class="custom-control-input"
            onChange={(e) => this.setState({ requisições: e.target.id, cont: "" })}
          />
          <label class="custom-control-label" for="todasRequisições">Todas requisições</label>
        </div>
        <div class="custom-control custom-radio custom-control-inline">
          <input type="radio" id="aproveitamento" name="customRadioInline1" class="custom-control-input"
            onChange={(e) => this.setState({ requisições: e.target.id, cont: "" })}
          />
          <label class="custom-control-label" for="aproveitamento">Aproveitamento de estudos</label>
        </div>
        <div class="custom-control custom-radio custom-control-inline">
          <input type="radio" id="certificacao" name="customRadioInline1" class="custom-control-input"
            onChange={(e) => this.setState({ requisições: e.target.id, cont: "" })} />
          <label class="custom-control-label" for="certificacao">Certificação de conhecimentos</label>
        </div>
        <br /><br />
        <div class="form-group">
          <label for="exampleFormControlSelect2">Escolha o tipo de pesquisa </label>
          <select multiple class="form-control" id={this.state.id}
            onChange={(e) =>
              this.setState({
                id: e.target.value
              })
            }>
            <option id={"nomeDisciplina"}>Nome disciplina</option>
            <option id={"nomeAluno"}>Nome Aluno</option>
            <option id={"indeferido"}>Indeferido</option>
            <option id={"deferido"}>Deferido</option>
          </select>
          <SACEInput
            placeholder={'Digite aqui sua pesquisa'}
            value={this.state.nomeDisciplina}
            onChange={(e) => this.setState({ nomeDisciplina: e.target.value })}
            onError={this.state.texto}
            onErrorMessage={'Não encontrado'}
          />
          {this.state.id === "nomeDisciplina" ? <Button style={{ position: 'relative' }} variant="primary" className="btn btn-primary m-1" onClick={(e) => this.listarRequisicoesNome()}>
            Enviar
                </Button> : <Button style={{ position: 'relative' }} variant="primary" className="btn btn-primary m-1" onClick={(e) => this.listarRequisicoesNome()}>
              Enviar
                </Button>}

          <Button style={{ position: 'relative' }} variant="danger" className="btn btn-primary m-1"
            onClick={(e) => this.limpar()}
          > Limpar </Button>


        </div>
        {this.state.cont === "" ? "" :
          <div id="FormPesquisaNome" Style={{ display: "none" }}><br /><br /><br />
            <h3>Lista de Requisições por nome da disciplina </h3>
            <table class="table" >
              <thead class="p-3 mb-2 bg-primary text-white">
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Data</th>
                  <th scope="col">Deferido</th>
                  <th scope="col">Disciplina</th>

                </tr>
              </thead>
              <tbody>
                {this.state.pesquisaRequisicoes &&
                  this.state.pesquisaRequisicoes.map((requisicao) =>

                    <tr>
                      <td>{requisicao.id}</td>
                      <td>{requisicao.dataRequisicao}</td>
                      <td>{requisicao.deferido + ""}</td>
                      <td>{requisicao.disciplinaSolicitada.nome}</td>

                    </tr>
                  )}
              </tbody>
            </table></div>}
        {this.state.requisições === "" ? "" : this.state.requisições === "todasRequisições" ? <div className="d-flex">
          <div className="col-6">
            <br />
            <br />
            <TabelaAproveitamentos />
          </div>
          <div className="col-6">
            <br />
            <br />
            <TabelaCertificacoes />
          </div>
        </div>
          : this.state.requisições === "aproveitamento" ? <div className="col-6">
            <br />
            <br />
            <TabelaAproveitamentos />

          </div> : <div className="col-6">
              <br />
              <br />
              <TabelaCertificacoes />
            </div>}
      </div>
    );
  }
}
export default MinhasRequisicoes;


