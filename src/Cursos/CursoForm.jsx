import React, { useState } from 'react';
import SACEInput from '../components/inputs/SACEInput';
import { Form, Button, } from 'react-bootstrap';

export default function CursoForm({ onCadastrar, editar }) {
    const [nome, setNome] = useState("");
    const limpar = () => setNome("");
    const [verifica, setVerifica] = useState(false);
    const confirmar = () => { 
        onCadastrar({ nome: nome });        
        limpar();
    }
const camposInvalidos = ()=>{
if(!verifica){
setVerifica=(true);
}

}
    return(
        <fieldset>
            <SACEInput
                label={'Nome do Curso'}
                placeholder={'Preencha com o nome do curso que você deseja cadastrar'}
                value={nome}
                onChange={({ target }) => setNome(target.value)}
                onError={verifica}
                onErrorMessage={'O campo disciplina anterior é obrigatório.'}
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
                    disabled={nome.length < 3}
                >
                    Enviar
                </Button>
            </Form.Group>
        </fieldset>
    );
}