import React, { useState, useEffect } from 'react';
import { Form, Button,  } from 'react-bootstrap';
import TituloPagina from '../TituloPagina';
import SACEInput from '../inputs/SACEInput';
import DisciplinaSolicitadaSelect from '../inputs/DisciplinaSolicitadaSelect';
import AnexarArquivosInput from '../inputs/anexarArquivosInput/AnexarArquivosInput';
import CursoSelect from '../inputs/CursoSelect';
import ModalConfirmarRequisicao from '../ModalConfirmarRequisicao';
import { postRequisicao } from '../../services/RequisicaoService';  
import SACEAlert from '../SACEAlert';

export default function CertificacaoConhecimentosForm({user}) {
    const [curso, setCurso] = useState('');
    const [cursoInvalido, setCursoInvalido] = useState(false);

    const [disciplinasCursadasAnterior, setDisciplinasCursadasAnterior] = useState('');
    const [disciplinasCursadasAnteriorInvalida, setDisciplinasCursadasAnteriorInvalida] = useState(false);

    const [discSolicitada, setDiscSolicitada] = useState('');
    const [discSolicitadaInvalida, setDiscSolicitadaInvalida] = useState(false);
    const [anexos, setAnexos] = useState([]);
    const [anexosInvalidos, setAnexosInvalidos] = useState(false);
    
    const [showModal, setShowModal] = useState(false);
    const [alert, setAlert] = useState(null);    
    const [requisicao, setRequisicao] = useState(null);

    useEffect(() => setCursoInvalido(false), [curso]);
    useEffect(() => setDiscSolicitadaInvalida(false), [discSolicitada]);
    useEffect(() => setDisciplinasCursadasAnteriorInvalida(false), [disciplinasCursadasAnterior]);
    useEffect(() => setAnexosInvalidos(false), [anexos]);
    useEffect(() => setShowModal(true), [requisicao]);

    const camposInvalidos = () => {
        if(!curso) setCursoInvalido(true);
        if(!disciplinasCursadasAnterior) setDisciplinasCursadasAnteriorInvalida(true);
        if(!discSolicitada) setDiscSolicitadaInvalida(true);
        if(!anexos && !anexos.length) setAnexosInvalidos(true);

        return ( !curso || !disciplinasCursadasAnterior || !discSolicitada || !anexos.length );
    }

    const limparCampos = () => {
        setRequisicao(null);
        setCurso('');
        setDiscSolicitada('');
        setDisciplinasCursadasAnterior('');
        setAnexos([]);
        

    }
    const fazerRequisicao = async () => {
        if(camposInvalidos()) return;   
        
        setRequisicao({
            curso,
            disciplinasCursadasAnterior,
            tipo: "aproveitamento",
            anexos,
            disciplinaSolicitada: {
                id: discSolicitada.value,
                nome: discSolicitada.label, 
                cargaHoraria: discSolicitada.carga, 
            },
            usuario:{
                id:user.id
            }
        });  
        setShowModal(true);
    }

    const enviarRequisicao = () => {
        setShowModal(false);
        
        if(postRequisicao(requisicao)){
            setAlert({
                mensagem: 'Requisição enviada com sucesso!',
                tipo: 'success'
            });
        } else {
            setAlert({
                mensagem: 'ATENÇÃO! Requisição não enviada!',
                tipo: 'danger'
            });
        }

         /*setTimeout(() => setAlert(null), 3000);*/
        limparCampos();
    }

    return (
        <>
            <TituloPagina titulo={'Aproveitamento de Estudos'} />
            
            {alert && <SACEAlert mensagem={alert.mensagem} tipo={alert.tipo} setAlert={setAlert}/>}

            <CursoSelect
                value={curso}
                onChange={setCurso} 
                onError={cursoInvalido} 
            />

            <DisciplinaSolicitadaSelect
                value={discSolicitada}
                onChange={setDiscSolicitada}
                disabled={!curso}
                onError={discSolicitadaInvalida}
                curso={curso}
            />

            <SACEInput
                label={'Disciplina cursada anteriormente'}
                placeholder={'Preencha com o nome da disciplina que você cursou em outra instituição'}
                value={disciplinasCursadasAnterior}
                onChange={({ target }) => setDisciplinasCursadasAnterior(target.value)}
                onError={disciplinasCursadasAnteriorInvalida}
                onErrorMessage={'O campo disciplina anterior é obrigatório.'}
            />

            <AnexarArquivosInput
                anexos={anexos}
                setAnexos={setAnexos}
                onError={anexosInvalidos}
            />

            <Form.Group className="d-flex justify-content-end">
                <Button variant="link" className="btn btn-link m-1" onClick={limparCampos}>
                    Cancelar
                </Button>
                
                <Button variant="primary" className="btn btn-primary m-1" onClick={fazerRequisicao}>
                    Enviar
                </Button>
            </Form.Group>

            {(showModal && requisicao)
                &&
                <ModalConfirmarRequisicao 
                    requisicao={requisicao} 
                    setShowModal={setShowModal}
                    showModal={showModal}
                    enviarRequisicao={enviarRequisicao}
                />
            }
        </>
    );
}
