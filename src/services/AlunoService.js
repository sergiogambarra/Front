import axios from 'axios';
import { baseURL } from '../enviroment';

const postCadastroAluno = async (aluno) => {
    
    debugger; 
    if(!aluno) return;

    const URL = `${baseURL}/usuarios/aluno/`;
    //tipo matricula dataIngresso senha nome login novaSenha email permissoes permissoes
    const alunoToPost = {
        tipo:aluno.tipo,
        nome: aluno.nome,
        senha: aluno.senha,
        login: aluno.login,
        novaSenha:aluno.senha,
        email:aluno.email,
        permissoes: aluno.permissoes, 
        id: aluno.id,
    };

    try {
        const alunoCriado = await axios.post(URL, alunoToPost);
        
        return alunoCriado;
    } catch (error) {
        console.log('AlunoService/postAluno::', error);
    }
}

export { postCadastroAluno };