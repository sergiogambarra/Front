import React, { Component } from 'react';
import TituloPagina from '../../components/TituloPagina';
import { get } from '../../services/ServicoCrud'

class RequisicioesCoordenadorCurso extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requisicoes: "",
            user:"",listaRequisicaoCoordenadorCerfificacao:[],listaRequisicaoCoordenadorAproveitamento:[]
        }

    }
    async componentDidMount() {
        this.listaAth()
    }

    async listaAth() {
        await get("usuarios/auth/").then((retorno) => {
            this.setState({ user: retorno })
        })

    }
    async listaRequisicoesCoordenadorCertificacao() {
        await get(`requisicoes/coordenador/cert/${this.state.user.id}`).then((retorno) => {
            this.setState({ listaRequisicaoCoordenadorCerfificacao: retorno && retorno.content })
            console.log(this.state.listaRequisicaoCoordenadorCerfificacao);
        })
    }
    async listaRequisicoesCoordenadorAproveitamento() {
        await get(`requisicoes/coordenador/apro/${this.state.user.id}`).then((retorno) => {
            this.setState({ listaRequisicaoCoordenadorAproveitamento: retorno && retorno.content })
            console.log(this.state.listaRequisicaoCoordenadorAproveitamento);
        })
    }
    render() {
        return (<div>
            <br />
            <TituloPagina titulo={'Requisições dos cursos qual sou coordenador'} />
            <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" id="aproveitamento" name="customRadioInline1" className="custom-control-input"
                    onChange={(e) => this.setState({ requisicoes: e.target.id, pesquisa: false }) + this.listaRequisicoesCoordenadorAproveitamento()} />
                <label id="mudarCor" className="custom-control-label" htmlFor="aproveitamento">Aproveitamento de estudos</label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" id="certificacao" name="customRadioInline1" className="custom-control-input"
                    onChange={(e) => this.setState({ requisicoes: e.target.id, pesquisa: false })+ this.listaRequisicoesCoordenadorCertificacao()} />
                <label id="mudarCor" className="custom-control-label" htmlFor="certificacao">Certificação de conhecimentos</label>
            </div>
            {console.log(this.state.requisicoes)}
        </div>);

    }
}

export default RequisicioesCoordenadorCurso;