import {retornaPerfil} from '../auxiliares/retornaPerfil';
import { post } from './ServicoCrud';

const postCadastroUsuario = async (usuario) => {
    if (!usuario) return;
    return  post("usuarios/alunos/",{
        password: usuario.password,
        userName: usuario.userName,
        permissao:usuario.permissao,
        perfil :retornaPerfil(usuario)
    });

}
export  { postCadastroUsuario };

