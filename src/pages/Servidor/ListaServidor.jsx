import React, { Component } from 'react';
import { get, getId ,put, del} from './../../services/ServicoCrud'
import { Button} from 'react-bootstrap'
import SACEInput from '../../components/inputs/SACEInput';

class ListaServidor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            servidores: [],
            siape: "",
            mostrarEditar: false

        }
    }
    async componentDidMount() {
        const servidores = await get("usuarios/servidores/")
        this.setState({ servidores })
    }
    async buscaPeloId(e) {
        const usuario = await getId("usuarios/", e)
        this.setState({
            id: usuario.id,
            nome: usuario.perfil.nome,
            siape: usuario.perfil.siape,
            mostrarEditar: true
        })
    }
    editar(e) {
        put("usuarios", e,
            {
                perfil: {
                    nome: this.state.nome,
                    tipo: "SERVIDOR",
                    siape: this.state.siape,
                }
            }).then(() => {
                this.setState({ mostrarEditar: false });
                this.componentDidMount()
            })
    }
    deletar(e){
        del("usuarios",e).then(()=>{
            this.componentDidMount()
        })
    }
    render() {
        return (<div>
            <br /><br />
            <h3>Servidor </h3>
            <table className="table">
                <thead className="s-3 mb-2 bg-primary text-white">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Siape</th>
                        <th scope="col">Login</th>
                        <th scope="col">Apagar</th>
                        <th scope="col">Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.servidores &&
                        this.state.servidores.map((s) =>

                            <tr key={s.id}>
                                <td>{s.id}</td>
                                <td>{s.perfil.nome}</td>
                                <td>{s.perfil.siape}</td>
                                <td>{s.username}</td>
                                <td> {s.perfil.nome === "" ? "" : <Button
                                    variant="primary"
                                    className="btn btn-danger m-1"
                                    onClick={()=>this.deletar(s.id)}
                                > Deletar </Button>}
                                </td>
                                <td> {s.perfil.nome === "" ? "" :<a href="#top"><Button
                                    variant="primary"
                                    className="btn btn-success m-1"
                                    onClick={() => this.buscaPeloId(s.id)}
                                > Editar </Button></a>}
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>

            {this.state.mostrarEditar && this.state.mostrarEditar === true ? <>
                <hr /><br /><br />

                <h3 id="top" style={{ textAlign: 'center' }}>Formulário Edição</h3>
                <p >ID : <span style={{
                    color: 'red'
                }}>{this.state.id}</span></p>
                <SACEInput
                    autoFocus={true}
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
                <Button
                    variant="primary"
                    className="btn btn-primary m-1"
                    onClick={() => this.editar(this.state.id)}
                > Salvar </Button>

            </> : ""}

        </div>);
    }
}

export default ListaServidor;
