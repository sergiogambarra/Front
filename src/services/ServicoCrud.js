import axios from 'axios';
import { baseURL } from '../enviroment';

const get = async (end) => {
    try {
        const entidade = await axios.get(`${baseURL}/${end}`);
        return entidade.data;
    } catch (error) {
        console.log(`${end.toUpperCase()}Service/get${end}:`, error);
    }
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
        console.log(`${end.toUpperCase()}Service/post${end}:`, error);
    }
}

const put = async (end, id, data) => {
      try {
        const entidade = await axios.put(`${baseURL}/${end}/${id}`, data);
        
        return (entidade);
    } catch (error) {
        console.log(`${end.toUpperCase()}Service/put${baseURL}/${end}/${id}:`, error);
    }
}

const del = async (end, id) => {
    try {
        await axios.delete(`${baseURL}/${end}/${id}`).then((resp) => {
            return resp;
        })
    } catch (error) {
        console.log(`${end.toUpperCase()}Service/delete${baseURL}/${end}/${id}:`, error);
    }
}
const delDisciplinaCurso = async (end, id) => {
    try {
        await axios.delete(`${baseURL}/${end}/`).then((resp) => {
            return resp;
        })
    } catch (error) {
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
    console.log(end);
    console.log(data);
    
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
    delDisciplinaCurso,
    getNomeCurso,
    getIdDisciplina,
    putDisciplinas  
};