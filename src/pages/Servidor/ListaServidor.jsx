import React, { Component } from 'react';
import { get, getId, put, del } from './../../services/ServicoCrud'
import { Button, Modal, Alert } from 'react-bootstrap'
import SACEInput from '../../components/inputs/SACEInput';

class ListaServidor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            servidores: [],
            siape: "", id: "", email: "",
            mostrarEditar: false, modalShow: false, alert: false,
            emailInvalido: false, siapeInvalido: false, nomeInvalido: false

        }
    }
    async componentDidMount() {
        const servidores = await get("usuarios/pages?tipo=SERVIDOR")
        console.log(servidores);
        
        this.setState({ servidores })
    }
    async buscaPeloId(e) {
        const usuario = await getId("usuarios/", e)
        this.setState({
            id: usuario.id,
            nome: usuario.perfil.nome,
            siape: usuario.perfil.siape,
            email: usuario.email,
            mostrarEditar: true
        })
    }

    editar(e) {
        console.log(this.state.email);

        if (this.nome === null || this.state.nome === "" ? this.setState({ nomeInvalido: true }) : this.setState({ nomeInvalido: false })) { }
        if (this.siape === null || this.state.siape === ""||this.state.siape<=0 ? this.setState({ siapeInvalido: true }) : this.setState({ siapeInvalido: false })) { }
        if (this.email === null || this.state.email === "" ? this.setState({ emailInvalido: true }) : this.setState({ emailInvalido: false })) { }
        if (this.email === null || this.state.email === "" || this.siape === null ||this.state.siape<=0||this.state.siape === "" || this.nome === null || this.state.nome === "") { return }
        put("usuarios", e,
            {
                email: this.state.email,
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
    deletar(e) {
        del("usuarios", e).then(() => {
            this.setState({ modalShow: false, mostrarEditar: false })
            this.componentDidMount()
        }).then(() =>
            this.setState({ alert: true }), setTimeout(() => {
                this.setState({ alert: false })
            }, 2000)
        )
    }
    limpar() {
        this.setState({
            nomeInvalido: false, siapeInvalido: false, emailInvalido: false
        })
    }
    render() {
        console.log(this.state.servidores);
        return (<div>
            <br /><br />
            <Alert variant={"danger"} show={this.state.alert}>Apagou com sucesso</Alert>
            <h3>Servidores </h3>
            <table className="table">
                <thead className="s-3 mb-2 bg-primary text-white">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nome</th>
                        <th scope="col">SIAPE</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Apagar</th>
                        <th scope="col">Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.servidores.content &&
                        this.state.servidores.content.map((s) =>

                            <tr key={s.id}>
                                <td>{s.id}</td>
                                <td>{s.perfil.nome}</td>
                                <td>{s.perfil.siape}</td>
                                <td>{s.email}</td>
                                <td> {s.perfil.nome === "" ? "" : <Button
                                    variant="primary"
                                    className="btn btn-danger m-1"
                                    onClick={() => this.setState({ modalShow: true, id: s.id, mostrarEditar: false, nome: s.perfil.nome }, this.limpar(),)}
                                > Apagar </Button>}
                                </td>
                                <td> {s.perfil.nome === "" ? "" : <a href="#top"><Button
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

                <h3 id="top" style={{ textAlign: 'center' }}>Formulário de Edição</h3>
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
                    label={'SIAPE'}
                    value={this.state.siape}
                    placeholder={'Informe a sua siape. '}
                    onChange={(e) => this.setState({ siape: e.target.value })}
                    onError={this.state.siapeInvalido}
                    onErrorMessage={'Você não inseriu a seu siape corretamente!'}
                />
                <SACEInput
                    label={'E-mail'}
                    value={this.state.email}
                    placeholder={'Informe o seu nome. '}
                    onChange={(e) => this.setState({ email: e.target.value })}
                    onError={this.state.emailInvalido}
                    onErrorMessage={'Você não inseriu o seu nome corretamente!'}
                />
                <Button
                    variant="primary"
                    className="btn btn-primary m-1"
                    onClick={() => this.editar(this.state.id)}
                > Salvar </Button>

            </> : ""}

            <Modal show={this.state.modalShow} onHide={() => this.setState({ modalShow: false })} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title > Confirmar</Modal.Title>
                </Modal.Header>
                <Modal.Body>Apagar cadastro do servidor/servidora? </Modal.Body>
                <Modal.Body>ID :&nbsp;{this.state.id} </Modal.Body>
                <Modal.Body>Nome :&nbsp;{this.state.nome} </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        className="btn btn-danger m-1"
                        onClick={() => this.deletar(this.state.id)}
                    > Apagar </Button>
                </Modal.Footer>
            </Modal>
        </div>);
    }
}

export default ListaServidor;
