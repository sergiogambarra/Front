import axios from 'axios';
import { baseURL } from '../enviroment';
import { getToken } from './TokenService';






 const config = {
    headers: { Authorization: `${getToken()}` }
  }

const get = async (end) => {
    try {        
        const entidade = await axios.get(`${baseURL}/${end}/`, config);
        return entidade.data;        
    } catch (error) {
        console.log(`${end.toUpperCase()}Service/get${ end }:`, error);
    }
}

const getId = async (end,id) => {
    try {        
        const entidade = await axios.get(`${baseURL}/${end}/${id}`, config);
        return entidade.data;        
    } catch (error) {
        console.log(`${end.toUpperCase()}Service/get${ end }:`, error);
    }
}

const post = async (end, data) => {    
    try {        
        const entidade = await axios.post(`${baseURL}/${end}/`, data, config);
        return entidade;        
    } catch (error) {
        console.log(`${end.toUpperCase()}Service/post${ end }:`, error);
    }
}

const put = async (end,id, data) => {
    try {        
        const entidade = await axios.put(`${baseURL}/${end}/${id}`, data, config);
        return (entidade);        
    } catch (error) {
        console.log(`${end.toUpperCase()}Service/put${ end }:`, error);
    }
}

const del = async (end,id) => {        
    try {        
        await axios.delete(`${baseURL}/${end}/${id}`, config).then((resp)=>{
            return resp;
        })
    } catch (error) {
        console.log(`${end.toUpperCase()}Service/delete${ end }:`, error);
    }
}

export { 
    get,
    getId,
    post,
    put,
    del
};