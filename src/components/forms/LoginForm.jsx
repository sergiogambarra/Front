import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import SACEInput from '../../components/inputs/SACEInput';
import { post, getEmail } from '../../services/ServicoCrud';
import { Link } from "react-router-dom";
import { login } from '../../services/TokenService';
import { Loading } from '../../auxiliares/Load';

export default function LoginForm({ history, setUserData }) {
    const [userName, setUserName] = useState('');
    const [alertShow, setAlertShow] = useState(false);
    const [email, setEmail] = useState('');
    const [usuarioInvalido, setUsuarioInvalido] = useState(false);
    const [modalShow, setModal] = useState(false);

    const [password, setPassword] = useState("");
    const [senhaInvalida, setSenhaInvalida] = useState(false);
    const [emailInvalido, setEmailInvalido] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => setUsuarioInvalido(false), [userName]);
    useEffect(() => setSenhaInvalida(false), [password]);


    const limparCampos = () => {
        setUserName('');
        setPassword('');
        setSenhaInvalida("");
        setUsuarioInvalido("");
    }


    const enviarEmail = async () => {
        setIsLoading(true)
        await getEmail("email/?email=" + email).then((response) => {
            if (response.status === 200) {
                setAlertShow(true)
                setEmailInvalido(false)
                setIsLoading(false)
            } else {
                setIsLoading(false)
                setEmailInvalido(true)
            }
            console.log(response.status);
        })
    }

    const enviarLogin = () => {
        post("login/", { userName, password })
            .then((response) => {
                if (response.status === 200) {
                    login(response.data);
                    setUserData(response.data);
                    if (response.data.alterouSenha) {
                        history.push('/troca-senha')
                    } else {
                        history.push('/tela-transicao');
                    }
                } else {
                    setUsuarioInvalido(true)
                    setSenhaInvalida(true)
                    return;
                }
            })
    }

    return (<>
        <Form.Group className="container col-md-6" style={{ position: "relative", top: "60px" }}>
            <SACEInput
                autoFocus
                label={'Login'}
                placeholder={'Informe o seu Login. '}
                onChange={({ target }) => setUserName(target.value)}
                value={userName}
                onError={usuarioInvalido}
                onErrorMessage={'Você não inseriu o seu login corretamente!'}
            />
            <SACEInput
                label={'Senha'}
                placeholder={'Informe o sua senha. '}
                onChange={({ target }) => setPassword(target.value)}
                value={password}
                onError={senhaInvalida}
                onErrorMessage={'Você não inseriu o sua senha corretamente!'}
                type="password"
            />
            <div className="row">
                <Link to="/cadastro-aluno" style={{ position: 'relative', left: '5%' }}>Aluno, clique aqui para se cadastrar</Link>
                <Link to="" style={{ position: 'relative', left: '20%' }} onClick={(e) => {
                    e.preventDefault();
                    setModal(true)
                }}>Recuperar Login e/ou Senha</Link>
            </div>

            <Form.Group
                className="d-flex justify-content-end"
                style={{ position: 'relative', top: '50px', right: '30%' }}
            >
                <Button variant="primary" className="btn btn-primary m-1" onClick={enviarLogin}>
                    Enviar
                </Button>
                <Button variant="btn btn-danger" className="btn btn-primary m-1" onClick={limparCampos}>
                    Limpar
                </Button>
            </Form.Group>

        </Form.Group>
        <Modal show={modalShow} onHide={() => setModal(false) + setEmailInvalido(false)+setAlertShow(false)+setEmail("")} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title > Recuperação de dados</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    isLoading ?
                        <Loading />
                        :
                        ""
                }
                <Alert show={alertShow} variant={"success"}>Email enviado com sucesso!<br />aguarde um instante e verifique no seu email</Alert>
               {isLoading ===false?<SACEInput
                    label={'Digite email que está cadastrado no sistema.'}
                    autoFocus
                    onChange={({ target }) => setEmail(target.value)}
                    value={email}
                    onError={emailInvalido}
                    onErrorMessage={'Email não cadastrado no sistema!'}
                />:isLoading}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => enviarEmail()} className="btn btn-primary m-1" >Salvar</Button>
            </Modal.Footer>
        </Modal>
    </>
    );
}