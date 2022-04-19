import React from "react"
import { Table, Button, Form, Modal } from "react-bootstrap"

export class Alunos extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            id: 0,
            nome:'',
            email:'',
            alunos : [],
            modalAberta: false
        }
    }
    
    componentDidMount(){
        this.buscarAluno()
    }

    cadastroAluno = (aluno) => {
        fetch(" http://localhost:3004/alunos", {method: 'POST',
        headers: {'Content-type' : 'application/json'},
        body: JSON.stringify(aluno)
    })
        .then(res => {
            if(res.ok){
            this.buscarAluno()
        }else {
            alert("Não foi possivel adicionar o aluno")
        }})
    }

    atualizarAluno = (aluno) => {
        fetch(" http://localhost:3004/alunos/" +aluno.id , {method: 'PUT',
        headers: {'Content-type' : 'application/json'},
        body: JSON.stringify(aluno)
    })
        .then(res => {
            if(res.ok){
            this.buscarAluno()
        }else {
            alert("Não foi possivel atualizar os dados do aluno")
        }})
    }

    buscarAluno = () => {
        fetch(" http://localhost:3004/alunos")
        .then(res => res.json())
        .then(dados => {
            this.setState({ alunos: dados })
        })
    }

    deletarAluno = (id) => {
        fetch(" http://localhost:3004/alunos/"+id, {method: 'DELETE'} )
        .then(res => {
            if(res.ok)
            this.buscarAluno();
        })
       }

       carregarDados = (id) => {
        fetch(" http://localhost:3004/alunos/"+id, {method: 'GET'} )
        .then(res => res.json())
        .then(aluno => {
            this.setState({ 
            id: aluno.id,
            nome:  aluno.nome,
            email:aluno.email 
        })
        this.abrirModal()
        })
       }

    atualizaNome = (e) => {
        this.setState(
            {nome: e.target.value 
    })
}
    atualizaEmail = (e) => {
        this.setState(
            {email: e.target.value 
})
}

    submit = () => {

        if(this.state.id === 0) {
            const aluno = {
                nome: this.state.nome,
                email: this.state.email
            }
            this.cadastroAluno(aluno)
        }else {
            const aluno = {
                id: this.state.id,
                nome: this.state.nome,
                email: this.state.email
            }
            this.atualizarAluno(aluno)
        }
            this.fecharModal()
        
    }

    reset = () => {
        this.setState(
            {
                id: 0,
                nome: '',
                email: ''

            }
        )
        this.abrirModal()
    }
    renderTabela = () => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Opções</th>
                </tr>
            </thead>
            <tbody>

                {
                    this.state.alunos.map((aluno) =>
                <tr>
                    <td>{ aluno.nome }</td>   
                    <td>{ aluno.email }</td>   
                    <td>
                        <Button variant = "primary" onClick={() => this.carregarDados(aluno.id)}> Atualizar </Button> 
                          <Button variant = "danger" onClick={() => this.deletarAluno(aluno.id)}> Excluir</Button>
                    </td>
                </tr>
                )
                }
                
                
                
            </tbody>
        </Table>
    )
}

    
    fecharModal = () => {
        this.setState(
            {
                modalAberta: false
            }
        )
    }

    abrirModal = () => {
        this.setState(
            {
                modalAberta: true
            }
        )
    }

        render = () => {
            return(
                <div>


            <Modal show={this.state.modalAberta} onHide={this.fecharModal}>
            <Modal.Header closeButton>
            <Modal.Title>Dados do Aluno</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
            <Form>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>ID</Form.Label>
                        <Form.Control type="text"  value={this.state.id} readOnly = {true}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" placeholder="Digite o nome do aluno" value={this.state.nome} onChange={this.atualizaNome}/>
                    </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>E-mail</Form.Label>
                    <Form.Control type="email" placeholder="Digite o email do aluno" value={this.state.email}  onChange={this.atualizaEmail}/>
                    <Form.Text className="text">
                    Utilize seu e-mail pessoal aqui.
                </Form.Text>
  </Form.Group>
  
</Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={this.fecharModal}>
                Close
            </Button>
            <Button variant="success" type="submit" onClick={this.submit}>
    Adicionar
  </Button>
            </Modal.Footer>
        </Modal>

        <Button variant="dark" type="submit" onClick={this.reset}>
    Novo
  </Button>


                    {this.renderTabela()}
                </div>
            )
        }
}