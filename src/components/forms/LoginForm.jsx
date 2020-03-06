import React, {useState, useEffect} from 'react';
import { Form, Button } from 'react-bootstrap';
import SACEInput from '../../components/inputs/SACEInput';
import { postLogin } from '../../services/LoginService';
import { Link } from "react-router-dom";
import { login } from '../../services/TokenService';

export default function LoginForm ({ history, setUserData }){
    const [usuario, setUsuario] = useState('');
    const [usuarioInvalido, setUsuarioInvalido] = useState(false);

    const [senha, setSenha] = useState(""); 
    const [senhaInvalida, setSenhaInvalida] = useState(false);
    
    useEffect(() => setUsuarioInvalido(false), [usuario]);
    useEffect(() => setSenhaInvalida(false), [senha]);

    const limparCampos = () => {
        setUsuario('');
        setSenha('');       
    }
   
    const enviarLogin = () => {
  console.log()
        postLogin({ usuario, senha })
            .then((response) => {
                if( typeof response ==="undefined"){
alert("fddf")
                }
                console.log(response,"cdc")
                login(response.token);
                setUserData(response);
               
            })
            .then(() => history.push('/minhas-requisicoes'))
            .catch(error => console.log(error))
            
    }
    
    return(
        <Form.Group className="container col-md-6" style={{position:"relative", top:"60px"}}>
            <SACEInput
                label={'Login'}
                placeholder={'Informe o seu Login. '}
                onChange={({ target }) => setUsuario(target.value)}
                value={usuario}
                onError={usuarioInvalido}
                onErrorMessage={'Você não inseriu o seu login corretamente!'}
            />
            <SACEInput
                label={'Senha'}
                placeholder={'Informe o sua senha. '}
                onChange={({ target }) => setSenha(target.value)}
                value={senha}
                onError={senhaInvalida}
                onErrorMessage={'Você não inseriu o sua senha corretamente!'}
                tipo="password"
            />
            <div className="row">
                <Link to="/cadastro-aluno" >Aluno, não é Cadstrado?</Link>
                <Link to="#" style={{position:'relative', left:'45%'}}>Esqueceu a sua senha?</Link>
            </div>
            <Form.Group 
                className="d-flex justify-content-end" 
                style={{position:'relative', top:'50px', right:'30%'}}
            >
                <Button variant="primary" className="btn btn-primary m-1" onClick={enviarLogin}>
                    Enviar
                </Button>
                <Button variant="link" className="btn btn-link m-1" onClick={limparCampos}>
                    Cancelar
                </Button>
            </Form.Group>
        </Form.Group>
    );
}