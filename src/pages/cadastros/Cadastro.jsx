import React, {useState, useEffect} from 'react';
import TituloPagina from '../../components/TituloPagina';
import { Form, Button } from 'react-bootstrap';
import SACEInput from '../../components/inputs/SACEInput';
import { postCadastroAluno } from '../../services/AlunoService';


export default function Cadastro(){
    const [matricula, setMatricula] = useState(''); 
    const [matriculaInvalida, setMatriculaInvalida] = useState(false); 

    const [tipo] = useState("aluno");

    const[aluno, setAluno] = useState('')
    const[alunoInvalido, setAlunoInvalido] = useState(false)

    const[showModal, setShowModal] = useState('')

    const [dataIngresso, setDataIngresso] = useState(""); 
    const [dataIngressoInvalido, setDataIngressoInvalido] = useState(false); 
    
    const [senha, setSenha] = useState(""); 
    const [senhaInvalida, setSenhaInvalida] = useState(false); 
    
    const [nome, setNome] = useState(""); 
    const [nomeInvalido, setNomeInvalido] = useState(false);

    const [login, setLogin] = useState(""); 
    const [loginInvalido, setLoginInvalido] = useState(false); 
    
    const [confirmaSenha, setConfirmaSenha] = useState(""); 
    const [confirmaSenhaInvalida, setConfirmaSernhaInvalida] = useState(false); 
    const [alert, setAlert] = useState(null);

    const [email, setEmail] = useState(""); 
    const [emailInvalido, setEmailInvalido] = useState(false); 

    const [permissoes, setPermissoes] = useState(""); 

    useEffect(() => setAlunoInvalido(false), [aluno]);
    useEffect(() => setDataIngressoInvalido(false), [dataIngresso]);
    useEffect(() => setEmailInvalido(false), [email]);
    useEffect(() => setLoginInvalido(false), [login]);


    const camposInvalidos = () => {
        debugger;

        if(!nome) setAlunoInvalido(true);
        if(!email) setEmailInvalido(true);
        if(!matricula) setMatriculaInvalida(true);
        if(!senha && !senha.length) setSenhaInvalida(true);
        if(!dataIngresso) setDataIngressoInvalido(true); 
        if(!nome) setNomeInvalido(true);
        if(!confirmaSenha) setConfirmaSernhaInvalida(true);

        return ( !nome || !email || !matricula || !senha ||
            !dataIngresso || !nome || !confirmaSenha );
    }

    const limparCampos = () => {
        setAluno('');
        setMatricula('');
        setEmail('');
        setSenha('');
        setDataIngresso(''); 
        setConfirmaSenha('');
        setPermissoes('') 
    }
   
    const enviarCadastro = async (e) => {
        
        if(camposInvalidos()) return;
       
        const cadastroToPost = {
            nome,
            email,
            tipo: "aluno",
            senha,
            dataIngresso, 
            confirmaSenha,
            login            
        };

        console.log('cadastro', cadastroToPost);

        if(postCadastroAluno(cadastroToPost)){
            setAlert({
                mensagem: 'Cadatro enviado com sucesso!',
                tipo: 'success'
            });
        } else {
            setAlert({
                mensagem: 'ATENÇÃO! Você não pode inserir um novo cadastro com itens faltando!',
                tipo: 'danger'
            });
        }

        setTimeout(() => setAlert(null), 3000);
        limparCampos();
    }

    

    return(
        <Form.Group className="col-md-6 container">
            <TituloPagina titulo="Cadastro de Alunos"/>
            <SACEInput
                label={'Nome'}
                placeholder={'Informe o seu nome. '}
                onChange={({target}) => setNome(target.value)}
                value={nome}
                setNome={setNome}
                onError={nomeInvalido}
                onErrorMessage={'Você não inseriu o seu nome corretamente!'}
            />
            <SACEInput
                label={'Email'}
                placeholder={'Informe o seu email. '}
                onChange={({target}) => setEmail(target.value)}
                value={email}
                setEmail={setEmail}
                onError={emailInvalido}
                onErrorMessage={'Você não inseriu o seu email corretamente!'}
            />
            <SACEInput
                label={'Matricula'}
                placeholder={'Informe a sua matrícula. '}
                onChange={({target}) => setMatricula(target.value)}
                value={matricula}
                setMatricula={setMatricula}
                onError={matriculaInvalida}
                onErrorMessage={'Você não inseriu a sua matrícula corretamente!'}
            />

            <SACEInput 
                label={'Data de Ingresso'}
                placeholder={'Informe a data de Ingresso. '}
                onChange={({target}) => setDataIngresso(target.value)}
                value={dataIngresso}
                setDataIngresso={setDataIngresso}
                onError={dataIngressoInvalido}
                onErrorMessage={'Você não inseriu uma data válida!'}
                tipo={"date"}
            />
            <SACEInput 
                label={'Login'}
                placeholder={'Informe um login. '}
                onChange={({target}) => setLogin(target.value)}
                value={login}
                setLogin={setLogin}
                onError={loginInvalido}
                onErrorMessage={'Você não inseriu um login válido!'}
            />
            <SACEInput 
                label={'Senha'}
                placeholder={'Informe uma senha. '}
                onChange={({target}) => setSenha(target.value)}
                value={senha}
                setSenha={setSenha}
                onError={senhaInvalida}
                onErrorMessage={'Você inseriu uma senha inválida!'}
                tipo={"password"}
            />
            <SACEInput 
                label={'Confirme a sua senha'}
                placeholder={'Informe a mesma senha que a anterior. '}
                onChange={({target}) => setConfirmaSenha(target.value)}
                value={confirmaSenha}
                setConfirmaSenha={setConfirmaSenha}
                onError={confirmaSenhaInvalida}
                onErrorMessage={'As senhas não conferem! Favor inserir a mesma senha!'}
                tipo={"password"}
            />

            <div className="row container" style={{position: 'relative', left:'32%'}}>
            <Button onClick={(e)=> enviarCadastro(e)} className="btn btn-dark" style={{border: "5px solid white"}}>Enviar</Button>
            <Button className="btn btn-danger" style={{border: "5px solid white"}}>Limpar</Button>
           </div> 
        </Form.Group>
    );
}