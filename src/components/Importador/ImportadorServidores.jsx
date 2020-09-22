import React, { Component } from 'react'
import { Alert } from 'react-bootstrap';



class ImportadorServidores extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async enviar() {

    }


    render = () => {

        return (
            <div>
              <br />  <br />  <br />
                <h3>Importador para cadastro de Servidores</h3>
                <br />
                <Alert variant={"danger"}>Para importação correta do arquivo com extensão .csv deve estar organizado de modo que, a primeira coluna inclua o nome do curso e a segunda coluna inclua o nome coordenador.</Alert>
                <br /> <br />
                <form action={("http://localhost:8080/api/anexos/cursos")} method="post" enctype="multipart/form-data" >
                    <input type="file" name="umArquivo" />
                    <input type="submit" value="enviar" />
                </form>

            </div>


        )
    }
}

export default ImportadorServidores;