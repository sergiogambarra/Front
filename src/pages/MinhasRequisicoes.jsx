import React, { Component } from 'react';
import TituloPagina from '../components/TituloPagina';
import TabelaAproveitamentos from '../components/TabelaAproveitamentos';
import TabelaCertificacoes from '../components/TabelaCertificacoes';
import { get } from '../services/ServicoCrud'
import { Form, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import SACEInput from '../components/inputs/SACEInput';

class MinhasRequisicoes extends Component {
  constructor(props) {
    super();
    this.state = { requisicoes: "", escolha: "", id: "", user: {}, alunos: [], pesquisa: false, selecionaPesquisa: "" }
  }

  componentDidMount() {
    this.listaAth()
    this.carregaAlunos()
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

  async alunoPeloId(e) {
    await get(`usuarios/${e}`).then((retorno) => {
      this.setState({ user: retorno })
    })
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
                    <input type="radio" id="Nome" name="drone" value="Nome" onClick={(e) => this.setState({ selecionaPesquisa: e.target.value, requisicoes: "", user: "" })}
                    />&nbsp;&nbsp;
                    <label for="Nome">Nome</label>
                  </div>

                  <div>
                    <input type="radio" id="Data" name="drone" value="Data" onClick={(e) => this.setState({ selecionaPesquisa: e.target.value, requisicoes: "", user: "" })} />&nbsp;&nbsp;
                    <label for="Data">Data</label>
                  </div>

                  <div>
                    <input type="radio" id="Curso" name="drone" value="Curso" onClick={(e) => this.setState({ selecionaPesquisa: e.target.value, requisicoes: "", user: "" })} />&nbsp;&nbsp;
                    <label for="Curso">Curso</label>
                  </div>
                  <div>
                    <input type="radio" id="Status" name="drone" value="Status" onClick={(e) => this.setState({ selecionaPesquisa: e.target.value, requisicoes: "", user: "" })} />&nbsp;&nbsp;
                    <label for="Status">Status</label>
                  </div><br />

                  { this.state.selecionaPesquisa &&<> <div className="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="aproveitamento" name="customRadioInline1" className="custom-control-input"
                      onChange={(e) => this.setState({ requisicoes: e.target.id, cont: "" })} />
                    <label id="mudarCor" className="custom-control-label" htmlFor="aproveitamento">Aproveitamento de estudos</label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="certificacao" name="customRadioInline1" className="custom-control-input"
                      onChange={(e) => this.setState({ requisicoes: e.target.id, cont: "" })} />
                    <label id="mudarCor" className="custom-control-label" htmlFor="certificacao">Certificação de conhecimentos</label>
                  </div></>}<br /><br />
                  <Button onClick={() => this.setState({ requisicoes: "", selecionaPesquisa: "" })}>Limpar pesquisa</Button>&nbsp;&nbsp;
            <Link to="/tela-transicao" onClick={() => this.setState({ pesquisa: false, id: "" })}><Button variant={"danger"}>Voltar</Button></Link>
                </>
              }
            </Form>
          }
        </div>
        <br /><br /><br />
        {this.state.selecionaPesquisa === "Data" ?
          <>
            <SACEInput
              type={"date"}
              label={'Apartir do dia '}
              value={this.state.dataIngresso}
              placeholder={'pesquisa por data. '}
              onChange={(e) => this.setState({ dataIngresso: e.target.value })}
              onError={this.state.dataIngressoInvalido}
              onErrorMessage={'Você não inseriu uma data válida!'}
            />



          </>
          : ""}
        <br /><br />
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
                  <option key={""} value={""}> </option>
                  {this.state.alunos.map((a) =>
                    <option key={a.id} value={a.id} >{a.perfil.nome}</option>
                  )}
                </Form.Control>
                <Form.Text className="text-danger">{this.state.msgErrorProfessor} </Form.Text>
              </Form.Group>
            </Form>

          </>

        }
        <br /><br />
        {
          this.state.requisicoes === "aproveitamento" ? <TabelaAproveitamentos user={this.state.user} /> : this.state.requisicoes === "certificacao" ?
            <TabelaCertificacoes user={this.state.user} /> : ""
        } <br /><br />
      </>);

  }
}
export default MinhasRequisicoes;


