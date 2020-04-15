import React from 'react';
import { Navbar, Nav, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { NavLink ,Link} from "react-router-dom";
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
    console.log(user.permissao);
    if (user.permissao === "ADMIN") {
        return <>
            <SACELink to={'/minhas-requisicoes'} label={'Listar Requisições'} />
            <SACELink to={`/cadastrar-servidor/${user.login}`} label={'Cadastrar servidor'} />
            <SACELink to={'/cadastro-curso'} label={'Cadastrar curso'} />
            <SACELink to={'/lista-alunos'} label={'Listar Alunos'} />
            <SACELink to={'/lista-disciplina'} label={'Listar Disciplinas'} />
            <SACELink to={'/nova-requisicao'} label={'Nova requisição'} />
        </>
    } else if (user.permissao === "ALUNO") {
        return <>
            <SACELink to={'/nova-requisicao'} label={'Nova requisição'} />
            <SACELink to={`/aluno-requisicoes/${user.id}`} label={'Requisições'} />
        </>
    } else if (user.permissao === "SERVIDOR") {
        return <>
            <SACELink to={'/minhas-requisicoes'} label={'Listar Requisições'} />
            <SACELink to={'/lista-disciplina'} label={'Listar Disciplinas'} />
                <DropdownButton id="dropdown-basic-button" title="CADASTRAR" >
                <Dropdown.Item><Link to="/cadastro-curso">Curso</Link></Dropdown.Item>
                <Dropdown.Item ><Link to="/cadastro-servidor">Servidor</Link></Dropdown.Item>
                </DropdownButton>
                <DropdownButton id="dropdown-basic-button" title="LISTAR" style={{}}>
                <Dropdown.Item ><Link to="/lista-alunos">Alunos</Link></Dropdown.Item>
                </DropdownButton>
        </>
    } else {
        return <SACELink to={'/minhas-requisicoes'} label={'Listar Requisições'} />
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
            <NavLink to={'/'}>
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
