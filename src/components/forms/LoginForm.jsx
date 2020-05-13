import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import SACEInput from '../../components/inputs/SACEInput';
import { post } from '../../services/ServicoCrud';
import { Link } from "react-router-dom";
import { login } from '../../services/TokenService';

export default function LoginForm({ history, setUserData }) {
    const [userName, setUserName] = useState('');
    const [usuarioInvalido, setUsuarioInvalido] = useState(false);

    const [password, setPassword] = useState("");
    const [senhaInvalida, setSenhaInvalida] = useState(false);

    useEffect(() => setUsuarioInvalido(false), [userName]);
    useEffect(() => setSenhaInvalida(false), [password]);

    const limparCampos = () => {
        setUserName('');
        setPassword('');
        setSenhaInvalida("");
        setUsuarioInvalido("");
    }

    const enviarLogin = () => {
        post("login/",{ userName, password })
            .then((response) => {
                console.log(response)
             if(response.status === 200){
                login(response.data);
                setUserData(response.data);
                history.push('/tela-transicao');
             }else{
                setUsuarioInvalido(true)
                setSenhaInvalida(true)
                return;
             }
            })
    }

    return (
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
                <Link style={{ position: 'relative', left: '20%' }}>Recuperar Login e/ou Senha</Link>
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
    );
}