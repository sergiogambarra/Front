import React, { Component } from 'react';
import Axios from "axios";
import {baseURL} from "../enviroment";
class ListaUsuarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarios:[]
            
          }
    }
    async componentDidMount(){
    //    await Axios.get(baseURL+"/usuarios/").then((retorno)=>this.setState({usuarios:retorno.data}));
    }

    render() { 
        return (
            <div>
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>id</th>
                            <th>nome</th>
                            <th>email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        this.state.usuarios.map((usuario)=> 
                             <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>{usuario.nome}</td>
				<td>{usuario.email}</td>
                             </tr>
                        )
                        }
                    </tbody>
                </table>
            </div>
          );
    }
}
 
export default ListaUsuarios;