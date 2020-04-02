import React, { Component } from 'react'
import axios from 'axios';
import SACEInput from '../../components/inputs/SACEInput';

class EditarCadastroAluno extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: {
                nome:"",
                email:"",
                matricula:"",
                login:""
            },
            requisicao: {
                anexos: []
            },
            disciplinaSolicitada:{
                nome:"",
                tipo:""
            } }
                  console.log(this.props.match.params.id)
    }

    componentDidMount() {
        console.log(this.props.match.params.id);
        axios.get(`/api/requisicoes/${this.props.match.params.id}`).then((retorno) =>
            this.setState({ requisicao: retorno.data })
        )
    }

    render() {
        return (<div>
{console.log(this.state.requisicao)}

            <SACEInput
            label={"Disciplina"}
            value={this.state.requisicao}
            disabled={true}
            />
            <ol>
                {
                    this.state.requisicao.anexos.map((a) => {
                        return <li>
                            {a.nome}
                        </li>
                    })
                }
            </ol>
        </div>);
    }
}


export default EditarCadastroAluno;