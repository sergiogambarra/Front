import React, { Component } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import SACEInput from '../../components/inputs/SACEInput';
import { put, get } from '../../services/ServicoCrud';
import { format } from '../../auxiliares/FormataData';

class ConfiguraDataSolicitacoes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: false, dataInicio: "", dataFinal: "", dataInicioInvalida: false, dataFinalInvalida: false, modalShow: false, dataInicioSalva: "", dataFechamentoSalva: "", variantAlert: "", msgAlert: ""

    }
  }
  limpar() {
    this.setState({ dataInicio: "", dataFinal: "", dataInicioInvalida: false, dataFinalInvalida: false, alert: false })
  }

  salvarDatadeAberturaFechamento() {

    if (this.state.dataInicio > this.state.dataFinal) {
      this.setState({ alert: true, variantAlert: "danger", msgAlert: "Data de abertura do edital não pode ser menor que data de fechamento" })

      return
    }
    if (!this.state.dataInicio) {
      this.setState({ dataInicioInvalida: true })
      return
    }
    if (!this.state.dataFinal) {
      this.setState({ dataFinalInvalida: true })
      return
    }
    put("configuracao", 1, {
      dataAbertura: this.state.dataInicio,
      dataFechamento: this.state.dataFinal
    }).then(() => {
      this.setState({ alert: true, variantAlert: "success", msgAlert: "Cadastrado com sucesso" })
    })
    setTimeout(() => { this.setState({ alert: false }) }, 7000);
    this.limpar()

  }
  mostraDataEdital() {
    get("configuracao/").then((r) => {
      console.log(r);
      this.setState({ dataInicioSalva: r && r[0].dataAbertura, dataFechamentoSalva: r && r[0].dataFechamento, modalShow: true })
    })

  }
  render() {
    return (<div>
      <br /><br />
      <Alert show={this.state.alert} variant={this.state.variantAlert}>{this.state.msgAlert}</Alert>
      <table>
        <tr>
          <td > <h3 style={{ textDecoration: "underline" }}>Defina a data para a abertura do edital</h3></td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<td ><Button onClick={() => this.mostraDataEdital()}>Período de inscrições</Button> </td>
        </tr>
      </table>
      <br /><br />
      <SACEInput
        type={"date"}
        label={'A partir do dia '}
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
      <br />

      <Button onClick={() => this.salvarDatadeAberturaFechamento()}>Salvar</Button>&nbsp;&nbsp;
      <Button variant={"danger"} onClick={() => this.limpar()}>Limpar</Button>


      <Modal show={this.state.modalShow} onHide={() => this.setState({ modalShow: false })} >
        <Modal.Header closeButton>
          <Modal.Title > Sistema configurado para aceitar requisições novas no período informado abaixo.</Modal.Title>
        </Modal.Header>
        <Modal.Body>Abertura no edital : &nbsp;&nbsp;{format(this.state.dataInicioSalva)} </Modal.Body>
        <Modal.Body>Fechamento no edital : &nbsp;&nbsp;{format(this.state.dataFechamentoSalva)} </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>

    </div>);
  }
}

export default ConfiguraDataSolicitacoes;