import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { Usuario } from '../../shared/usuario.model'

import { Autenticacao } from '../../autenticacao.service'







@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  
})
export class CadastroComponent implements OnInit {
  usuario:Usuario = {
     email: "",
     nome_completo: "",
     nome_usuario: "",
     senha: "",
     endereco: "",
     numero: "",
     complemento: "",
     cpf:"",
     foto_perfil: ""
  }
  public mensagemErroCad: string

  //
  public aux  = true;

  
  
  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()
  
  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'nome_completo': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'nome_usuario': new FormControl(null, [Validators.required, Validators.minLength(3)]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    'endereco': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    'complemento': new FormControl(null)
    
  })
  

  constructor(
    private auth: Autenticacao,
    private fireAuth:AngularFireAuth
  ) { }

  ngOnInit() {
  }

  public exibirPainelLogin(): void {
    this.exibirPainel.emit('login');
  }

  public cadastrarUsuario(): void {
    
    let usuario = new Usuario(
      this.formulario.value.email,
      this.formulario.value.nome_completo,
      this.formulario.value.nome_usuario,
      this.formulario.value.senha,
      this.formulario.value.endereco,
      this.formulario.value.numero,
      this.formulario.value.complemento
    )

    var aux = true;

    if (this.formulario.status == "INVALID") {
      this.formulario.get('email').markAsTouched()
      this.formulario.get('nome_completo').markAsTouched()
      this.formulario.get('nome_usuario').markAsTouched()
      this.formulario.get('senha').markAsTouched()
      this.formulario.get('endereco').markAsTouched()
      this.formulario.get('numero').markAsTouched()
      this.formulario.get('complemento').markAsTouched()

    } else {
      Object.assign(this.usuario,usuario)
      this.usuario.foto_perfil = ""
      console.log(this.usuario);
      this.auth.cadastrarUsuario(this.usuario)
        .then(() => {

          var user =  this.fireAuth.auth.currentUser
          user.sendEmailVerification().then(function() {
            // Email sent.
          }).catch(function(error) {
            // An error happened.
          });

          if (this.mensagemErroCad !== undefined) {
            this.auth.message = undefined;
          }

          this.mensagemErroCad = this.auth.message;
          console.log(this.mensagemErroCad);

          if (this.mensagemErroCad === 'The email address is already in use by another account.') {
            this.mensagemErroCad = "O endereço de email já está em uso por uma outra conta."
          }
          if (this.mensagemErroCad === 'The email address is badly formatted.') {
            this.mensagemErroCad = "emeil com formatação errada"
          }

          if (this.mensagemErroCad === undefined) {
            this.exibirPainelLogin()
            this.mensagemErroCad = undefined;
          }
        });
    }
  }
}


