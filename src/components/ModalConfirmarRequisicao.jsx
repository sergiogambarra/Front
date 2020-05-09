import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const APROVEITAMENTO = 'aproveitamento';
const CERTIFICACAO = 'certificacao';

const getTipo = (tipo) => {
    switch(tipo) {
        case APROVEITAMENTO:
            return 'Aproveitamento de Estudos';
        case CERTIFICACAO:            
            return 'Certificação de Conhecimentos';
        default: 
            return null;
    }
}

export default function ModalConfirmarRequisicao({ enviarRequisicao, requisicao, setShowModal, showModal }){
    const { 
        tipo,
        curso, 
        formacaoAtividadeAnterior,
        disciplinasCursadasAnterior,
        disciplinaSolicitada,
        anexos
    } = requisicao;
    
    return (
        <Modal show={showModal}>
            <Modal.Header closeButton>
            <Modal.Title>Confirmar requisição?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <>
                    {
                        tipo && 
                        <p><strong>{'Tipo: '}</strong>{getTipo(tipo)}</p>
                    }
                    {
                        curso && 
                        <p><strong>{'Curso: '}</strong>{curso.label}</p>
                    }
                    {
                        disciplinaSolicitada && 
                        <p><strong>{'Disciplina solicitada: '}</strong>{disciplinaSolicitada.nome}</p>
                    }
                    {
                        formacaoAtividadeAnterior && 
                        <p><strong>{'Formação anterior: '}</strong>{formacaoAtividadeAnterior}</p>
                    }
                    {
                        disciplinasCursadasAnterior && 
                        <p><strong>{'Disciplina cursada anteriormente: '}</strong>{disciplinasCursadasAnterior}</p>
                    }
                    {
                        anexos && 
                        <div>
                            <p><strong>{'Anexos: '}</strong></p>
                            <ul>
                                {anexos.map(anexo => <li key={anexo.file.id}>{anexo.nome}</li>)}
                            </ul>
                        </div>
                    }
                </>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={() => enviarRequisicao()}>
                Salvar
            </Button>
            <Button variant="danger" onClick={() => setShowModal(false)}>
                Cancelar
            </Button>
            </Modal.Footer>
        </Modal>
    );
}