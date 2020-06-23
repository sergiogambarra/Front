import React, { useState, useEffect } from 'react';
import { Form, Alert } from 'react-bootstrap';
import TituloPagina from '../components/TituloPagina';
import CertificacaoConhecimentosForm from '../components/forms/CertificacaoConhecimentosForm';
import AproveitamentoEstudosForm from '../components/forms/AproveitamentoEstudosForm';
import { get } from '../services/ServicoCrud';

export default function NovaRequisicao({ user }) {
    const [tipoRequisicao, setTipoRequisicao] = useState('');
    const [verificaSistema, setVerificaSistema] = useState(false);

    useEffect(() => {
        get("configuracao/valida/").then(data => setVerificaSistema(data))
    }, [verificaSistema])

    return (
        verificaSistema ?
            <>
                <TituloPagina titulo={'Criar Requisição'} />
                <Form.Group className="mx-auto col-6 mb-4 mt-3">
                    <Form.Label className="mb-1">
                        {'Selecione o tipo'}
                    </Form.Label>
                    <Form.Control
                        as="select"
                        onChange={({ target }) => setTipoRequisicao(target.value)}
                    >
                        <option value=''>...</option>
                        <option value={'APROVEITAMENTO'}>Aproveitamento de Estudos</option>
                        <option value={'CERTIFICACAO'}>Certificação de Conhecimentos</option>
                    </Form.Control>
                </Form.Group>
                {tipoRequisicao &&
                    <Form className="col-10 bg-light mx-auto rounded p-4">
                        {tipoRequisicao === 'CERTIFICACAO' ? <CertificacaoConhecimentosForm user={user} /> : <AproveitamentoEstudosForm user={user} />}
                    </Form>
                }
            </>
            :
            <>
                <br /><br />
                <Alert variant="danger">
                    <Alert.Heading>Não é possível criar uma requisição</Alert.Heading>
                    <p>
                  Devido ao sistema estar fechado para receber novas requisições (aguarde o próximo edital).
        </p>
                </Alert>
            </>
    );
}