import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Inicio from './pages/Inicio';
import NovaRequisicao from './pages/NovaRequisicao';
import MinhasRequisicoes from './pages/MinhasRequisicoes';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import SACENavbar from './components/SACENavbar';
import Cadastro from './pages/cadastros/Cadastro';
import ListaCursos from './Cursos/ListaCursos';
import CadastroCurso from './Cursos/CursoView';
import CadastroDisciplina from './Disciplinas/DisciplinaView';
import LoginForm from './components/forms/LoginForm'
import ListaDiscipinas from './Cursos/ListaDisciplina';

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => console.log(`userData`, userData));

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        userData ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        )
      }
    />
  );
    
  return (
    <BrowserRouter>
        { userData && <SACENavbar setUserData={setUserData} /> }
        <div className="container">
          <Switch>
            <Route exact path="/" component={Inicio} />
            <Route path="/login" render={({ history }) => <LoginForm history={history} setUserData={setUserData} />}/>
              <PrivateRoute path="/listar-cursos" component={ListaCursos} />
              <PrivateRoute path="/nova-requisicao" component={NovaRequisicao} />           
              <PrivateRoute path="/minhas-requisicoes" component={MinhasRequisicoes} />   
              <PrivateRoute path="/cadastro-aluno" component={Cadastro} />           
              <PrivateRoute path="/cadastro-curso" component={CadastroCurso} />           
              <PrivateRoute path="/cadastro-disciplina" component={CadastroDisciplina} />          
              <PrivateRoute path="/lista-disciplina" component={ListaDiscipinas} />           
            <Route path="*" component={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;
