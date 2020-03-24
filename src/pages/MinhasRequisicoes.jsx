import React, { Component } from 'react';
import TituloPagina from '../components/TituloPagina';
import TabelaAproveitamentos from '../components/TabelaAproveitamentos';
import TabelaCertificacoes from '../components/TabelaCertificacoes';

class MinhasRequisicoes extends Component {
  constructor(props) {
    super();
    this.state = {
       requisições: "todasRequisições"
    }}
  render() {

    return (
      <div>
        <TituloPagina titulo={'Minhas Requisições'} />

        <div class="custom-control custom-radio custom-control-inline">
          <input type="radio"
            id="todasRequisições" name="customRadioInline1" class="custom-control-input"
            onChange={(e) => this.setState({ requisições: e.target.id })}
          />
          <label class="custom-control-label" for="todasRequisições">Todas requisições</label>
        </div>
        <div class="custom-control custom-radio custom-control-inline">
          <input type="radio" id="aproveitamento" name="customRadioInline1" class="custom-control-input"
            onChange={(e) => this.setState({ requisições: e.target.id })}
          />
          <label class="custom-control-label" for="aproveitamento">Aproveitamento de estudos</label>
        </div>
        <div class="custom-control custom-radio custom-control-inline">
          <input type="radio" id="certificacao" name="customRadioInline1" class="custom-control-input"
            onChange={(e) => this.setState({ requisições: e.target.id })} />
          <label class="custom-control-label" for="certificacao">Certificação de conhecimentos</label>
        </div>
        <br /><br />
        <div class="input-group">
          <label >Pesquisa</label>&nbsp;&nbsp;
          <input type="text" class="form-control-lg" aria-label="Text input with dropdown button" />
          <div class="input-group-append">
            <button class="btn btn-outline-secondary dropdown-toggle" color="red"type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</button>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="#">Something else here</a>
              <div role="separator" class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Separated link</a>
            </div>
          </div>
        </div>
      
        {this.state.requisições === "todasRequisições" ? <div className="d-flex">
          <div className="col-6">
            <br />
            <br />
            <TabelaAproveitamentos />

          </div>
          <div className="col-6">
            <br />
            <br />
            <TabelaCertificacoes />
          </div>
        </div>
          : this.state.requisições === "aproveitamento" ? <div className="col-6">
            <br />
            <br />
            <TabelaAproveitamentos />

          </div> : <div className="col-6">
              <br />
              <br />
              <TabelaCertificacoes />
            </div>}
      </div>
    );
  }
}
export default MinhasRequisicoes;


