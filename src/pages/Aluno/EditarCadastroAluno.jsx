import React, { Component } from 'react'
import axios from 'axios';
import { Button } from 'react-bootstrap';


class EditarCadastroAluno extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: {
                nome: "",
                email: "",
                matricula: "",
                login: ""
            },
            requisicao: {
                anexos: [],

                id: "",
                dataRequisicao: "",
                requisicoes: "",
                disciplinaSolicitada: [
                    this.state = {
                        nome: ""
                    }],
                deferido: "",
                parecer: "",
                usuario: [],
                arquivos: []
            }
        }
        console.log(this.props.match.params.id)
    }

    async componentDidMount() {
        console.log(this.props.match.params.id);
        await axios.get(`/api/requisicoes/${this.props.match.params.id}`).then((retorno) =>
            this.setState({ requisicao: retorno.data })
        )
    }
    getFiles(files) {
        this.setState({ files: files })
    }
    render() {
        return (<div style={{marginLeft:"320px"}}>
            <br /><br />
            <label>Aluno</label><br />
            <input type="text" size="30" disabled
                value={"  " + this.state.requisicao.usuario.nome}></input>
            <br /><br />
            <label>Disciplina solicitada</label><br />
            <input type="text" size="30" disabled
                value={"  " + this.state.requisicao.disciplinaSolicitada.nome}></input>
            <br /><br />
            <label>Número da solicitação</label><br />
            <input type="text" size="30" disabled
                value={"  " + this.state.requisicao.id}></input>
            <br /><br />
            <div class="files-dropzone-list" style={{ height: "70px" ,width:"250px",border:"dashed" }}>Clique ou solte aqui os arquivos para anexar</div><br />
            <Button style={{marginLeft:"100px"}}>Adicionar arquivos</Button><br /><br />
            <label>Arquivos enviados</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <br />
            <ol style={{ textAlign: "left" }}>
                {
                    this.state.requisicao.anexos.map((a) => {
                        return <li> <strong>{a.nome}</strong> </li>

                    })
                }
            </ol>

        </div>);
    }
}


export default EditarCadastroAluno;