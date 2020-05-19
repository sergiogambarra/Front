import React, { Component } from 'react';
import TituloPagina from '../components/TituloPagina';
import TabelaAproveitamentos from '../components/TabelaAproveitamentos';
import TabelaCertificacoes from '../components/TabelaCertificacoes';
import { get } from '../services/ServicoCrud'
import { InputGroup, Dropdown, DropdownButton } from 'react-bootstrap';

class MinhasRequisicoes extends Component {
  constructor(props) {
    super();
    this.state = { requisicoes: "", escolha: "", id: "", user: {}, nomePesquisa: "Pesquisar", alunos: [] }
  }

  componentDidMount() {
    this.listaAth()
  }
  async listaAth() {
    const user = await get("usuarios/auth/")
    this.setState({ user })

  }

  mudaNomePesquisa(e) {
    this.setState({ nomePesquisa: e.target.text });
  }

  async carregaAlunos() {
    await get("usuarios/alunos/").then((retorno) => {
      this.setState({ alunos: retorno })
    })
  }

  render() {
    return (
      <>
        <TituloPagina titulo={'Visualizar Requisições'} />

        <div className="custom-control custom-radio custom-control-inline">
          <input type="radio" id="aproveitamento" name="customRadioInline1" className="custom-control-input"
            onChange={(e) => this.setState({ requisicoes: e.target.id, cont: "" })} />
          <label id="mudarCor" className="custom-control-label" htmlFor="aproveitamento">Aproveitamento de estudos</label>
        </div>
        <div className="custom-control custom-radio custom-control-inline">
          <input type="radio" id="certificacao" name="customRadioInline1" className="custom-control-input"
            onChange={(e) => this.setState({ requisicoes: e.target.id, cont: "" })} />
          <label id="mudarCor" className="custom-control-label" htmlFor="certificacao">Certificação de conhecimentos</label>
        </div>
        <div className="custom-control custom-radio custom-control-inline">
          <input type="radio" id="pesquisar" name="customRadioInline1" className="custom-control-input"
            onChange={(e) => this.setState({ requisicoes: e.target.id, cont: "" })} />
          <label id="mudarCor" className="custom-control-label" htmlFor="pesquisar">Pesquisar</label>
        </div>
        <br /><br />
        {this.state.requisicoes === "pesquisar" &&

          <div style={{ display: "flex" }}>
            <DropdownButton
              as={InputGroup.Prepend}
              variant="success"
              title={this.state.nomePesquisa}
              id="input-group-dropdown-1"

            >
              <Dropdown.Item href="#" onClick={(e) => {
                this.mudaNomePesquisa(e);
                this.carregaAlunos();
              }}>Nome Alnuno</Dropdown.Item>
              <Dropdown.Item href="#" onClick={(e) => this.mudaNomePesquisa(e)}>Another action</Dropdown.Item>
              <Dropdown.Item href="#" onClick={(e) => this.mudaNomePesquisa(e)}>Something else here</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#">Separated link</Dropdown.Item>
            </DropdownButton>
            <input list="pesquisa" name="pesquisa" />
            {console.log(this.state.guarda)}
            <datalist id="pesquisa">
              {this.state.alunos.map((a) => <option id={a.id} value={"ID :  " + a.id + "  " + a.perfil.nome} />)}
            </datalist>
          </div>
        }


        <br /><br />

        {this.state.requisicoes === "aproveitamento" ?
          <TabelaAproveitamentos user={this.state.user} /> : this.state.requisicoes === "certificacao" ?
            <TabelaCertificacoes user={this.state.user} /> : ""} <br /><br />

      </>);

  }
}
export default MinhasRequisicoes;


