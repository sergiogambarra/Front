const retornaPerfil = (usuario) =>{
      switch (usuario.permissao) {
      case 'ALUNO':
          return {
              
                  nome: usuario.nome,
                  matricula: usuario.matricula,
                  email: usuario.email,
                  dataIngresso: usuario.dataIngresso,
                  tipo:"ALUNO"
          }
      case 'SERVIDOR':
          return {
                  nome: usuario.nome,
                  cargo: usuario.cargo,
                  siape: usuario.siape,
                  tipo:"SERVIDOR"
            }
            
            case 'PROFESSOR':
                  return {
                  nome: usuario.nome,
                  siape: usuario.siape,
                  cordenador: usuario.isCordenador,
                  tipo:"PROFESSOR"
          }
      default:
          return null;
      }
  }
  export { retornaPerfil }