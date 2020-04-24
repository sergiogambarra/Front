
import { post, get } from '../services/ServicoCrud';

const postRequisicao = async (requisicao) => {
    return await post("requisicoes/", requisicao);
}

const getCertificacoes = async (user) => {
    if(user.user.perfil.cordenador === true){
        return await get("requisicoes/certificacoes/");
    }else
    if (user.user.permissao === "PROFESSOR") {
        return await get("requisicoes/professor/"+user.user.id+"?tipo=certificacao");
    } else  {
        return await get("requisicoes/certificacoes/");
    }
}

const getAproveitamentos = async (user) => {
    if(user.perfil.cordenador === true){
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