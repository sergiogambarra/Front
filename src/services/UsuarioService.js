import {retornaPerfil} from '../auxiliares/retornaPerfil';
import { post } from './ServicoCrud';
import { baseURL } from '../enviroment';
import axios from 'axios';


const postCadastroUsuario = async (usuario) => {
    if (!usuario) return;
    return  post("usuarios/alunos/",{
        password: usuario.password,
        userName: usuario.userName,
        permissao:usuario.permissao,
        perfil :retornaPerfil(usuario)
    });

}

const postCadastroUsuarioServidor = async (usuario) => {
    if (!usuario) return;
    console.log(usuario);
    
    return  post("usuarios/servidor/",{
        password: usuario.password,
        userName: usuario.userName,
        permissao:usuario.permissao,
        perfil :retornaPerfil(usuario)
    });

}
const getPesquisaLogin = async (end, ) => {
    try {
        const entidade = await axios.get(`${baseURL}/${end}`);
        return entidade.data;
    } catch (error) {
        console.log(`${end.toUpperCase()}Service/get${end}:`, error);
    }
}

export  { getPesquisaLogin, postCadastroUsuario,postCadastroUsuarioServidor };

