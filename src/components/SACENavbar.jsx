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
                {
                    user.tipo === "aluno" ?
                  <>
                    <SACELink to={'/minhas-requisicoes'} label={'Requisições'}/>
                    <SACELink to={'/nova-requisicao'} label={'Nova requisição'}/>
                  </>
                  :
                  <>
                    <SACELink to={'/minhas-requisicoes'} label={'Listar Requisições'}/>
                    <SACELink to={'/nova-requisicao'} label={'Cadastrar requisição'}/>
                    <SACELink to={'/cadastro-curso'} label={'Cadastrar curso'}/>
                    <SACELink to={'/lista-alunos'} label={'Listar Alunos'}/>
                    <SACELink to={'/lista-disciplina'} label={'Listar Disciplinas'}/>
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
