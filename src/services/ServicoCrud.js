import axios from 'axios';
import { baseURL } from '../enviroment';

const get = async (end) => {
    try {        
        const entidade = await axios.get(`${baseURL}/${end}`);
      
        
        return entidade.data;        
    } catch (error) {
        console.log(`${end.toUpperCase()}Service/get${ end }:`, error);
    }
}

const getId = async (end,id) => {
    try {        
        const entidade = await axios.get(`${baseURL}/${end}${id}`);
        return entidade.data;        
    } catch (error) {
        console.log(`${end.toUpperCase()}Service/get${ end }:`, error);
    }
}

const post = async (end, data) => {        
    try {        
        const entidade = await axios.post(`${baseURL}/${end}`, data);
        return entidade;        
    } catch (error) {
        console.log(`${end.toUpperCase()}Service/post${ end }:`, error);
    }
}

const put = async (end,id, data) => {
    console.log(data);
    
    try {        
        const entidade = await axios.put(`${baseURL}/${end}/${id}`, data);
        return (entidade);        
    } catch (error) {
        console.log(`${end.toUpperCase()}Service/put${ end }:`, error);
    }
}

const del = async (end,id) => {        
    try {        
        await axios.delete(`${baseURL}/${end}/${id}`).then((resp)=>{
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