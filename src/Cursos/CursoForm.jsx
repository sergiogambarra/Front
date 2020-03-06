import React, { useState } from 'react';
import SACEInput from '../components/inputs/SACEInput';
import { Form, Button, } from 'react-bootstrap';

export default function CursoForm({ onCadastrar, editar }) {
    const [nome, setNome] = useState("");
    const limpar = () => setNome("");
    const [verifica, setVerifica] = useState(false);
    const confirmar = () => {
        if (nome.length < 3) {
            camposInvalidos()
        }else{
            onCadastrar({ nome: nome });
            limpar();
            setVerifica(false);
        }
        

    }
    const camposInvalidos = () => {
        setVerifica(true);
       console.log(verifica)
         }
       
    return (
        <fieldset>
            <SACEInput
                label={'Nome do Curso'}
                placeholder={'Preencha com o nome do curso que você deseja cadastrar'}
                value={nome}
                onChange={({ target }) => setNome(target.value)}
                onError={verifica}
                onErrorMessage={'O nome curso é obrigatório ter mais de 3 caracteres.'}
            />

            <Form.Group className="d-flex justify-content-end">
                <Button
                    variant="link"
                    className="btn btn-link m-1"
                    onClick={() => limpar()}
                >
                    {editar ? "Cancelar" : "Limpar"}
                </Button>

                <Button
                    variant="primary"
                    className="btn btn-primary m-1"
                    onClick={() => confirmar()}

                >
                    Enviar
                </Button>
            </Form.Group>
        </fieldset>
    );
}