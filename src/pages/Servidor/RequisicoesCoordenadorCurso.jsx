import React, { Component } from 'react';
import TituloPagina from '../../components/TituloPagina';
import { get } from '../../services/ServicoCrud'
import CardAproveitamento from '../../components/CardAproveitamento';
import CardCertificacao from '../../components/CardCertificacao';
import { Container, Row } from 'react-bootstrap';

class RequisicioesCoordenadorCurso extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requisicoes: "",last:false,first:true,page:0,total:0,
            user: "", listaRequisicaoCoordenadorCerfificacao: [], listaRequisicaoCoordenadorAproveitamento: []
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
        await get(`requisicoes/coordenador/cert/${this.state.user.id}?page=0&size=0`).then((retorno) => {
            console.log(retorno);
            this.setState({ listaRequisicaoCoordenadorCerfificacao: retorno && retorno.content,last: retorno&&retorno.last, first: retorno&&retorno.first, total: retorno&&retorno.totalPages  })
        })
    }
    async listaRequisicoesCoordenadorAproveitamento() {
        await get(`requisicoes/coordenador/apro/${this.state.user.id}?page=0&size=0`).then((retorno) => {
            this.setState({ listaRequisicaoCoordenadorAproveitamento: retorno && retorno.content ,last: retorno&&retorno.last, first: retorno&&retorno.first, total: retorno&&retorno.totalPages })
            console.log(this.state.listaRequisicaoCoordenadorAproveitamento);
        })
    }
    control(e) {
        if (e.target.id === "+") {
            this.setState({ page: this.state.page + 1,  })
        } else {
            this.setState({ page: this.state.page - 1, })
        }
    }
    render() {
        return (<div>
            <br />
            <TituloPagina titulo={'Requisições do Coordenador '} />
            <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" id="aproveitamento" name="customRadioInline1" className="custom-control-input"
                    onChange={(e) => this.setState({ requisicoes: e.target.id, pesquisa: false }) + this.listaRequisicoesCoordenadorAproveitamento()} />
                <label id="mudarCor" className="custom-control-label" htmlFor="aproveitamento">Aproveitamento de estudos</label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" id="certificacao" name="customRadioInline1" className="custom-control-input"
                    onChange={(e) => this.setState({ requisicoes: e.target.id, pesquisa: false }) + this.listaRequisicoesCoordenadorCertificacao()} />
                <label id="mudarCor" className="custom-control-label" htmlFor="certificacao">Certificação de conhecimentos</label>
            </div>
            {console.log(this.state.requisicoes)}
            <br /><br />
            {this.state.requisicoes === "certificacao"? <h5 style={{textAlign:"center"}}>Certificação de Conhecimentos</h5>:
            this.state.requisicoes === "aproveitamento"? <h5 style={{textAlign:"center"}}>Aproveitamento de Estudos</h5>:""}
            <br />
            <Container>
                <Row>
                    {
                        this.state.requisicoes === "certificacao" && this.state.listaRequisicaoCoordenadorCerfificacao.map((requisicao) => {
                            const requisicaoEnviar = {
                                id: requisicao.id,
                                dataRequisicao: requisicao.dataRequisicao,
                                usuario:requisicao.usuario,
                                disciplinaSolicitada: requisicao.disciplinaSolicitada,
                                deferido: requisicao.deferido,
                                professor: requisicao.professor,
                                tipo:requisicao.tipo                                
                            }
                            console.log(this.state.requisicoes);

                            return (
                                <CardCertificacao requisicao={requisicaoEnviar} />
                            )
                        })}
                    {
                        this.state.requisicoes === "aproveitamento" && this.state.listaRequisicaoCoordenadorAproveitamento.map((requisicao) => {
                            const requisicaoEnviar = {
                                id: requisicao.id,
                                dataRequisicao: requisicao.dataRequisicao,
                                usuario:requisicao.usuario,
                                disciplinaSolicitada: requisicao.disciplinaSolicitada,
                                deferido: requisicao.deferido,
                                professor: requisicao.professor,
                                tipo:requisicao.tipo       
                            }
                            console.log(this.state.requisicoes);

                            return <CardAproveitamento requisicao={requisicaoEnviar} />

                        })}
                </Row></Container>

                {
                    <>
                        {this.state.last || <button id="+" onClick={(e) => this.control(e)}>Próximo</button>}
                        &nbsp;&nbsp;
                        {this.state.first || <button id="-" onClick={(e) => this.control(e)}>Anterior</button>}

                        <span style={{ float: "right" }}>Página  {this.state.page + 1} / {this.state.total}</span>
                    </>

                }
        </div>);

    }
}

export default RequisicioesCoordenadorCurso;