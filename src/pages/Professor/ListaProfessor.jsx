import React, { Component } from 'react';
import { get, getId, put, del } from '../../services/ServicoCrud';
import SACEInput from '../../components/inputs/SACEInput';
import { Button, Form } from 'react-bootstrap'

class ListaProfessor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            professores: [],
            siape: "",
            cordenador: "",
            mostrarEditar: false
        }
    }

    async componentDidMount() {
        const professores = await get("usuarios/professores/");
        this.setState({ professores })
    }
    async buscaPeloId(e) {
        const usuario = await getId("usuarios/", e)
        this.setState({
            id: usuario.id,
            nome: usuario.perfil.nome,
            siape: usuario.perfil.siape,
            cordenador: usuario.perfil.cordenador,
            mostrarEditar: true
        })
    }
    editar(e) {
        put("usuarios", e,
            {
                perfil: {
                    nome: this.state.nome,
                    tipo: "PROFESSOR",
                    siape: this.state.siape,
                    cordenador: this.state.cordenador,
                }
            }).then(() => {
                this.setState({ mostrarEditar: false });
                this.componentDidMount()
            })
    }
    deletar(e) {
        del("usuarios",e).then(()=>{
            this.componentDidMount()
        })
    }

    render() {
        return (<div>
            <br /><br />
            <h3>Professores </h3>
            <table className="table">
                <thead className="p-3 mb-2 bg-primary text-white">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Siape</th>
                        <th scope="col">Cordenador</th>
                        <th scope="col">Apagar</th>
                        <th scope="col">Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.professores &&
                        this.state.professores.map((p) =>

                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.perfil.nome}</td>
                                <td>{p.perfil.siape}</td>
                                <td>{p.perfil.cordenador ? "SIM" : "Não"}</td>
                                <td> {p.perfil.nome === "" ? "" : <Button
                                    variant="primary"
                                    className="btn btn-danger m-1"
                                    onClick={() => this.deletar(p.id)}
                                > Deletar </Button>}
                                </td>
                                <td> {p.perfil.nome === "" ? "" : <Button
                                    variant="primary"
                                    className="btn btn-success m-1"
                                    onClick={() => this.buscaPeloId(p.id)}
                                > Editar </Button>}
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
            {this.state.mostrarEditar && this.state.mostrarEditar === true ? <>
                <hr /><br /><br />

                <h3 style={{ textAlign: 'center' }}>Formulário Edição</h3>
                <p >ID : <span style={{
                    color: 'red'
                }}>{this.state.id}</span></p>
                <SACEInput
                    label={'Nome'}
                    value={this.state.nome}
                    placeholder={'Informe o seu nome. '}
                    onChange={(e) => this.setState({ nome: e.target.value })}
                    onError={this.state.nomeInvalido}
                    onErrorMessage={'Você não inseriu o seu nome corretamente!'}
                />
                <SACEInput
                    tipo={"number"}
                    min="0"
                    label={'Siape'}
                    value={this.state.siape}
                    placeholder={'Informe a sua siape. '}
                    onChange={(e) => this.setState({ siape: e.target.value })}
                    onError={this.state.siapeInvalido}
                    onErrorMessage={'Você não inseriu a seu siape corretamente!'}
                />
                <Form.Check type="switch" id="custom-switch" label="Cordenador" value={this.state.cordenador} checked={this.state.cordenador}
                    onChange={() => this.setState({ cordenador: !this.state.cordenador })} />
                <br />

                <Button
                    variant="primary"
                    className="btn btn-primary m-1"
                    onClick={() => this.editar(this.state.id)}
                > Salvar </Button>

            </> : ""}

        </div>);
    }
}

export default ListaProfessor;
