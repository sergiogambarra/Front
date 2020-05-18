import axios from 'axios';
import { baseURL } from '../enviroment';

const get = async (end) => {
    try {
        const entidade = await axios.get(`${baseURL}/${end}`);
        return entidade.data;
    } catch (error) {
        console.log(`${end.toUpperCase()}Service/get${baseURL}/${end}:`, error);
    }
}
const getEmail = async (end) => {
        return await axios.get(`${baseURL}/${end}`).then((response) => response).catch((error)=> error.response);
}


const getId = async (end, id) => {
    try {
        const entidade = await axios.get(`${baseURL}/${end}${id}`);
        return entidade.data;
    } catch (error) {
        console.log(`${end.toUpperCase()} Service/get ${baseURL}/${end}:`, error);
    }
}

const post = async (end, data) => {
    try {
        const entidade = await axios.post(`${baseURL}/${end}`, data);
        return entidade;
    } catch (error) {
        return error.response;
    }
}

const put = async (end, id, data) => {
      try {
        const entidade = await axios.put(`${baseURL}/${end}/${id}`, data);
        console.log(entidade);
        
        return (entidade);
    } catch (error) {
        console.log(`${end.toUpperCase()}Service/put${baseURL}/${end}/${id}:`, error);
    }
}

const del = async (end, id) => {    
        await axios.delete(`${baseURL}/${end}/${id}`).then((resp) => {
            return resp;
        }).catch((e) => {return e});
}
const delCurso = async (end, id) => {
    try {
        await axios.delete(`${baseURL}/${end}/${id}`).then((resp) => {
            return resp;
        })
    } catch (error) {
        alert("Você não pode apagar curso ele possui disciplina associada a requisição de aluno")
        console.log(`${end.toUpperCase()}Service/delete${baseURL}/${end}/${id}:`, error);
    }
}
const deleteProfessor = async (end, id) => {
    try {
        await axios.delete(`${baseURL}/${end}/${id}`).then((resp) => {
            return resp;
        })
    } catch (error) {
        alert("Não pode apagar cadastro do professor porque tem requisição em andamento sob sua responsabilidade")
        console.log(`${end.toUpperCase()}Service/delete${baseURL}/${end}/${id}:`, error);
    }
}
const delDisciplinaCurso = async (end, id) => {
    try {
        await axios.delete(`${baseURL}/${end}/`).then((resp) => {
            return resp;
        })
    } catch (error) {
        alert("Não pode apagar disciplina devido estar associada a uma requisição em análise")
        console.log(`${end.toUpperCase()}Service/delete${end}:`, error);
    }
}
const getNomeCurso = async (end) => {
    try {
        const entidade = await axios.get(`${baseURL}/${end}`);
        return entidade.data;
    } catch (error) {
        console.log(`${end.toUpperCase()}Service/get${end}:`, error);
    }
}
const getIdDisciplina = async (end, id) => {
    try {
        const entidade = await axios.get(`${baseURL}/${end}`);
        return entidade.data;
    } catch (error) {
        console.log(`${end.toUpperCase()}Service/get${end}:`, error);
    }
}
const putDisciplinas = async (end, data) => {
    try {
      const entidade = await axios.put(`${baseURL}/${end}/`,data);
      
      return (entidade);
  } catch (error) {
      console.log(`${end.toUpperCase()}Service/put${baseURL}/${end}/${data}/:`, error);
  }
}



export {
    get,
    getId,
    post,
    put,
    del,
    getEmail,
    delDisciplinaCurso,
    getNomeCurso,
    getIdDisciplina,
    putDisciplinas  ,
    deleteProfessor,delCurso
};