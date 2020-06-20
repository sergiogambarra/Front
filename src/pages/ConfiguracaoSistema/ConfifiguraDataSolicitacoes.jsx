import React, { Component } from 'react';
import { Button, Alert } from 'react-bootstrap';
import SACEInput from '../../components/inputs/SACEInput';

class ConfiguraDataSolicitacoes extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            alert:false,dataInicio:"",dataFinal:"",dataInicioInvalida:false,dataFinalInvalida:false
         }
    }
    limpar() {
        this.setState({ dataInicio: "", dataFinal: "", dataInicioInvalida: false, dataFinalInvalida: false })
      }
      async pesquisaData() {

        if (!this.state.dataInicio) {
          this.setState({ dataInicioInvalida: true })
          return
        }
        if (!this.state.dataFinal) {
          this.setState({ dataFinalInvalida: true })
          return
        }
     
      }
    render() { 
        return (  <div>
            <br /><br />
        <Alert variant={"danger"} show={this.state.alert}>Não foi encontrada requisição para esse período</Alert>
       
          <h3 style={{ textDecoration: "underline" }}>Defina a data para a abertura do edital</h3><br />
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
          
            <Button onClick={() => this.pesquisaData()}>Pesquisar</Button>&nbsp;&nbsp;
            <Button variant={"danger"} onClick={() => this.limpar()}>Limpar</Button>
       
        </div>);
    }
}
 
export default ConfiguraDataSolicitacoes ;