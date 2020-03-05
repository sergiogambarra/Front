import axios from 'axios';
import { baseURL } from '../enviroment';
import { getToken } from './TokenService';

const getCursos = async () => {
    const URL = `${baseURL}/cursos/`;
    try {        
        const cursos = await axios.get(URL, {
            headers: {
            'X-Requested-With': 'XMLHttpRequest',
            Authorization: `Bearer ${getToken()}`,
            },
            params: {
                token: getToken(),
            }
        });

        return cursos.data;        
    } catch (error) {
        console.log('CursoService/getCursos::', error);
    }
}

const postCurso = async (curso) => {
    const URL = `${baseURL}/cursos`;
        
    try {        
        const cursoCadastrado = await axios.post(URL, curso, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                Authorization: `Bearer ${getToken()}`,
            },
            params: {
                token: getToken(),
            },
        });

        return (cursoCadastrado.status === 201);        
    } catch (error) {
        console.log('CursoService/postCurso::', error);
    }
}

const putCurso = async (id, curso) => {
    const URL = `${baseURL}/cursos/${id}`;
        
    try {        
        const cursoAtualizado = await axios.put(URL, curso, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                Authorization: `Bearer ${getToken()}`,
            },
            params: {
                token: getToken(),
            },
        });

        return (cursoAtualizado);        
    } catch (error) {
        console.log('CursoService/putCurso::', error);
    }
}

const deleteCurso = async (id) => {
    const URL = `${baseURL}/cursos/${id}`;
        
    try {        
        const cursoDeletado = await axios.delete(URL, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                Authorization: `Bearer ${getToken()}`,
            },
            params: {
                token: getToken(),
            },
        });

        return (cursoDeletado);        
    } catch (error) {
        console.log('CursoService/deleteCurso::', error);
    }
}

export { 
    getCursos,
    postCurso,
    putCurso,
    deleteCurso,
};