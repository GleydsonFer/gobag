import { AngularFireStorage } from '@angular/fire/storage';
import { Usuario } from './shared/usuario.model';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { promise } from 'protractor';

@Injectable()
export class Autenticacao {

    public message: string;
    public error: any;
    public token_id: string

    constructor(
        private router: Router,
        private db: AngularFirestore,
        private authFire: AngularFireAuth,
        private toastr: ToastrService,
        private storage: AngularFireStorage,
        private ngxToastr: ToastrService
    ) { }

    updateUsuario(usuario: Usuario) {


        this.authFire.auth.onAuthStateChanged(user => {
            var fireUID = user.uid;
            let imagePath = `Imagem_perfil/${fireUID}/usuario.foto_perfil`;
            if (usuario.foto_perfil !== null) {

                this.storage.upload(imagePath, usuario.foto_perfil).then(() => {
                    console.log("fazendo upload")
                }).then(() => {
                    // recupera o getDownloadURL de cada imagem
                    this.storage.ref(imagePath).getDownloadURL().subscribe(url => {
                        usuario.foto_perfil = url
                        console.log(usuario)
                        this.db.collection('usuarios').doc(fireUID).update(usuario).then(() => {
                            this.ngxToastr.success("Informações atualizadas com sucesso")
                        }).catch((error) => {
                            this.ngxToastr.error("Informações não atualizadas")
                            console.log("o erro é " + error)
                        })
                    })
                });
            } else {
                this.db.collection('usuarios').doc(fireUID).update(usuario).then(() => {
                    this.ngxToastr.success("Informações atualizadas com sucesso")
                }).catch((error) => {
                    this.ngxToastr.error("Informações não atualizadas")
                    console.log("o erro é " + error)
                })
            }
        })

    }

    // método para cadastrar usuário
    public cadastrarUsuario(usuario: Usuario): Promise<any> {
        // console.log('Chegamos até o seriviço', usuario);
        return this.authFire.auth.createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resposta: any) => {
                console.log("entrou na função");
                
                //remover o atributo senha do objeto usuario
                delete usuario.senha;

                //registrando dados complementares do usuário no path email na base 64 
                // firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                //     .set({ usuario })
                this.db.collection('usuarios').doc(btoa(usuario.email)).set({
                    nome:usuario.nome,
                    sobrenome:usuario.sobrenome,
                    data_nascimento:usuario.data_nascimento,
                    celular:usuario.celular,
                    email:usuario.email,
                    cep:usuario.cep,
                    endereco:usuario.endereco,
                    numero:usuario.numero,
                    complemento:usuario.complemento,
                    bairro:usuario.bairro,
                    cidade:usuario.cidade,
                    estado:usuario.estado,
                });
            })
            .catch((error: Error) => {
                this.message = error.message;
                this.error = error;
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



    public autenticadoVerOferta(): boolean {

        if (this.token_id === undefined && localStorage.getItem('idToken') != null) {
            this.token_id = localStorage.getItem('idToken')
        }

        if (this.token_id === undefined) {
            this.toastr.warning('Faça seu login primeiro');
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