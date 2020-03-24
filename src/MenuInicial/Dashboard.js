import React, { Component } from 'react';
import axios from 'axios';

export default class DashBoard extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
         
            telaSelecionada: "/"

        }

    }

    Logar(Usuario) {
      axios.post("/api/usuarios", Usuario).then((retorno)=>
      this.setState({carregar:false,usuario:retorno.data}));
    }

    viewCurso() {
      this.setState({telaSelecionada: "curso" });
    }

    viewDisciplina() {
      this.setState({telaSelecionada: "disciplina" });
    }

    viewRequisicoes() {
      this.setState({telaSelecionada: "requisicao" });
    }
 
    render() {
      return(
       <div className="container">
       </div>
      );
    }
}


