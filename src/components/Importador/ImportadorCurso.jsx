import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import { post } from '../../services/ServicoCrud';


class ImportarCurso extends Component {
    constructor(props) {
        super(props);
        this.state = {
            umArquivo: ""
        }
    }
   
    async enviar() {
        await post("anexos/teste", { arquivo: this.state.umArquivo })
    }


    render = () => {

        return (
            <div>

                <form action="http://localhost:8080/api/anexos/teste" method="post" enctype="multipart/form-data">
                    <input type="file" name="umArquivo" />
                    <input type="submit" value="enviar"/>
                </form>

            </div>


        )
    }
}

export default ImportarCurso;