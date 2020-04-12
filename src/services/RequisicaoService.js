
import { post, get } from '../services/ServicoCrud';

const postRequisicao = async (requisicao) => {
    return await post("requisicoes/",requisicao);
}

const getAproveitamentos = async () => {
   return  await get("requisicoes/aproveitamentos/");
}

const getRequisicaoId = async (id) => {
    return  await get(`requisicoes/${id}`);
 }

const getCertificacoes = async () => {
   return await get("requisicoes/certificacoes/");
}

export { 
    postRequisicao,
    getAproveitamentos,
    getCertificacoes,
    getRequisicaoId

};