import React, { Component } from 'react';
import TituloPagina from '../components/TituloPagina';
import TabelaAproveitamentos from '../components/TabelaAproveitamentos';
import TabelaCertificacoes from '../components/TabelaCertificacoes';
import { get } from '../services/ServicoCrud'
import { Form, Button, Alert, Container, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import SACEInput from '../components/inputs/SACEInput';
import { format2 } from '../auxiliares/FormataData';
import CardAproveitamento from '../components/CardAproveitamento';
import CardCertificacao from '../components/CardCertificacao';

class MinhasRequisicoes extends Component {
  constructor(props) {
    super();
    this.state = {
      requisicoes: "", escolha: "", id: "", user: {}, alunos: [], pesquisa: false, selecionaPesquisa: "", dataInicio: "", requisicoesStatus: [],
      dataFinal: "", dataInicioInvalida: false, dataFinalInvalida: false, msgErrorPesquisaNome: "", status: "", msgErrorStatus: "", cursos: [], idCurso: "", msgErrorCurso: "",
      requisicoesDisciplina: [], alert: false, last: "", first: "", total: "", page: 0, pararPesquisaData: false, mostraBotao: false
    }
  }

  componentDidMount() {
    this.listaAth()
    this.carregaAlunos()
    this.carregaCursos()
  }
  async listaAth() {
    const user = await get("usuarios/auth/")
    this.setState({ user })
  }

  async carregaAlunos() {
    await get("usuarios/alunos/").then((retorno) => {
      this.setState({ alunos: retorno })
    })
  }
  async carregaCursos() {
    await get("cursos/").then((retorno) => {
      this.setState({ cursos: retorno })
    })
  }

  async pesquisaStatus() {
    if (!this.state.status) {
      this.setState({ msgErrorStatus: "Selecione status da pesquisa", mostraBotao: false, requisicoesStatus: "" })
      return
    }
    await get(`requisicoes/status/${this.state.status}?page=${this.state.page}&size=6&sort=DESC`).then((retorno) => {
      this.setState({ requisicoesStatus: retorno.content, msgErrorStatus: "", mostraBotao: true, last: retorno.last, first: retorno.first, total: retorno.totalPages })
      if (this.state.requisicoesStatus && this.state.requisicoesStatus.length === 0) {
        this.setState({ alert: true, mostraBotao: false })
        setTimeout(() => {
          this.setState({ alert: false })
        }, 3000)
      }
    })
  }
  async alunoPeloId(e) {
    await get(`usuarios/${e}`).then((retorno) => {
      this.setState({ user: retorno })
    })
  }
  async pesquisaRequisicaoCurso() {
    if (!this.state.idCurso) {
      this.setState({ msgErrorCurso: "Selecione em curso", mostraBotao: false, requisicoesDisciplina: "" })
      return
    }
    await get(`requisicoes/curso/${this.state.idCurso}?page=${this.state.page}&size=6`).then((retorno) => {
      this.setState({ requisicoesDisciplina: retorno && retorno.content, msgErrorCurso: "", mostraBotao: true, last: retorno.last, first: retorno.first, total: retorno.totalPages })
      if (this.state.requisicoesDisciplina && this.state.requisicoesDisciplina.length === 0) {
        this.setState({ alert: true, mostraBotao: false })
        setTimeout(() => {
          this.setState({ alert: false })
        }, 3000)
      }
    })
  }

  async pesquisaData() {
    if (!this.state.dataInicio ? this.setState({ dataInicioInvalida: true }) : this.setState({ dataInicioInvalida: false })) { }
    if (!this.state.dataFinal ? this.setState({ dataFinalInvalida: true }) : this.setState({ dataFinalInvalida: false })) { }
    if (!this.state.dataInicio && !this.state.dataFinal) {
      return
    } else {
      await get(`requisicoes/data/${format2(this.state.dataInicio)}/${format2(this.state.dataFinal)}/?page=${this.state.page}&size=6`).then((retorno) => {
        this.setState({ requisicoesAluno: retorno && retorno.content, last: retorno.last, first: retorno.first, total: retorno.totalPages, pararPesquisaData: true, mostraBotao: true })
        if (this.state.requisicoesAluno && this.state.requisicoesAluno.length === 0) {
          this.setState({ alert: true, mostraBotao: false })
          setTimeout(() => {
            this.setState({ alert: false })
          }, 3000)
        }
      })
    }
  }
  async todasRequisicoes() {

    this.setState({ dataInicioInvalida: "", dataFinalInvalida: "" })
    if (!this.state.user.id) {
      this.setState({ msgErrorPesquisaNome: "Selecione nome do aluno", requisicoesAluno: "", user: "", mostraBotao: false })
      return
    }

    await get(`requisicoes/alunos/${this.state.user.id}?page=${this.state.page}&size=6`).then((retorno) => {
      this.setState({ requisicoesAluno: retorno && retorno.content, msgErrorPesquisaNome: "", last: retorno.last, first: retorno.first, total: retorno.totalPages, mostraBotao: true })
      if (this.state.requisicoesAluno && this.state.requisicoesAluno.length === 0) {
        this.setState({ alert: true, mostraBotao: false })
        setTimeout(() => {
          this.setState({ alert: false })
        }, 3000)
      }
    })
  }
  limpar() {
    this.setState({
      requisicoes: "", selecionaPesquisa: "", requisicoesAluno: "", msgErrorPesquisaNome: "", msgErrorStatus: "", requisicoesStatus: "", msgErrorCurso: "",
      page: "", pararPesquisaData: false, mostraBotao: false
    })
  }

  control(e) {

    if (this.state.selecionaPesquisa) {
      if (this.state.selecionaPesquisa === "Nome") {
        if (e.target.id === "+") {
          this.setState({ page: this.state.page + 1, mostraEditar: false }, () => this.todasRequisicoes())
        } else {
          this.setState({ page: this.state.page - 1, mostraEditar: false }, () => this.todasRequisicoes())
        }
      } else if (this.state.selecionaPesquisa === "Data") {
        if (e.target.id === "+") {
          this.setState({ page: this.state.page + 1, mostraEditar: false }, () => this.pesquisaData())
        } else {
          this.setState({ page: this.state.page - 1, mostraEditar: false }, () => this.pesquisaData())
        }
      } else if (this.state.selecionaPesquisa === "Curso") {
        if (e.target.id === "+") {
          this.setState({ page: this.state.page + 1, mostraEditar: false }, () => this.pesquisaRequisicaoCurso())
        } else {
          this.setState({ page: this.state.page - 1, mostraEditar: false }, () => this.pesquisaRequisicaoCurso())
        }
      } else if (this.state.selecionaPesquisa === "Status") {
        if (e.target.id === "+") {
          this.setState({ page: this.state.page + 1, mostraEditar: false }, () => this.pesquisaStatus())
        } else {
          this.setState({ page: this.state.page - 1, mostraEditar: false }, () => this.pesquisaStatus())
        }
      }
    }
  }

  render() {
    return (
      <>
        <TituloPagina titulo={'Visualizar Requisições'} />
        {this.state.pesquisa === true ? "" : <div className="custom-control custom-radio custom-control-inline">
          <input type="radio" id="aproveitamento" name="customRadioInline1" className="custom-control-input"
            onChange={(e) => this.setState({ requisicoes: e.target.id, pesquisa: false })} />
          <label id="mudarCor" className="custom-control-label" htmlFor="aproveitamento">Aproveitamento de estudos</label>
        </div>}
        {this.state.pesquisa === true ? "" : <div className="custom-control custom-radio custom-control-inline">
          <input type="radio" id="certificacao" name="customRadioInline1" className="custom-control-input"
            onChange={(e) => this.setState({ requisicoes: e.target.id, pesquisa: false })} />
          <label id="mudarCor" className="custom-control-label" htmlFor="certificacao">Certificação de conhecimentos</label>
        </div>}
        <div className="custom-control custom-radio custom-control-inline">
          <input type="radio" id="pesquisar" name="customRadioInline1" className="custom-control-input"
            onChange={(e) => this.setState({ pesquisa: true, requisicoes: "", user: "" })} />
          <label id="mudarCor" className="custom-control-label" htmlFor="pesquisar">Pesquisar</label>&nbsp;&nbsp;&nbsp;&nbsp;
          {this.state.pesquisa === false ? "" :
            <Form>
              {
                <>
                  <div>
                    <input type="radio" id="Nome" name="drone" value="Nome" onClick={(e) => this.setState({
                      selecionaPesquisa: e.target.value, requisicoesAluno: "", dataInicio: "", dataFinal: "", msgErrorStatus: ""
                      , requisicoesStatus: "", msgErrorPesquisaNome: "", user: "", requisicoesDisciplina: "", status: "", msgErrorCurso: "", pararPesquisaData: false,
                      last: "", first: "", total: "", page: 0, mostraBotao: false
                    })}
                    />&nbsp;&nbsp;
                    <label for="Nome">Nome</label>
                  </div>

                  <div>
                    <input type="radio" id="Data" name="drone" value="Data" onClick={(e) => this.setState({
                      selecionaPesquisa: e.target.value, dataInicio: "", dataFinal: "", msgErrorStatus: "",
                      requisicoesStatus: "", requisicoesAluno: "", user: "", requisicoesDisciplina: "", status: "", idCurso: "", msgErrorCurso: "", pararPesquisaData: false,
                      last: "", first: "", total: "", page: 0, mostraBotao: false
                    })} />&nbsp;&nbsp;
                    <label for="Data">Data</label>
                  </div>

                  <div>
                    <input type="radio" id="Curso" name="drone" value="Curso" onClick={(e) => this.setState({
                      selecionaPesquisa: e.target.value, dataInicio: "", dataFinal: "", msgErrorStatus: "",
                      requisicoesStatus: "", requisicoesAluno: "", user: "", requisicoesDisciplina: "", status: "", idCurso: "", msgErrorCurso: "", pararPesquisaData: false,
                      last: "", first: "", total: "", page: 0, mostraBotao: false
                    })} />&nbsp;&nbsp;
                    <label for="Curso">Curso</label>
                  </div>
                  <div>
                    <input type="radio" id="Status" name="drone" value="Status" onClick={(e) => this.setState({
                      selecionaPesquisa: e.target.value, dataInicio: "", dataFinal: "", msgErrorStatus: "",
                      requisicoesStatus: "", requisicoesAluno: "", user: "", requisicoesDisciplina: "", status: "", idCurso: "", msgErrorCurso: "", pararPesquisaData: false,
                      last: "", first: "", total: "", page: 0, mostraBotao: false
                    })} />&nbsp;&nbsp;
                    <label for="Status">Status</label>
                  </div><br />

                  <Button onClick={() => this.limpar()}>Limpar pesquisa</Button>&nbsp;&nbsp;
            <Link to="/tela-transicao" onClick={() => this.setState({ pesquisa: false, id: "" })}><Button variant={"danger"}>Voltar</Button></Link>
                </>
              }
            </Form>
          }
        </div>
        <br /> <br />
        <Alert variant={"danger"} show={this.state.alert}>Não existem requisições para essa pesquisa </Alert>

        {this.state.selecionaPesquisa === "Data" ?
          <>
            <SACEInput
              type={"date"}
              label={'Apartir do dia '}
              value={this.state.dataInicio}
              disabled={this.state.pararPesquisaData}
              placeholder={'pesquisa por data. '}
              onChange={(e) => this.setState({ dataInicio: e.target.value })}
              onError={this.state.dataInicioInvalida}
              onErrorMessage={'Você não inseriu uma data válida!'}
            />

            <SACEInput
              type={"date"}
              label={'Até o dia '}
              value={this.state.dataFinal}
              disabled={this.state.pararPesquisaData}
              placeholder={'pesquisa por data. '}
              onChange={(e) => this.setState({ dataFinal: e.target.value })}
              onError={this.state.dataFinalInvalida}
              onErrorMessage={'Você não inseriu uma data válida!'}
            />
            <Button onClick={() => this.pesquisaData()}>Pesquisar</Button>
          </>
          : ""}
        {this.state.selecionaPesquisa === "Nome" &&
          <>
            < Form >
              <Form.Group controlId="exampleForm.SelectCustom">
                <br />
                <Form.Label>Selecione nome do aluno </Form.Label>
                <Form.Control as="select" custom
                  onChange={
                    (e) => {
                      this.alunoPeloId(e.target.value);
                      this.setState({ id: e.target.value })
                    }
                  }
                >
                  <option key={0} value={""}></option>
                  {this.state.alunos.map((a) =>
                    <option key={a.id} value={a.id} >{a.perfil.nome}</option>
                  )}
                </Form.Control>
                <Form.Text className="text-danger">{this.state.msgErrorPesquisaNome} </Form.Text>
              </Form.Group>
              <Button onClick={() => this.todasRequisicoes()
              }>Pesquisar</Button>
            </Form>
          </>
        }

        {this.state.selecionaPesquisa === "Status" && <>
          < Form >
            <Form.Group controlId="exampleForm.SelectCustom">
              <br />
              <Form.Label>Selecione status da requisição</Form.Label>
              <Form.Control as="select" custom
                onChange={
                  (e) => {
                    this.setState({ status: e.target.value })
                  }} >
                <option key={0} value={""}></option>
                <option >DEFERIDO</option>
                <option >EM ANÁLISE</option>
                <option >INDEFERIDO</option>

              </Form.Control>
              <Form.Text className="text-danger">{this.state.msgErrorStatus} </Form.Text>
            </Form.Group>
            <Button onClick={() => this.pesquisaStatus()
            }>Pesquisar</Button>
          </Form></>}
        {this.state.selecionaPesquisa === "Curso" && <>
          < Form >
            <Form.Group controlId="exampleForm.SelectCustom">
              <br />
              <Form.Label>Selecione curso para sua pesquisa</Form.Label>
              <Form.Control as="select" custom
                onChange={
                  (e) => {
                    this.setState({ idCurso: e.target.value })
                  }} >
                <option key={0} value={""}></option>
                {this.state.cursos && this.state.cursos.map((c) =>
                  <option key={c.id} value={c.id}>{c.nome}</option>)}
              </Form.Control>
              <Form.Text className="text-danger">{this.state.msgErrorCurso} </Form.Text>
            </Form.Group>
            <Button onClick={() => this.pesquisaRequisicaoCurso()
            }>Pesquisar</Button>
          </Form></>}
        <br />
        {
          this.state.requisicoes === "aproveitamento" ? <TabelaAproveitamentos user={this.state.user} /> : this.state.requisicoes === "certificacao" ?
            <TabelaCertificacoes user={this.state.user} /> : ""} <br /><br />
        {this.state.mostraBotao && <h3> Requisições encontradas</h3>}<br />
        {
          <Container>
            <Row>
              {

                this.state.requisicoesAluno && this.state.requisicoesAluno.map((requisicao) => {

                  if (requisicao.tipo === "aproveitamento") {
                    return <CardAproveitamento requisicao={requisicao} />
                  } else {
                    return <CardCertificacao requisicao={requisicao} />
                  }
                })}
              {this.state.requisicoesStatus && this.state.requisicoesStatus.map((r) => {
                if (r.tipo === "aproveitamento") {
                  return <CardAproveitamento requisicao={r} />
                }else{
                  return <CardCertificacao requisicao={r} />
                }
              })}
              {this.state.requisicoesDisciplina && this.state.requisicoesDisciplina.map((r) => {
                if (r.tipo === "aproveitamento") {
                  return <CardAproveitamento requisicao={r} />
                }else{
                  return <CardCertificacao requisicao={r} />

                }
              })}


            </Row>

          </Container>
        }
        {this.state.mostraBotao &&
          <>
            {this.state.last || <button id="+" onClick={(e) => this.control(e)}>Próximo</button>}
                        &nbsp;&nbsp;
            {this.state.first || <button id="-" onClick={(e) => this.control(e)}>Anterior</button>}

            <span style={{ float: "right" }}>Página  {this.state.page + 1} / {this.state.total}</span>
          </>

        }
      </>);

  }
}
export default MinhasRequisicoes;


