import axios from 'axios';
import { baseURL } from '../enviroment';

const postLogin = async (login) => {
    if(!login) return;
    try {
        const response = await axios.post(`${baseURL}/login/`, login);    
         return (response.data);
    } catch (error) {
        console.log('LoginService/postLogin::', error);
    }
}

export{postLogin};
