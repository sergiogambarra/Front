import {post} from './ServicoCrud';
const postLogin = async (login) => {
    if(!login) return;
     return  post("login/",login);
}
export{postLogin};