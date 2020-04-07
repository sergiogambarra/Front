import axios from 'axios';
import { baseURL } from '../enviroment';
import {retornaPerfil} from '../auxiliares/retornaPerfil';

const postCadastroUsuario = async (usuario) => {
    if (!usuario) return;
    console.log(retornaPerfil(usuario));
    try {
        const usuarioCriado = await axios.post(`${baseURL}/usuarios/`, 
        {
            password: usuario.password,
            userName: usuario.userName,
            permissao:usuario.permissao,
            perfil :retornaPerfil(usuario)
        });
        return usuarioCriado;
    } catch (error) {
        console.log('usuarioService/postusuario::', error);
    }
}
export  { postCadastroUsuario };

