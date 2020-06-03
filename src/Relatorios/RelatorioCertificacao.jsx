import React, { Component } from 'react';
import { get } from '../services/ServicoCrud';
import { format2 } from '../auxiliares/FormataData';
import { Form, Button } from 'react-bootstrap';
import SACEInput from '../components/inputs/SACEInput';


class RelatorioCertificacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "", alunos: [], dataInicio: "", requisicoesStatus: [],
      dataFinal: "", dataInicioInvalida: false, dataFinalInvalida: false, msgErrorPesquisaNome: "", status: "", msgErrorStatus: "", cursos: [], idCurso: "", msgErrorCurso: "",
      requisicoesDisciplina: []
    }
  }

  componentDidMount() {
    this.carregaAlunos()
    this.carregaCursos()
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

    await get(`requisicoes/status/${this.state.status}`).then((retorno) => {
      this.setState({ requisicoesStatus: retorno })

    })
  }
  async listarDisciplinas() {
    console.log(this.state.idCurso);
    await get(`cursos/${this.state.idCurso}/disciplinas/`).then((retorno) => {
      console.log(retorno);
      if (retorno) this.setState({ disciplinas: retorno })
    });
  }
  async pesquisaData() {

    await get(`requisicoes/data/${format2(this.state.dataInicio)}/${format2(this.state.dataFinal)}/?page=${this.state.page}&size=6`).then((retorno) => {
      this.setState({ requisicoesAluno: retorno })
    })
  }
  render() {
    return (
      <div>   <br /><br />
        <h3>Solicitações de Certificação de Conhecimentos</h3>
        < Form >
          <Form.Group controlId="exampleForm.SelectCustom">
            <br />
            <Form.Label>Selecione curso para sua pesquisa</Form.Label>
            <Form.Control as="select" custom
              id={this.state.idcurso}
              value={this.state.idcurso}
              onClick={() => this.listarDisciplinas(this.state.idcurso)}
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
          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>Selecione disciplina do curso</Form.Label>
            <Form.Control as="select" custom
              onChange={
                (e) => {

                }} >
              <option key={0} value={""}></option>
              {this.state.disciplinas && this.state.disciplinas.map((d) =>
                <option key={d.id} value={d.id}>{d.nome}</option>)}
            </Form.Control>
            <Form.Text className="text-danger">{this.state.msgErrorCurso} </Form.Text>
          </Form.Group>
          < Form >


            <Form.Group controlId="exampleForm.SelectCustom">

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

          </Form>
        </Form>
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
      </div>
    );
  }
}

export default RelatorioCertificacao;