import React, { Component } from 'react';
import TituloPagina from '../components/TituloPagina';
import TabelaAproveitamentos from '../components/TabelaAproveitamentos';
import TabelaCertificacoes from '../components/TabelaCertificacoes';
import { Button } from 'react-bootstrap';
import SACEInput from '../components/inputs/SACEInput';
import axios from 'axios';
import { Link } from "react-router-dom";

class MinhasRequisicoes extends Component {
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
      usuario: [{
        mome: "",
      }],
      guardaTipo: ""

    }
  }

  listarRequisicoesNomeDisciplina() {
    if (typeof this.state.nomeDisciplina === "undefined" || this.state.nomeDisciplina.length === 0) {
      this.setState({ texto: true })
    }
    axios.get(`/api/requisicoes/nomedisciplina/${this.state.nomeDisciplina}`).then((retorno) => {
      this.setState({ pesquisaRequisicoes: retorno.data })
      if (this.state.pesquisaRequisicoes.length === 0) {
        this.setState({ texto: true })
      }
      if (this.state.pesquisaRequisicoes.length !== 0) {
        this.setState({ texto: false })
      }
      if (this.state.pesquisaRequisicoes.length !== 0) {
        this.setState({ cont: "1" })
      } else { this.setState({ cont: "" }) }
    });
  }

  async pesquisarNomeSolicitante() {
    console.log(this.state.usuario.nome)
    if (typeof this.state.nomeAluno === "undefined") {
      this.setState({ texto: true })
    }
    if (this.state.nomeAluno === "") {
      this.setState({ texto: true })
    }

    await axios.get(`/api/requisicoes/solicitante/${this.state.nomeAluno}`).then((retorno) => {
      this.setState({ usuario: retorno.data })
      if (this.state.usuario.length === 0) {
        this.setState({texto:true})
      }else{this.setState({cont:"1",texto:false})}
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
        <TituloPagina titulo={'Visualizar Requisições'} />
        <div class="custom-control custom-radio custom-control-inline">
          <input type="radio" id="aproveitamento" name="customRadioInline1" class="custom-control-input"
            onChange={(e) => this.setState({ requisicoes: e.target.id, cont: "" })}
          />
          <label class="custom-control-label" for="aproveitamento">Aproveitamento de estudos</label>
        </div>
        <div class="custom-control custom-radio custom-control-inline">
          <input type="radio" id="certificacao" name="customRadioInline1" class="custom-control-input"
            onChange={(e) => this.setState({ requisicoes: e.target.id, cont: "" })} />
          <label id="mudarCor" class="custom-control-label" for="certificacao">Certificação de conhecimentos</label>
        </div>

        <div class="custom-control custom-radio custom-control-inline">
          <input type="radio" id="pesquisas" name="customRadioInline1" class="custom-control-input"
            onChange={(e) => this.setState({ requisicoes: e.target.id, cont: "" })} />
          <label class="custom-control-label" for="pesquisas" >Outros tipos de pesquisas</label>
        </div>
        <br /><br />

        {this.state.requisicoes === "pesquisas" ? <div class="form-group" id="pesquisas">
          <label for="exampleFormControlSelect2">Escolha o tipo de pesquisa </label>
          <select multiple class="form-control" id={""}
            onChange={(e) => this.setState({ id: e.target.value })}>
            <option id={this.nomeDisciplina}>Nome disciplina</option>
            <option id={this.nomeAluno}>Nome Aluno</option>
            <option id={this.parecer}>Indeferido</option>
          </select>
          {this.state.id === "" ? <SACEInput
            disabled={true}
            placeholder={'Selecione tipo de pesquisa no campo acima'}
            onError={this.state.texto}
          /> : this.state.id === "Nome disciplina" ? <SACEInput
            placeholder={'Digite aqui sua pesquisa'}
            value={this.state.nomeDisciplina}
            onChange={(e) => this.setState({ nomeDisciplina: e.target.value })}
            onError={this.state.texto}
            onErrorMessage={'Não encontrado'}
          /> : this.state.id === "Nome Aluno" ? <SACEInput
            placeholder={'Digite aqui sua pesquisa'}
            value={this.state.nomeAluno}
            onChange={(e) => this.setState({ nomeAluno: e.target.value })}
            onError={this.state.texto}
            onErrorMessage={'Não encontrado'}
          /> : <SACEInput
                  placeholder={'Digite aqui sua pesquisa'}
                  value={this.state.parecer}
                  onChange={(e) => this.setState({ parecer: e.target.value })}
                  onError={this.state.texto}
                  onErrorMessage={'Não encontrado'}
                />}

          {this.state.id === "" ? <Button style={{ position: 'relative' }} variant="primary" className="btn btn-primary m-1"
          > Enviar </Button> : this.state.id === "Nome Aluno" ? <Button style={{ position: 'relative' }} variant="primary" className="btn btn-primary m-1"
            onClick={(e) => this.pesquisarNomeSolicitante()}>
            Pesquisar por nome do aluno</Button> : this.state.id === "Nome disciplina" ? <Button style={{ position: 'relative' }} variant="primary" className="btn btn-primary m-1"
              onClick={(e) => this.listarRequisicoesNomeDisciplina()}>
              Pesquisar por nome da Disciplina</Button> : <Button style={{ position: 'relative' }} variant="primary" className="btn btn-primary m-1"
                onClick={(e) => this.pesquisarNomeSolicitante()}>
                  Enviar</Button>}
          <Button style={{ position: 'relative' }} variant="danger" className="btn btn-primary m-1"
            onClick={(e) => this.limpar()}
          > Limpar </Button>
        </div> : ""}
        {this.state.cont === "" ? "" : this.state.id === "Nome disciplina" ? <div id="FormPesquisaNome" Style={{ display: "none" }}><br /><br /><br />
          <h3>Requisições por nome da disciplina </h3>
          <table class="table" >
            <thead class="p-3 mb-2 bg-primary text-white">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Data</th>
                <th scope="col">Aluno</th>
                <th scope="col">Disciplina</th>
                <th scope="col">Tipo</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {this.state.pesquisaRequisicoes &&
                this.state.pesquisaRequisicoes.map((requisicao) =>
                  <tr>
                    <td>{requisicao.id}</td>
                    <td>{requisicao.dataRequisicao}</td>
                    <Link to={`/parecer/${requisicao.id}`}><td>{requisicao.usuario.nome + ""}</td></Link>
                    <td>{requisicao.disciplinaSolicitada.nome + ""}</td>
                    <td>{requisicao.tipo === "certificacao" ? "Certificação por conhecimentos" : "Aproveitamento de estudos"}</td>
                    <td>{requisicao.deferido + ""}</td>
                  </tr>
                )}
            </tbody>
          </table></div> : this.state.id === "Nome Aluno" ? <div id="FormPesquisaNome" ><br /><br /><br />
            <h3>Requisições por nome do Solicitante </h3>
            <table class="table" >
              <thead class="p-3 mb-2 bg-primary text-white">
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Data</th>
                  <th scope="col">Aluno</th>
                  <th scope="col">Disciplina</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {this.state.usuario &&
                  this.state.usuario.map((requisicao) =>
                    <tr>
                      <td>{requisicao.id}</td>
                      <td>{requisicao.dataRequisicao}</td>
                      <Link to={`/parecer/${requisicao.id}`}><td>{requisicao.usuario.nome + ""}</td></Link>
                      <td>{requisicao.disciplinaSolicitada.nome + ""}</td>
                      <td>{requisicao.tipo === "certificacao" ? "Certificação por conhecimentos" : "Aproveitamento de estudos"}</td>
                      <td>{requisicao.deferido + ""}</td>
                    </tr>
                  )}
              </tbody>
            </table></div> : ""}
        {this.state.requisicoes === "aproveitamento" ? <div className="col-6"><br /> <br />
          <TabelaAproveitamentos /> </div> : this.state.requisicoes === "certificacao" ? <div className="col-6"><br /> <br />
            <TabelaCertificacoes /></div> : ""}</div>

    );
  }
}
export default MinhasRequisicoes;


