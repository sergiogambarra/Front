import React, { useState, useEffect } from 'react';
import { Form, Button,  } from 'react-bootstrap';
import TituloPagina from '../TituloPagina';
import CursoSelect from '../inputs/CursoSelect';
import DisciplinaSolicitadaSelect from '../inputs/DisciplinaSolicitadaSelect';
import SACEInput from '../inputs/SACEInput';
import AnexarArquivosInput from '../inputs/anexarArquivosInput/AnexarArquivosInput';
import ModalConfirmarRequisicao from '../ModalConfirmarRequisicao';
import { postRequisicao } from '../../services/RequisicaoService';
import SACEAlert from '../SACEAlert';

export default function CertificacaoConhecimentosForm() {
    const [curso, setCurso] = useState('');
    const [cursoInvalido, setCursoInvalido] = useState(false);

    const [formacaoAtividadeAnterior, setFormacaoAtividadeAnterior] = useState('');
    const [formacaoAtividadeAnteriorInvalida, setFormacaoAtividadeAnteriorInvalida] = useState(false);

    const [discSolicitada, setDiscSolicitada] = useState('');
    const [discSolicitadaInvalida, setdiscSolicitadaInvalida] = useState(false);

    const [anexos, setAnexos] = useState([]);
    const [anexosInvalidos, setAnexosInvalidos] = useState(false);
    
    const [showModal, setShowModal] = useState(false);
    const [alert, setAlert] = useState(null);    
    const [requisicao, setRequisicao] = useState(null);

    useEffect(() => setCursoInvalido(false), [curso]);
    useEffect(() => setdiscSolicitadaInvalida(false), [discSolicitada]);
    useEffect(() => setFormacaoAtividadeAnteriorInvalida(false), [formacaoAtividadeAnterior]);
    useEffect(() => setAnexosInvalidos(false), [anexos]);
    useEffect(() => setShowModal(true), [requisicao]);

    const camposInvalidos = () => {
        if(!curso) setCursoInvalido(true);
        if(!formacaoAtividadeAnterior) setFormacaoAtividadeAnteriorInvalida(true);
        if(!discSolicitada) setdiscSolicitadaInvalida(true);
        if(!anexos && !anexos.length) setAnexosInvalidos(true);

        return ( !curso || !formacaoAtividadeAnterior || !discSolicitada || !anexos.length );
    }

    const limparCampos = () => {
        setRequisicao(null);
        setCurso('');
        setDiscSolicitada('');
        setFormacaoAtividadeAnterior('');
        setAnexos([]);
    }
   
    const fazerRequisicao = async () => {
        if(camposInvalidos()) return;
        
        setRequisicao({
            formacaoAtividadeAnterior,
            tipo: "certificacao",
            anexos,
            disciplinaSolicitada: {
                id: discSolicitada.value,
                nome: discSolicitada.label, 
                cargaHoraria: discSolicitada.carga, 
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

        setTimeout(() => setAlert(null), 3000);
        limparCampos();
    }

    return (
        <>
            <TituloPagina titulo={'Certificação de Conhecimentos'} />
            
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
                label={'Formação ou atividade exercida anteriormente'}
                placeholder={'Preencha com o nome da formação ou atividade que você exerceu/exerce em outra instituição'}
                onChange={({target}) => setFormacaoAtividadeAnterior(target.value)}
                value={formacaoAtividadeAnterior}
                setFormacaoAtividadeAnterior={setFormacaoAtividadeAnterior}
                onError={formacaoAtividadeAnteriorInvalida}
                onErrorMessage={'O campo formação ou atividade é obrigatório.'}
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
