import React, { Component } from 'react';
import { get } from '../services/ServicoCrud';
import { format2 } from '../auxiliares/FormataData';
import {Form, Button } from 'react-bootstrap';
import SACEInput from '../components/inputs/SACEInput';


class RelatorioCertificacao extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            requisicoes: "", escolha: "", id: "", alunos: [], pesquisa: false, selecionaPesquisa: "", dataInicio: "", requisicoesStatus: [],
      dataFinal: "", dataInicioInvalida: false, dataFinalInvalida: false, msgErrorPesquisaNome: "", status: "", msgErrorStatus: "", cursos: [], idCurso: "", msgErrorCurso: "",
      requisicoesDisciplina: [], alert: false,  pararPesquisaData: false, mostraBotao: false
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
    async pesquisaData() {
       
          await get(`requisicoes/data/${format2(this.state.dataInicio)}/${format2(this.state.dataFinal)}/?page=${this.state.page}&size=6`).then((retorno) => {
            this.setState({ requisicoesAluno: retorno && retorno.content, last: retorno.last, first: retorno.first, total: retorno.totalPages, pararPesquisaData: true, mostraBotao: true })
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