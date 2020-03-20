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

export default function SACENavbar({ setUserData }) {
    return (
        <Navbar bg="light" expand="lg">
            <Link to={'/'}>
                <Navbar.Brand>{'Início'}</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <SACELink to={'/minhas-requisicoes'} label={'Minhas requisições'}/>
                    <SACELink to={'/nova-requisicao'} label={'Nova requisição'}/>
                    <SACELink to={'/cadastro-curso'} label={'Cadastrar curso'}/>
                    <SACELink to={'/cadastrar-disciplina'} label={'Cadastrar disciplinas'}/>
                    <SACELink to={'/lista-alunos'} label={'Lista Alunos'}/>
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
