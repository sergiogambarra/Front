import React,{Component} from 'react';
import {get} from '../../services/ServicoCrud';
import { Button } from 'react-bootstrap'

class ListaProfessor extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            professores:[]
         }
    }

    async componentDidMount(){
     const professores = await get("usuarios/professores/");
     this.setState({professores})
    }


    render() { 
        return ( <div>
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
                                    > Deletar </Button>}
                                    </td>
                                    <td> {p.perfil.nome === "" ? "" : <Button
                                        variant="primary"
                                        className="btn btn-success m-1"
                                        onClick={() => this.editar(p.id)}
                                    > Editar </Button>}
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>


        </div> );
    }
}
 
export default ListaProfessor;
