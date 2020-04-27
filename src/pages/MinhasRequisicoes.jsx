import React, { Component } from 'react';
import TituloPagina from '../components/TituloPagina';
import TabelaAproveitamentos from '../components/TabelaAproveitamentos';
import TabelaCertificacoes from '../components/TabelaCertificacoes';
import Container from 'react-bootstrap/Container'
import { get } from '../services/ServicoCrud'

class MinhasRequisicoes extends Component {
  constructor(props) {
    super();
    this.state = { requisicoes: "", escolha: "",id:"",user:{} }
  }

  componentDidMount(){
    this.listaAth()
  }
  async listaAth(){
    const user = await get("usuarios/auth/")
        this.setState({user})

  }


  render() {
    return (
      <Container>
        <TituloPagina titulo={'Visualizar Requisições'} />
        <div class="custom-control custom-radio custom-control- inline">
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
          <input type="radio" id="pesquisar" name="customRadioInline1" class="custom-control-input"
            onChange={(e) => this.setState({ requisicoes: e.target.id, cont: "" })} />
          <label id="mudarCor" class="custom-control-label" for="pesquisar">Pesquisar</label>
        </div>
        <br /><br /><br />

        {this.state.requisicoes === "aproveitamento" ?
          <TabelaAproveitamentos user={this.state.user}/> : this.state.requisicoes === "certificacao" ?
            <TabelaCertificacoes user={ this.state.user}/> : ""}</Container>

    );
  }
}
export default MinhasRequisicoes ;


