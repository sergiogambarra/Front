import axios from 'axios';
import { baseURL } from '../enviroment';


const postLogin = async (login) => {
    if(!login) return;
        
    const URL = `${baseURL}/usuarios/login`;

    try {
        const response = await axios.post(URL, login);
        
        return (response.data);
    } catch (error) {
        console.log('LoginService/postLogin::', error);
    }
}

export{postLogin};
