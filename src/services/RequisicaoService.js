import { post, get } from '../services/ServicoCrud';

const postRequisicao =  (requisicao) => {
    return post("/requisicoes/aproveitamento/",requisicao);
}

const getAproveitamentos = async () => {
    const c = get("/requisicoes/aproveitamentos/");
    console.log(c);
}

const getCertificacoes = async () => {
   const c = get("/requisicoes/certificacoes/");
   console.log(c);
}

export { 
    postRequisicao,
    getAproveitamentos,
    getCertificacoes,
};