import React, { Component } from 'react'



class ImportarCurso extends Component {
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

                <form action={("http://localhost:8080/api/anexos/cursos")} method="post" enctype="multipart/form-data" >
                    <input type="file" name="umArquivo" />
                    <input type="submit" value="enviar" />
                </form>

            </div>


        )
    }
}

export default ImportarCurso;