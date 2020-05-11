
import { post, get } from '../services/ServicoCrud';

const postRequisicao = async (requisicao) => {
    return await post("requisicoes/", requisicao).then(e=> e).catch(error => error);
}

const getCertificacoes = async (user) => {
    if(user.user.perfil.coordenador === true){
        return await get("requisicoes/certificacoes/");
    }else
    if (user.user.permissao === "PROFESSOR") {
        return await get("requisicoes/professor/"+user.user.id+"?tipo=certificacao");
    } else  {
        return await get("requisicoes/certificacoes/");
    }
}

const getAproveitamentos = async (user) => {
    if(user.permissao === "ALUNO"){
        return await get(`requisicoes/alunos/${user.id}`);
    }
    if(user.perfil.coordenador === true){
        return await get("requisicoes/aproveitamentos/");
    }else
    if (user.permissao === "PROFESSOR") {
        return await get("requisicoes/professor/"+user.id+"?tipo=aproveitamento");
    } else  {
        return await get("requisicoes/aproveitamentos/");
    }
}

const getRequisicaoId = async (id) => {
    return await get(`requisicoes/${id}`);
}

export {
    postRequisicao,
    getAproveitamentos,
    getCertificacoes,
    getRequisicaoId

};