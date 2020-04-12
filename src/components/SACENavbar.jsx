import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
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
function retornaLinks(user){
    console.log(user.permissao);
    if(user.permissao === "ADMIN"){
       return  <>
                <SACELink to={'/minhas-requisicoes'} label={'Listar Requisições'} />
                <SACELink to={`/cadastrar-servidor/${user.login}`} label={'Cadastrar servidor'} />
                <SACELink to={'/cadastro-curso'} label={'Cadastrar curso'} />
                <SACELink to={'/lista-alunos'} label={'Listar Alunos'} />
                <SACELink to={'/lista-disciplina'} label={'Listar Disciplinas'} />
                <SACELink to={'/nova-requisicao'} label={'Nova requisição'} />
               </>
    }else if(user.permissao === "ALUNO"){
        return <>
                <SACELink to={'/nova-requisicao'} label={'Nova requisição'} />
                <SACELink to={`/aluno-requisicoes/${user.id}`} label={'Requisições'} />
               </>
    }else if(user.permissao === "SERVIDOR"){
        return <>
                <SACELink to={'/minhas-requisicoes'} label={'Listar Requisições'} />
                <SACELink to={`/cadastrar-servidor/${user.login}`} label={'Cadastrar servidor'} />
                <SACELink to={'/cadastro-curso'} label={'Cadastrar curso'} />
                <SACELink to={'/lista-alunos'} label={'Listar Alunos'} />
                <SACELink to={'/lista-disciplina'} label={'Listar Disciplinas'} />
              </>
    }else{
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
