import React from 'react';
import { Navbar, Nav, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { logout } from '../services/TokenService';

function SACELink({ to, label }) {
    return (
        <Link 
            to={to} 
            style={{ 
                marginRight:'20px',
                whiteSpace:'nowrap',
                fontSize:"18px",
                color:"black",
                fontFamily:"verdana",
                
            
            }}
        >
            {label}
        </Link>
    );
    
} 

export default function SACENavbar({ setUserData, user }) {
    
    return (
        
        <Navbar bg="primary" variant="dark">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                {
                    user.tipo === "aluno" ?
                  <>
                    <SACELink to={'/nova-requisicao'} label={'Nova requisição'}/>
                    <SACELink to={`/aluno-requisicoes/${user.nome}`} label={'Requisições'}/>
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
