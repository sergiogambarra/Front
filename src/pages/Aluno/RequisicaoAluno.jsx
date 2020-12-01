import React, { Component } from 'react';
import { get } from '../../services/ServicoCrud';
import { Button,Modal } from 'react-bootstrap';

class RequisicaoAluno extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aluno: {},
            requisicoes: [],
            mostraTable: false,
            page: 0,
            last: false,
            first: true,
            total: 0,
            modalShow:false,
            id:"",
            requisiçãoId:""
        }
    }

    async pesquisarNomeSolicitante() {
        const aluno = await get(`usuarios/auth/`);
        get(`requisicoes/alunos/${aluno.id}?page=${this.state.page}&size=6`).then((retorno) => {
            console.log(retorno);
            this.setState({ requisicoes: retorno.content, last: retorno.last, first: retorno.first, total: retorno.totalPages, aluno, mostraTable: true });
        })
    }

    async pesquisarRequisicoesId(e) {
      await get(`requisicoes/${e}`).then((retorno) => {
          this.setState({requisiçãoId:retorno,modalShow:true})
          console.log(retorno);
          console.log(this.state.requisiçãoId);
          
        })
    }
    componentDidMount() {
        this.pesquisarNomeSolicitante()
       
    }
    control(e) {
        if (e.target.id === "+") {
            this.setState({ page: this.state.page + 1, mostraEditar: false }, () => this.pesquisarNomeSolicitante())
        } else {
            this.setState({ page: this.state.page - 1, mostraEditar: false }, () => this.pesquisarNomeSolicitante())
        }
    }
    render() {
        return (
            <div>
                {this.state.mostraTable && <><br /><br />
                    <h3>Requisições do Aluno: {this.state.aluno && this.state.aluno.perfil.nome}</h3>
                    <table className="table" >
                        <thead className="p-3 mb-2 bg-primary text-white">
                            <tr >
                                <th scope="col">Id</th>
                                <th scope="col">Data</th>
                                <th scope="col">Tipo de requisição</th>
                                <th scope="col">Disciplina</th>
                                <th style={{ textAlign: "center" }} scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.requisicoes &&
                                this.state.requisicoes.map((u) =>
                                    <tr key={u.id}>
                                        <td>{u.id}</td>
                                        <td>{u.dataRequisicao}</td>
                                        <td>{u.tipo === "aproveitamento" ? "Aproveitamentos de estudos" : "Certificação de conhecimentos "}</td>
                                        <td>{u.disciplinaSolicitada && u.disciplinaSolicitada.nome}</td>
                                        <td style={{
                                            backgroundColor:
                                                u.deferido === "DEFERIDO" ? 'green' : u.deferido === "INDEFERIDO" ? 'red' : 'orange'
                                            , textAlign: "center" }}>
                                            {u.deferido==="INDEFERIDO"?<Button style={{background:'#AA1414',borderColor:'black'}} onClick={(e)=>this.pesquisarRequisicoesId(u.id)}>INDEFERIDO</Button>:u.deferido}
                                        </td>
                                    </tr>
                                )}
                        </tbody>
                    </table>  <hr />
                </>}
                {
                    <>
                        {this.state.last || <button id="+" onClick={(e) => this.control(e)}>Próximo</button>}
                        &nbsp;&nbsp;
                        {this.state.first || <button id="-" onClick={(e) => this.control(e)}>Anterior</button>}

                        <span style={{ float: "right" }}>Página  {this.state.page + 1} / {this.state.total}</span>
                    </>

                }
                
                
                 <Modal show={this.state.modalShow} onHide={() => this.setState({ modalShow: false})}>
                <Modal.Header closeButton>
                    <Modal.Title > Vizualizar parecer: </Modal.Title>
                </Modal.Header>
                
                    <Modal.Body> <b>Parecer Coodenador :</b> {this.state.requisiçãoId.parecerCoodenador}< br />< br />
                    <b>Parecer Professor : </b>{this.state.requisiçãoId.parecerProfessor}< br />< br />
                    <b>  Parecer Servidor : </b>{this.state.requisiçãoId.parecerServidor}
                     </Modal.Body>
               
                <Modal.Body> <span style={{color:"red"}}> {this.state.msgModalCoordenador}  </span></Modal.Body>
                
                
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
            
            </div>

        );
    }
}
export default RequisicaoAluno;


