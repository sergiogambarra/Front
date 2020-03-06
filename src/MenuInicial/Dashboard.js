import { Form } from 'react-bootstrap';
//import Requisicoes from '../pages/requisicoes/Requisicoes'
import Curso from '../Cursos/CursoView'
import Disciplina from '../Disciplinas/DisciplinaView'
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
   /*
  <button style={btnRequisicao} onClick={this.viewRequisicoes.bind(this)}  >Requisicões</button> 
        <button onClick={this.viewCurso.bind(this)}  >Adicionar curso</button> 
        <button style={btnCurso} onClick={this.viewDisciplina.bind(this)}  >Adicionar disciplina</button> 

    render() {

      const btnRequisicao = {
        margin: "0px 2px 75px 40%",
        color: "white",
        padding: "10px",
        fontFamily: "Arial"
      };

      const btnCurso = {
        color: "white",
        backgroundColor: "DodgerBlue",
        padding: "10px",
        fontFamily: "Arial"
      };


      return(
       <div >

      <div style={btnRequisicao} class="btn-group" role="group" aria-label="Basic example">
         <button type="button" class="btn btn-secondary" onClick={this.viewRequisicoes.bind(this)}>Requisicões</button>
         <button type="button" class="btn btn-secondary" onClick={this.viewCurso.bind(this)} >Cursos</button>
         <button type="button" class="btn btn-secondary" onClick={this.viewDisciplina.bind(this)}>Disciplinas</button>
      </div>


        {this.state.telaSelecionada=="requisicao"?<Requisicoes/>: ""}    
        {this.state.telaSelecionada=="curso"?<Curso /> : ""} 
        {this.state.telaSelecionada=="disciplina"?<Disciplina /> : ""} 

*/
    render() {
      return(
       <div className="container">


  
       </div>
      );
    }
}


