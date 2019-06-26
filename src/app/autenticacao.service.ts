import { Usuario }  from './acesso/usuario.model'
import * as firebase from 'firebase'

export class Autenticacao {


    public token_id: string


    public cadastrarUsuario(usuario: Usuario): Promise<any> {
        //console.log('Chegamos até o serviço: ', usuario)

        return firebase.auth().createUserWithEmailAndPassword(usuario.email,usuario.senha)
        .then((resposta: any)=> {
            //remover a senha do atributo senha do opbjeto usuario
            delete usuario.senha 
            //registrando dados complementares do usuario no patth email na base64
            firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                .set(usuario)


        })
        .catch((error:Error)=> {
            console.log(error)
        })
    }

    public autenticar(email: string, senha: string): void {
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((resposta: any) => {
                firebase.auth().currentUser.getIdToken()
                    .then((idToken: string)=> {
                        this.token_id = idToken
                        console.log(this.token_id)

                    })
            })
            .catch((error: Error) => console.log(error))
    }
}