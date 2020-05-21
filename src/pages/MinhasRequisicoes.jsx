import React, { Component } from 'react';
import TituloPagina from '../components/TituloPagina';
import TabelaAproveitamentos from '../components/TabelaAproveitamentos';
import TabelaCertificacoes from '../components/TabelaCertificacoes';
import { get } from '../services/ServicoCrud'
import { Form, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";

class MinhasRequisicoes extends Component {
  constructor(props) {
    super();
    this.state = { requisicoes: "", escolha: "", id: "", user: {}, alunos: [], pesquisa: false }
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
            onChange={(e) => this.setState({ pesquisa: true, requisicoes: "" })} />
          <label id="mudarCor" className="custom-control-label" htmlFor="pesquisar">Pesquisar</label>
        </div>
        
        <br /><br />
        {this.state.pesquisa &&
          <>
            < Form >
              <Form.Group controlId="exampleForm.SelectCustom">
                <br />
                <Form.Label>Selecione nome do aluno </Form.Label>
                <Form.Control as="select" custom
                  onChange={
                    (e) =>{
                       this.alunoPeloId(e.target.value);
                       this.setState({id:e.target.value})}
                  }
                >
                  <option  ></option>
                  {this.state.alunos.map((a) =>
                    <option key={a.id} value={a.id} >{a.perfil.nome}</option>
                  )}
                </Form.Control>
                <Form.Text className="text-danger">{this.state.msgErrorProfessor} </Form.Text>
              </Form.Group>
            </Form>
            {this.state.id === "" ? "" : <div className="custom-control custom-radio custom-control-inline">
              <input type="radio" id="aproveitamento" name="customRadioInline1" className="custom-control-input"
                onChange={(e) => this.setState({ requisicoes: e.target.id, cont: "" })} />
              <label id="mudarCor" className="custom-control-label" htmlFor="aproveitamento">Aproveitamento de estudos</label>
            </div>}
            {this.state.id === "" ? "" : <div className="custom-control custom-radio custom-control-inline">
              <input type="radio" id="certificacao" name="customRadioInline1" className="custom-control-input"
                onChange={(e) => this.setState({ requisicoes: e.target.id, cont: "" })} />
              <label id="mudarCor" className="custom-control-label" htmlFor="certificacao">Certificação de conhecimentos</label>
            </div>
            
            }
            <Link to ="/tela-transicao" onClick={()=>this.setState({pesquisa:false,id:""})}><Button variant={"danger"}>Voltar</Button></Link>
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


