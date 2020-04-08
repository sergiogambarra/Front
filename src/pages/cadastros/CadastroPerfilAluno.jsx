import React, { Component } from 'react';
import SACEInput from '../../components/inputs/SACEInput';
import { Button, Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";
import TituloPagina from '../../components/TituloPagina';
import { Form, Modal } from 'react-bootstrap';
import { postCadastroUsuario } from '../../services/AlunoService';

class CadastroPerfilAluno extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            userNameInvalido: false,
            password: "",
            passwordInvalido: false,
            nome: "",
            nomeInvalido:false,
            email: "",
            emailInvalido: false,
            matricula: "",
            matriculaInvalida: false,
            dataIngresso: "",
            dataIngressoInvalido: false,
            verificaSenha:"",
            verificaSenhaInvalido:false,
            modalShow: false,
            alert:false,
            msgSenhaNaoConfere:false
        }
    }
    limpar() {
        this.setState({
            userName: "",
            password: "",
            nome: "",
            email: "",
            matricula: "",
            dataIngresso: "",
            userNameInvalido: "",
            passwordInvalido: "",
            verificaSenha: "",
            nomeInvalido:false,
            emailInvalido: false,
            matriculaInvalida: false,
            dataIngressoInvalido: false,
            verificaSenhaInvalido:false,
        })

    }

verifica(){

    if(this.state.nome===""?this.setState({nomeInvalido:true}):this.setState({nomeInvalido:false})){}
    if(this.state.email===""?this.setState({emailInvalido:true}):this.setState({emailInvalido:false})){}
    if(this.state.matricula===""?this.setState({matriculaInvalida:true}):this.setState({matriculaInvalida:false})){}
    if(this.state.dataIngresso===""?this.setState({dataIngressoInvalido:true}):this.setState({dataIngressoInvalido:false})){}
    if(this.state.userName===""?this.setState({userNameInvalido:true}):this.setState({userNameInvalido:false})){}
    if(this.state.password===""?this.setState({passwordInvalido:true}):this.setState({passwordInvalido:false})){}
    if(this.state.verificaSenha===""?this.setState({verificaSenhaInvalido:true}):this.setState({verificaSenhaInvalido:false})){}
    if(this.state.nome !== "" && this.state.email !== "" &&this.state.matricula !== "" && this.state.dataIngresso !== "" &&
    this.state.userName !== "" && this.state.password !== ""&&this.state.verificaSenha !== ""){
        this.setState({modalShow:true})
    }
    if(this.state.verificaSenha !== this.state.password){this.setState({verificaSenhaInvalido:true,modalShow:false}); return }
}
   async  enviarCadastro() {
            postCadastroUsuario({
                password:this.state.password,
                userName:this.state.userName,
                nome:this.state.nome,
                permissao:"ALUNO",
                matricula:this.state.matricula,
                email:this.state.email,
                dataIngresso:this.state.dataIngresso                
            }).then(() => {
                
                this.setState({ modalShow:false,alert: true })
                setTimeout(() => {
                    this.setState({ alert: false })
                }, 2000)
                this.limpar()
            })
    }
        
        
        render() {
            return (
                <div>
                   
                <Form.Group className="col-md-6 container">

                    <TituloPagina titulo="Cadastro de Alunos" />
                    <Alert key={"idx"} variant={"success"} show={this.state.alert}>
                        Cadastrado com sucesso</Alert>
                    <SACEInput
                        label={'Nome'}
                        value={this.state.nome}
                        placeholder={'Informe o seu nome. '}
                        onChange={(e) => this.setState({nome:e.target.value})}
                        onError={this.state.nomeInvalido}
                        onErrorMessage={'Você não inseriu o seu nome corretamente!'}
                    />
                    <SACEInput
                        label={'Email'}
                        value={this.state.email}
                        placeholder={'Informe o seu email. '}
                        onChange={(e) => this.setState({email: e.target.value})}
                        onError={this.state.emailInvalido}
                        onErrorMessage={'Você não inseriu o seu email corretamente!'}
                    />
                    <SACEInput
                        label={'Matricula'}
                        tipo="number"
                        min="0"
                        value={this.state.matricula}
                        placeholder={'Informe a sua matrícula. '}
                        onChange={(e) => this.setState({matricula: e.target.value})}
                        onError={this.state.matriculaInvalida}
                        onErrorMessage={'Você não inseriu a sua matrícula corretamente!'}
                    />

                    <SACEInput
                        label={'Data de Ingresso'}
                        value={this.state.dataIngresso}
                        placeholder={'Informe a data de Ingresso. '}
                        onChange={(e) => this.setState({ dataIngresso: e.target.value })}
                        onError={this.state.dataIngressoInvalido}
                        onErrorMessage={'Você não inseriu uma data válida!'}
                        tipo={"date"}
                    />
                    <SACEInput
                        label={'Login'}
                        value={this.state.userName}
                        placeholder={'Informe um login. '}
                        onChange={(e) => this.setState({ userName: e.target.value })}
                        onError={this.state.userNameInvalido}
                        onErrorMessage={'Você não inseriu um login válido!'}
                    />
                    <SACEInput
                        label={'Senha'}
                        value={this.state.password}
                        placeholder={'Informe uma senha. '}
                        onChange={(e) => this.setState({ password: e.target.value })}
                        onError={this.state.passwordInvalido}
                        onErrorMessage={'Campo senha não pode ficar em branco!'}
                        tipo={"password"}
                    />

                    <SACEInput
                        label={'Confirme a sua senha'}
                        value={this.state.verificaSenha}
                        placeholder={'Informe a mesma senha que a anterior. '}
                        onChange={(e) => this.setState({ verificaSenha: e.target.value })}
                        onError={this.state.verificaSenhaInvalido}
                        onErrorMessage={'Campo senha não pode ficar em branco ou senha não confere!'}
                        tipo={"password"}
                    />

                    <div className="row container" style={{ position: 'relative', left: '32%' }}>


                        <Button variant="primary" className="btn btn-primary m-1" onClick={() => this.verifica()}> Enviar </Button>
                        <Modal show={this.state.modalShow} onHide={() => this.setState({ modalShow: false })} animation={false}>
                            <Modal.Header closeButton>
                                <Modal.Title > Confirmar</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Confira seus dados você não podera alteralos depois de salvar</Modal.Body>
                            <Modal.Footer>
                                <Button variant="danger" onClick={() => this.setState({ modalShow: false })}>  Fechar </Button>
                                <Button onClick={() => this.enviarCadastro()} className="btn btn-primary m-1" data-toggle="modal" data-target="#exampleModal" style={{ border: "5px solid white" }}>Salvar</Button>
                            </Modal.Footer>
                        </Modal>
                        <Link to="/login"> <Button variant="primary" className="btn btn-primary m-1" >Voltar </Button></Link>
                        <Button onClick={() => this.limpar()} className="btn btn-danger" style={{ border: "5px solid white" }}>Limpar</Button>
                    </div>
                </Form.Group>


            </div>
        );
    }
}

export default CadastroPerfilAluno;


