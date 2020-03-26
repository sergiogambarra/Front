import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Inicio from './pages/Inicio';
import NovaRequisicao from './pages/NovaRequisicao';
import MinhasRequisicoes from './pages/MinhasRequisicoes';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import SACENavbar from './components/SACENavbar';
import CadastroAluno from '../src/pages/cadastros/CadastroAluno';

import CadastroCursos from './pages/cadastros/CadastroCursos';
import LoginForm from './components/forms/LoginForm'
import ListaDiscipinas from './Cursos/ListaDisciplina';
import CadastrarDisciplinas from './Cursos/CadastrarDisciplinas';
import CadastroServidor from './pages/cadastros/CadastroServidor';
import ListaAlunos from '../src/Cursos/ListaAlunos';

function App() {
  const [userData, setUserData] = useState(null);
  useEffect(() => console.log(`userData`, userData));
  
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>userData ? (<Component {...props} /> ): ( <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
          )
      }
    />
  );
  return (
    <BrowserRouter>
      {userData && <SACENavbar setUserData={setUserData} />}
      <div className="container">
        <Switch>
          <Route exact path="/" component={Inicio} />
          <Route path="/login" render={({ history }) => <LoginForm history={history} setUserData={setUserData} />} />
          <Route path="/cadastro-aluno" component={CadastroAluno} />
          <Route path="/cadastro-servidor" component={CadastroServidor} />
          <PrivateRoute exact path="/minhas-requisicoes" component={MinhasRequisicoes} />
          <PrivateRoute exact path="/nova-requisicao" component={NovaRequisicao} />
          <PrivateRoute exact path="/cadastro-curso" component={CadastroCursos} />
          <PrivateRoute exact path="/lista-disciplina" component={ListaDiscipinas} />
          <PrivateRoute exact path="/cadastrar-disciplina" component={CadastrarDisciplinas} />
          <PrivateRoute exact path="/lista-alunos" component={ListaAlunos} />
          <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
