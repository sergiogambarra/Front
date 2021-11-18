import React, { useState, useEffect } from 'react';
import { Form, Button, } from 'react-bootstrap';
import TituloPagina from '../TituloPagina';
import CursoSelect from '../inputs/CursoSelect';
import DisciplinaSolicitadaSelect from '../inputs/DisciplinaSolicitadaSelect';
import SACEInput from '../inputs/SACEInput';
import AnexarArquivosInput from '../inputs/anexarArquivosInput/AnexarArquivosInput';
import ModalConfirmarRequisicao from '../ModalConfirmarRequisicao';
import { postRequisicao } from '../../services/RequisicaoService';
import SACEAlert from '../SACEAlert';
import { get } from '../../services/ServicoCrud';

export default function CertificacaoConhecimentosForm({ user }) {

    const [curso, setCurso] = useState('');
    const [cursoInvalido, setCursoInvalido] = useState(false);

    const [formacaoAtividadeAnterior, setFormacaoAtividadeAnterior] = useState('');
    const [formacaoAtividadeAnteriorInvalida, setFormacaoAtividadeAnteriorInvalida] = useState(false);

    const [discSolicitada, setDiscSolicitada] = useState('');
    const [msgAtividadeArterior, setAtividadeAnterior] = useState('');
    const [discSolicitadaInvalida, setdiscSolicitadaInvalida] = useState(false);

    const [anexos, setAnexos] = useState([]);
    const [anexosInvalidos, setAnexosInvalidos] = useState(false);
    const [id, setId] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [alert, setAlert] = useState(null);
    const [requisicao, setRequisicao] = useState(null);

    useEffect(() => setCursoInvalido(false), [curso]);
    useEffect(() => setdiscSolicitadaInvalida(false), [discSolicitada]);
    useEffect(() => setFormacaoAtividadeAnteriorInvalida(false), [formacaoAtividadeAnterior]);
    useEffect(() => setAnexosInvalidos(false), [anexos]);
    useEffect(() => setShowModal(true), [requisicao]);
    useEffect(() => {
        const fetchData = async () => {
            const aluno = await get(`usuarios/auth/`);
            setId(aluno.id);
        }
        fetchData();
    })

    const camposInvalidos = () => {
        if (!curso) setCursoInvalido(true);
       if(anexos.length===0){setAnexosInvalidos(true)}
        if (!discSolicitada) setdiscSolicitadaInvalida(true);
        if (!anexos && !anexos.length) setAnexosInvalidos(true);
        if(formacaoAtividadeAnterior.length>100){
            setFormacaoAtividadeAnteriorInvalida(true)
            setAtividadeAnterior("Limite máximo de 100 caracteres para cadastro ")
        }
        if(formacaoAtividadeAnterior.trim()===""){
            setFormacaoAtividadeAnteriorInvalida(true)
            setAtividadeAnterior("Campo formação ou atividade é obrigatório ")
        }

        return (!curso || !formacaoAtividadeAnterior || !discSolicitada || !anexos.length||formacaoAtividadeAnterior.trim()===""||formacaoAtividadeAnterior.length>45);
    }

    const limparCampos = () => {
        setRequisicao(null);
        setCurso('');
        setDiscSolicitada('');
        setFormacaoAtividadeAnterior('');
        setAnexos([]);
    }

    const fazerRequisicao = async () => {
        if (camposInvalidos()) return;

        setRequisicao({
            formacaoAtividadeAnterior,
            tipo: "certificacao",
            anexos,
            disciplinaSolicitada: {
                id: discSolicitada.value,
                nome: discSolicitada.label,
                cargaHoraria: discSolicitada.carga,
            },
            usuario: {
                id
            }
        });
        setShowModal(true);
    }



    const enviarRequisicao = () => {
        setShowModal(false);
        // console.log(requisicao);
        postRequisicao(requisicao)
        
        .then((e)=>{
            if(e.status === 201){
             setAlert({
                mensagem: "Requisição cadastrada com sucesso !",
                tipo: 'success'
             })}else{
                setAlert({
                    mensagem: 'ATENÇÃO requisição não cadastrada! '+e.data.message,
                    tipo: 'danger'
                 })
             }
        });


        limparCampos();
    }

    return (
        <>
            <TituloPagina titulo={'Certificação de Conhecimentos'} />

            {alert && <SACEAlert mensagem={alert.mensagem} tipo={alert.tipo} setAlert={setAlert} />}

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
                onChange={({ target }) => setFormacaoAtividadeAnterior(target.value)}
                value={formacaoAtividadeAnterior}
                setFormacaoAtividadeAnterior={setFormacaoAtividadeAnterior}
                onError={formacaoAtividadeAnteriorInvalida}
                onErrorMessage={msgAtividadeArterior}
            />

            <AnexarArquivosInput
                anexos={anexos}
                setAnexos={setAnexos}
                onError={anexosInvalidos}
                onErrorMessage={"Obrigatório inserir pelo menos um anexo"}
            /> <br />
            <Form.Text style={{ textAlign: "center" }} className="text-danger">{"Só pode anexar arquivos com extensão em pdf, jpeg, jpg e png de até 4 Mb"} </Form.Text>
            <br />
            <Form.Group className="d-flex justify-content-end">
                <Button variant="primary" className="btn btn-primary m-1" onClick={fazerRequisicao}>Enviar</Button>
                <Button variant="danger" className="btn btn-primary m-1" onClick={limparCampos}>Cancelar</Button>
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
