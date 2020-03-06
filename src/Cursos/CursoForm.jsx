import React, { useState } from 'react';
import SACEInput from '../components/inputs/SACEInput';
import { Form, Button, } from 'react-bootstrap';

export default function CursoForm({ onCadastrar, editar }) {
    const [nome, setNome] = useState("");

    const limpar = () => setNome("");
    
   
    const confirmar = () => { 
        console.log("ddwdwddw")
        if(nome.length > 3){
            onCadastrar({ nome: nome });        
            limpar();
        }else{
            alert('O campo disciplina anterior é obrigatório.')
        }
        
    }
   

    return(
        <fieldset>
            <SACEInput
                label={'Nome do Curso'}
                placeholder={'Preencha com o nome do curso que você deseja cadastrar'}
                onErrorMessage={'O campo disciplina anterior é obrigatório.'}
                value={nome}
                onChange={({ target }) => setNome(target.value)}
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
                    onErrorMessage={'O campo disciplina anterior é obrigatório.'}
                                    
                >
                    Enviar
                </Button>
            </Form.Group>
        </fieldset>
    );
}