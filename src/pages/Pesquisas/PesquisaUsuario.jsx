import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { get } from '../../services/ServicoCrud';

class PesquisaUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matricula: ""
        }
    }

    pesquisaMatricula() {
        get()
    }
    render() {
        return (<diV>
            < Form >
                <Form.Group controlId="exampleForm.SelectCustom">
                    <br />
                    <Form.Label>Selecione tipo da pesquisa</Form.Label>
                    <Form.Control as="select" custom
                        onChange={
                            (e) => {
                                this.setState({ status: e.target.value })
                            }} >
                        <option key={0} value={""}></option>
                        <option value={"matricula"}>Matrícula</option>

                    </Form.Control>
                    <Form.Text className="text-danger">{this.state.msgErrorStatus} </Form.Text>
                </Form.Group>
                <Button onClick={() => this.pesquisaStatus()
                }>Pesquisar</Button>
            </Form>

        </diV>);
    }
}

export default PesquisaUsuario;