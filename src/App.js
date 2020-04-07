import React, {  useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Inicio from './pages/Inicio';
import NovaRequisicao from './pages/NovaRequisicao';
import MinhasRequisicoes from './pages/MinhasRequisicoes';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import SACENavbar from './components/SACENavbar';
import CadastroPerfilAluno from './pages/cadastros/CadastroPerfilAluno';
import CadastroCursos from './pages/cadastros/CadastroCursos';
import LoginForm from './components/forms/LoginForm'
import ListaDiscipinas from './Cursos/ListaDisciplina';
import CadastrarDisciplinas from './Cursos/CadastrarDisciplinas';
import CadastroPerfilServidor from './pages/cadastros/CadastroPerfilServidor';
import ListaAlunos from '../src/Cursos/ListaAlunos';
import Parecer from '../src/components/inputs/Parecer';
import RequisicaoAluno from './pages/Aluno/RequisicaoAluno';
import TelaTransicao from './pages/TelaTransicao';
import EditarCadastroAluno from './pages/Aluno/EditarCadastroAluno';

function App() {
  const [userData, setUserData] = useState(null);
  
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props =>userData ? (<Component {...props} /> ): ( <Redirect to={{ pathname: "/login", state: { from: props.location } }} />)}
    />
  );
  return (
    <BrowserRouter>
      {userData && <SACENavbar setUserData={setUserData} user={userData} />}
      <div className="container">
        <Switch>
          <Route exact path="/" component={Inicio} />
          <Route path="/login" render={({ history }) => <LoginForm history={history} setUserData={setUserData} />} />
          <Route path="/cadastro-aluno" component={CadastroPerfilAluno} />
          <Route path="/cadastro-servidor" component={CadastroPerfilServidor} />
          <PrivateRoute exact path="/tela-transicao/" component={TelaTransicao} />
          <PrivateRoute exact path="/aluno-requisicoes/:id" component={RequisicaoAluno} />
          <PrivateRoute exact path="/minhas-requisicoes" component={MinhasRequisicoes} />
          <PrivateRoute exact path="/nova-requisicao" component={()=><NovaRequisicao user={userData}/>} />
          <PrivateRoute exact path="/cadastro-curso" component={CadastroCursos} />
          <PrivateRoute exact path="/lista-disciplina" component={ListaDiscipinas} />
          <PrivateRoute exact path="/cadastrar-disciplina" component={CadastrarDisciplinas} />
          <PrivateRoute exact path="/lista-alunos" component={ListaAlunos} />
          <PrivateRoute exact path="/editar-aluno/:id" component={EditarCadastroAluno} />
          <PrivateRoute exact path="/cadastrar-servidor/:id" component={CadastroPerfilServidor} />
          <PrivateRoute exact path="/parecer/:id" component={Parecer} />
          <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
