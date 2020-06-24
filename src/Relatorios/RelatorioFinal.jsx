import React, { Component } from 'react';
import { get } from '../services/ServicoCrud';
import { format2 } from '../auxiliares/FormataData';
import { Button, Table, Alert } from 'react-bootstrap';
import SACEInput from '../components/inputs/SACEInput';


class RelatorioFinal extends Component {
  constructor(props) {
    super(props);
    this.state = {alert:false,
      dataInicio: "", dataFinal: "", dataInicioInvalida: false, dataFinalInvalida: false, requisicoesAluno: [], mostraLista: false, mostraPesquisa: true,

    }
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
    if (this.state.dataInicio && this.state.dataFinal) {
      await get(`requisicoes/relatorio/data/${format2(this.state.dataInicio)}/${format2(this.state.dataFinal)}/`).then((retorno) => {
        if (retorno&&retorno.length > 0) {
          this.setState({ requisicoesAluno: retorno, mostraLista: true, dataFinalInvalida: false, dataInicioInvalida: false, mostraPesquisa: false })
        } else {
          this.setState({ alert: true })
          setTimeout(()=>{
            this.setState({ alert: false })
          },3000)
        }
      })
    }
  }
  limpar() {
    this.setState({ requisicoesAluno: "", mostraLista: false, dataInicio: "", dataFinal: "", mostraPesquisa: true, dataInicioInvalida: false, dataFinalInvalida: false })
  }
  render() {
    
    return (
      <div>   <br /><br />
        
        <br /><br />
        <Alert variant={"danger"} show={this.state.alert}>Não foi encontrada requisição para esse período</Alert>
        {this.state.mostraPesquisa &&<>
          <h3 style={{ textDecoration: "underline" }}>Relatório Final das Solicitações  </h3>
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
        </>  
        }
        {this.state.mostraLista &&
          <>
            <br /><br />
              <h1 style={{textAlign:"center"}}>Resultado Final do Edital de Aproveitamento de Estudos e Certificação de Conhecimentos</h1><br />
            <Table id="imprimir"striped bordered hover >
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Matrícula</th>
                  <th>Solicitação</th>
                  <th>Data da Solicitação</th>
                  <th>Disciplina Solicitada</th>
                  <th>Resultado</th>
                </tr>
              </thead>
              <tbody>
                {this.state.requisicoesAluno && this.state.requisicoesAluno.map((r) =>
                  <tr>
                    <td>{r.usuario.perfil.nome}</td>
                    <td>{r.usuario.perfil.matricula}</td>
                    <td>{r.tipo === "aproveitamento" ? "APROVEITAMENTO DE ESTUDOS" : "CERTIFICAÇÃO DE CONHECIMENTOS"}</td>
                    <td>{r.dataRequisicao}</td>
                    <td>{r.disciplinaSolicitada.nome}</td>
                    <td>{r.deferido}</td>
                  </tr>
                )}
              </tbody>
            </Table><br />
            
            <Button onClick={() => window.print() }>Imprimir</Button>&nbsp;&nbsp;
            <Button variant={"danger"} onClick={() => this.limpar()}>Voltar</Button>
          </>

        }

      </div>


    );
  }
}

export default RelatorioFinal;