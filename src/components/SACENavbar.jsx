import React from 'react';
import { Navbar, Nav, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { logout } from '../services/TokenService';

function SACELink({ to, label }) {
    return (
        <Link 
            to={to} 
            style={{ 
                marginRight:'10px',
                whiteSpace:'nowrap',
            }}
        >
            {label}
        </Link>
    );
    
} 

export default function SACENavbar({ setUserData, user }) {
    
    return (
        
        <Navbar bg="light" expand="lg">            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {console.log(user)}
                {
                    user.tipo === "aluno" ?
                  <>
                    <SACELink to={'/aluno-requisicoes'} label={'Requisições'}/>
                    <SACELink to={'/nova-requisicao'} label={'Nova requisição'}/>
                  </>
                  :
                  user.tipo === "servidor" ?
                  <>
                    <SACELink to={'/minhas-requisicoes'} label={'Listar Requisições'}/>
                    <SACELink to={'/cadastro-curso'} label={'Cadastrar curso'}/>
                    <SACELink to={'/lista-alunos'} label={'Listar Alunos'}/>
                    <SACELink to={'/lista-disciplina'} label={'Listar Disciplinas'}/>
                  </>
                :  <>
                <SACELink to={'/minhas-requisicoes'} label={'Listar Requisições'}/>
                </>
                }
                    </Nav>
            </Navbar.Collapse>
            <Link to={'/'}>
                <Button 
                    onClick={() => {
                        logout();
                        setUserData(null);
                    }}


                    
                >
                    Logout
                </Button>
            </Link>
        </Navbar>
    );
}
