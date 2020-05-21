
import { post, get } from '../services/ServicoCrud';

const postRequisicao = async (requisicao) => {
    return await post("requisicoes/", requisicao).then(e=> e).catch(error => error);
}

const getCertificacoes = async (user,page) => {
    if(user.permissao === "ALUNO"){
        return await get(`requisicoes/certificacao/alunos/${user.id}?page=${page}&size=6`);
    }
    if(user.perfil.coordenador === true){
        return await get(`requisicoes/certificacoes?page=${page}&size=6`);       
    }else
    if (user.permissao === "PROFESSOR") {
        
        return await get("requisicoes/professor/"+user.id+"?tipo=certificacao");
    } else  {
        return await get(`requisicoes/certificacoes?page=${page}&size=6`);
    }
}

const getAproveitamentos = async (user,page) => {
    if(user.permissao === "ALUNO"){
        return await get(`requisicoes/aproveitamento/alunos/${user.id}?page=${page}&size=6`);
    }
    if(user.perfil.coordenador === true){
        return await get(`requisicoes/aproveitamentos?page=${page}&size=6`);       
    }else
    if (user.permissao === "PROFESSOR") {
        return await get("requisicoes/professor/"+user.id+"?tipo=aproveitamento");
    } else  {
       return await get(`requisicoes/aproveitamentos?page=${page}&size=6`);
        
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