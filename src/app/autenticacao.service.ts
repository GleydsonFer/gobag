import { Usuario } from './shared/usuario.model'
import * as firebase from 'firebase'

import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class Autenticacao {

    public message: string;
    public token_id: string

    constructor(
        private router: Router,
        private db: AngularFirestore,
        private authFire: AngularFireAuth
    ) { }

    // método para cadastrar usuário
    public cadastrarUsuario(usuario: Usuario): Promise<any> {
        // console.log('Chegamos até o seriviço', usuario);
        return this.authFire.auth.createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resposta: any) => {
                //remover o atributo senha do objeto usuario
                delete usuario.senha;

                //registrando dados complementares do usuário no path email na base 64 
                // firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                //     .set({ usuario })
                this.db.collection('usuarios').doc(btoa(usuario.email)).set({ 
                    email: usuario.email,
                    nome_completo: usuario.nome_completo,
                    nome_usuario: usuario.nome_usuario,
                    endereco: usuario.endereco,
                    numero: usuario.numero,
                    complemento: usuario.complemento
                });
            })
            .catch((error: Error) => {
                this.message = error.message;
            });
    }

    //Método para o login
    public autenticar(email: string, senha: string): Promise<any> {
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

        if (this.token_id === undefined && localStorage.getItem('idToken') != null) {
            this.token_id = localStorage.getItem('idToken')
        }

        if (this.token_id === undefined) {
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

}