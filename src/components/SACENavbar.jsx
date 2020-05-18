import React from 'react';
import { Navbar, Nav, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { NavLink, Link } from "react-router-dom";
import { logout } from '../services/TokenService';
function SACELink({ to, label }) {
    return (
        <NavLink
            to={to}
            style={{
                marginRight: '20px',
                whiteSpace: 'nowrap',
                fontSize: "18px",
                color: "black",
                fontFamily: "verdana",
            }}
            activeStyle={{
                fontWeight: "bold",
                color: "white"
            }}
        >
            {label}
        </NavLink>
    );

}
function retornaLinks(user) {
    if (user.permissao === "ALUNO") {
        return <>
            <SACELink to={'/nova-requisicao'} label={'Criar requisição'} />
            <SACELink to={`/aluno-requisicoes/`} label={'Requisições'} />
            <SACELink to={'/troca-senha'} label={'Alterar senha'} />
        </>
    } else if (user.permissao === "SERVIDOR") {
        return <>
            <SACELink to={'/minhas-requisicoes'} label={'Listar Requisições'} />
            <SACELink to={'/troca-senha'} label={'Alterar senha'} />
            <DropdownButton id="dropdown-basic-button" title="CADASTRAR" >
                <Dropdown.Item><Link to="/cadastrar-curso">Curso</Link></Dropdown.Item>
                <Dropdown.Item ><Link to="/cadastro-servidor">Servidor / Professor</Link></Dropdown.Item>
                <Dropdown.Item ><Link to="/cadastrar-disciplina">Disciplina</Link></Dropdown.Item>
            </DropdownButton>
            <DropdownButton id="dropdown-basic-button" title="LISTAR" style={{}}>
                <Dropdown.Item ><Link to="/lista-alunos">Alunos</Link></Dropdown.Item>
                <Dropdown.Item ><Link to="/lista-professor">Professores</Link></Dropdown.Item>
                <Dropdown.Item ><Link to="/lista-servidor">Servidores</Link></Dropdown.Item>
                <Dropdown.Item ><Link to="/listar-curso">Cursos</Link></Dropdown.Item>
                <Dropdown.Item ><Link to="/lista-disciplina">Disciplinas</Link></Dropdown.Item>
            </DropdownButton>
        </>
    } else {
        return <>
            <SACELink to={'/minhas-requisicoes'} label={'Listar Requisições'} />
            <SACELink to={'/troca-senha'} label={'Alterar senha'} />
        </>
    }
}

export default function SACENavbar({ setUserData, user }) {
    return (
        <Navbar bg="primary" variant="dark">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {
                        retornaLinks(user)
                    }
                </Nav>
            </Navbar.Collapse>
            Usuário :&nbsp;
                <strong variant="outline-light" >{user.login}</strong>
            <NavLink to={'/'}>
                &nbsp;&nbsp;
                <Button
                    variant="danger" className="btn btn-primary m-1"
                    onClick={() => {
                        logout();
                        setUserData(null);
                    }}
                >
                    Logout
                </Button>
            </NavLink>
        </Navbar>
    );
}
