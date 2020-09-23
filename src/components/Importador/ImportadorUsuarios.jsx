import React, { Component } from 'react'
import { Alert } from 'react-bootstrap';



class ImportadorProfessores extends Component {
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
                <h3>Importador para cadastro de Usuários</h3>
                <br />
                <Alert variant={"danger"}>Para importação correta do arquivo com extensão .csv deve estar organizado de modo que:<br />
                 a primeira coluna inclua o nome do usuário;<br />
                 a segunda coluna inclua o número do SIAPE;<br />
                 terceira coluna endereço do email;<br />
                 quarta coluna se digitar SIM ou NÂO para coordenador de curso;<br />
                 quinta coluna o cargo do usuário (PROFESSOR ou SERVIDOR)</Alert>
                <br /> <br />
                <form action={("http://localhost:8080/api/anexos/usuarios")} method="post" enctype="multipart/form-data" >
                    <input type="file" name="umArquivo" />
                    <input type="submit" value="enviar" />
                </form>

            </div>


        )
    }
}

export default ImportadorProfessores;