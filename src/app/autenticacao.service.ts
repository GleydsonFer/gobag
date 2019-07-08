import { Usuario }  from './acesso/usuario.model'
import * as firebase from 'firebase'

import { Injectable } from '@angular/core'
import { Router } from '@angular/router'


@Injectable()

export class Autenticacao {

    public message: string;
    public token_id: string

    constructor(private router: Router) {  }


    public cadastrarUsuario(usuario: Usuario): Promise<any> {
        // console.log('Chegamos até o seriviço', usuario);
        return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resposta: any) => {
                //remover o atributo senha do objeto usuario
                delete usuario.senha;

                //registrando dados complementares do usuário no path email na base 64 
                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set({ usuario })
            })
            .catch((error: Error) => {
                this.message = error.message;
            });
    }

/*
public cadastrarUsuarioValido(usuario: Usuario): Promise<any> {
    //console.log('Chegamos até o serviço: ', usuario)
    return new Promise((resolve, reject) => {
    //return 
    firebase.auth().createUserWithEmailAndPassword(usuario.email,usuario.senha)
    .then((resposta: any)=> {
        //remover a senha do atributo senha do opbjeto usuario
        delete usuario.senha 
        //registrando dados complementares do usuario no patth email na base64
        firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
            .set(usuario)
            /////////////////////////////
            


    })
    .catch((erro:any)=> {
        reject(erro)
        console.log('teste do autenticacao : ',erro)           
            
    
    })
})
} */



    //Método para o login
    public autenticar(email: string, senha: string): Promise <any> {
        return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((resposta: any) => {
                firebase.auth().currentUser.getIdToken()
                    .then((idToken: string) => {
                        this.token_id = idToken
                        localStorage.setItem('idToken', idToken)
                        this.router.navigate(['/'])
                        .then(nav => {
                            window.location.reload();
                        })
                        })
                        
                       

                      })
                    
                    .catch((erro: Error) => {
                        reject(erro)
                })
            })
        }
    
          
    


    public autenticado(): boolean {

        if(this.token_id === undefined && localStorage.getItem('idToken') != null) {
            this.token_id = localStorage.getItem('idToken')
        }

        if( this.token_id === undefined ){
            this.router.navigate(['/'])
            
        }
        
        return this.token_id !== undefined
    }

    public sair(): void {
        firebase.auth().signOut()
            .then(() => {
                localStorage.removeItem('idToken')
                this.token_id = undefined
                this.router.navigate(['/'])
                
                .then(nav => {
                    window.location.reload();
                    
              });
            })
        
    }

    ////////////////
    

}