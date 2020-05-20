import React, { useState, useEffect } from 'react';
import { Form, Button, } from 'react-bootstrap';
import TituloPagina from '../TituloPagina';
import SACEInput from '../inputs/SACEInput';
import DisciplinaSolicitadaSelect from '../inputs/DisciplinaSolicitadaSelect';
import AnexarArquivosInput from '../inputs/anexarArquivosInput/AnexarArquivosInput';
import CursoSelect from '../inputs/CursoSelect';
import ModalConfirmarRequisicao from '../ModalConfirmarRequisicao';
import { postRequisicao } from '../../services/RequisicaoService';
import SACEAlert from '../SACEAlert';
import { get } from '../../services/ServicoCrud';

export default function CertificacaoConhecimentosForm() {
    const [curso, setCurso] = useState('');
    const [cursoInvalido, setCursoInvalido] = useState(false);

    const [disciplinasCursadasAnterior, setDisciplinasCursadasAnterior] = useState('');
    const [disciplinasCursadasAnteriorInvalida, setDisciplinasCursadasAnteriorInvalida] = useState(false);

    const [discSolicitada, setDiscSolicitada] = useState('');
    const [discSolicitadaInvalida, setDiscSolicitadaInvalida] = useState(false);
    const [anexos, setAnexos] = useState([]);
    const [anexosInvalidos, setAnexosInvalidos] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState("");
    const [alert, setAlert] = useState(null);
    const [requisicao, setRequisicao] = useState(null);
    const [msgDisciplinaAnterior, setMsgDisciplinaAnterior] = useState("");

    useEffect(() => setCursoInvalido(false), [curso]);
    useEffect(() => setDiscSolicitadaInvalida(false), [discSolicitada]);
    useEffect(() => setDisciplinasCursadasAnteriorInvalida(false), [disciplinasCursadasAnterior]);
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
       console.log(anexos.length);
       if(anexos.length === 0){setAnexosInvalidos(true)}
        if (!curso) setCursoInvalido(true);
        if (!discSolicitada) setDiscSolicitadaInvalida(true);
        if (!anexos && !anexos.length) setAnexosInvalidos(true);
        if (disciplinasCursadasAnterior.length > 45) {
            setDisciplinasCursadasAnteriorInvalida(true)
            setMsgDisciplinaAnterior("Limite máximo de 45 caracteres para cadastro ")
            
        }
        if(disciplinasCursadasAnterior.trim()===""){
            setDisciplinasCursadasAnteriorInvalida(true)
            setMsgDisciplinaAnterior("Campo disciplina cursada é obrigatório")
            
        }
        return (!curso || !disciplinasCursadasAnterior || !discSolicitada || !anexos.length||disciplinasCursadasAnterior.length>45||disciplinasCursadasAnterior.trim()==="");
    }

    const limparCampos = () => {
        setRequisicao(null);
        setCurso('');
        setDiscSolicitada('');
        setDisciplinasCursadasAnterior('');
        setAnexos([]);


    }

    const fazerRequisicao = async () => {
        if (camposInvalidos()) return;
       
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
            usuario: {
                id
            }
        });
        setShowModal(true);
    }

    const enviarRequisicao = () => {
        setShowModal(false);
        postRequisicao(requisicao)
            .then((e) => {
                if (e.status === 201) {
                    setAlert({
                        mensagem: "Requisição cadastrada com sucesso !",
                        tipo: 'success'
                    })
                } else {
                    setAlert({
                        mensagem: 'ATENÇÃO requisição não cadastrada! ' + e.data.message,
                        tipo: 'danger'
                    })
                }
            });


        limparCampos();
    }

    return (
        <>
            <TituloPagina titulo={'Aproveitamento de Estudos'} />

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
                label={'Disciplina cursada anteriormente'}
                placeholder={'Preencha com o nome da disciplina que você cursou em outra instituição'}
                value={disciplinasCursadasAnterior}
                onChange={({ target }) => setDisciplinasCursadasAnterior(target.value)}
                onError={disciplinasCursadasAnteriorInvalida}
                onErrorMessage={msgDisciplinaAnterior}
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
                <Button variant="primary" className="btn btn-primary m-1" onClick={fazerRequisicao}>
                    Enviar
                </Button>
                <Button variant="danger" className="btn btn-primary m-1" onClick={limparCampos}>
                    Cancelar
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
