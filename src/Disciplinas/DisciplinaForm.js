import React from 'react';

export default class DisciplinaForm extends React.Component {

    constructor(props) {
        super(props);
        
            this.state = {
                nome: "",
                cargaHoraria: 0,
                curso:this.state = {}
        }
    }

    limpar() {

            this.setState({
                nome: ""
            });
    }

    confirmar() {

            this.props.onCadastrar({
                nome: this.state.nome,
                cargaHoraria: this.state.cargaHoraria,
                curso:this.state.curso
            });
        
        this.limpar();
    }

    handleChangeCurso(event) {
        this.setState({curso:this.state = {id:event.target.value}});
    }


    render() {
        
        const inputStyle = {
            margin: "0px 0px 10px 40%",
            width: "400px",
            padding: "10px",
            fontFamily: "Arial"
          };

          const label = {
            margin: "0px 0px 0px 30%",
            width: "400px",
            padding: "0px",
            fontFamily: "Arial"
          };
    
          const btnCadastrar = {
    
            padding: "10px",
            fontFamily: "Arial"
          };

          const btnLimpar = {
            
            padding: "10px",
            fontFamily: "Arial"
          };


        return <fieldset>


        <label>
            Selecione o curso <br/>
            <select value={this.state.curso.id} onChange={this.handleChangeCurso.bind(this)}>
            
                {
                    this.props.cursos.map(curso =>{
                        return(
                        <option key={curso.id}  value={curso.id}>{curso.nome}</option>
                        )
                    })
                }
            </select>
            </label><br/><br/>


           <label >Nome da Disciplina</label><br/>
           <input value={this.state.nome}
           onChange={(event) => this.setState({nome:event.target.value}) }
           /><br/>

           <label >Carga horaria</label><br/>
           <input type="number" value={this.state.cargaHoraria}
           onChange={(event) => this.setState({cargaHoraria:event.target.value}) }
           /><br/><br/>
            
            <button style={btnCadastrar}
                onClick={() => this.confirmar()}
            >{"Cadastrar"}</button>

            <button style={btnLimpar}
                onClick={() => this.limpar()}
            >{this.props.editar ? "Cancelar" : "Limpar"}</button>
        </fieldset>
    }
}