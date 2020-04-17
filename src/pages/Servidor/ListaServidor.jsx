import React, { Component } from 'react';
import { get } from './../../services/ServicoCrud'
import { Button } from 'react-bootstrap'

class ListaServidor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            servidores: []
        }
    }
   async componentDidMount() {
      const servidores = await get("usuarios/servidores/")
      this.setState({servidores})
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
                                <td> {s.perfil.nome === "" ? "" : <Button
                                    variant="primary"
                                    className="btn btn-danger m-1"
                                > Deletar </Button>}
                                </td>
                                <td> {s.perfil.nome === "" ? "" : <Button
                                    variant="primary"
                                    className="btn btn-success m-1"
                                    onClick={() => this.editar(s.id)}
                                > Editar </Button>}
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>



        </div>);
    }
}

export default ListaServidor;
