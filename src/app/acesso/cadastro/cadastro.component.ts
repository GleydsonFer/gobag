import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'

import { Usuario } from '../../shared/usuario.model'

import { Autenticacao } from '../../autenticacao.service'
import { ToastrService } from 'ngx-toastr';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],

})
export class CadastroComponent implements OnInit {
  usuario: Usuario = {
    nome: "",
    sobrenome: "",
    data_nascimento: "",
    celular: "",
    email: "",
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    senha: ""
  }
  formulario: FormGroup
  public mensagemErroCad: string;
  //
  public aux = true;
  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()

  constructor(
    private auth: Autenticacao,
    private fireAuth: AngularFireAuth,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private http: Http,
  ) { }

  ngOnInit() {

    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      sobrenome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      nascimento: ['', [Validators.required, Validators.minLength(10)]],
      celular: ['', [Validators.required, Validators.minLength(14)]],
      email: ['', [Validators.required, Validators.email]],
      cep: ['', [Validators.required, Validators.minLength(10)]],
      endereco: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      numero: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      complemento: [''],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(6), this.validarSenha]],
      confirmSenha: ['', [Validators.required, Validators.minLength(6), this.validarConfirmSenha]]
    })
  }

  validarSenha(control: FormControl) {
    const field = control.root.get('confirmSenha')
    if (field !== null) {
      let value = field.value
      field.setValue(value)
    }
  }

  validarConfirmSenha(control: FormControl) {
    const field = control.root.get('senha')
    if (field !== null) {
      if (field.value == control.value) {
        return null
      } else {
        return { 'custon': true }
      }
    }
  }

  buscarCep(cep) {
    this.formulario.controls['cep'].markAsTouched()
    this.formulario.controls['cep'].setValue(cep)
    var cep = cep.replace(/[^0-9]/g, '')


    if (cep.toString().length == 8) {
      this.http.get('https://viacep.com.br/ws/' + cep + '/json/').subscribe((reponse: any) => {
        var dadosCep = JSON.parse(reponse._body)
        this.formulario.controls['endereco'].setValue(dadosCep.logradouro)
        this.formulario.controls['bairro'].setValue(dadosCep.bairro)
        this.formulario.controls['cidade'].setValue(dadosCep.localidade)
        this.formulario.controls['estado'].setValue(dadosCep.uf)
      })
    }
  }

  updateFieldValue(campo, value) {
    console.log(this.formulario.controls[campo])

    this.formulario.controls[campo].setValue(value)
    this.formulario.controls[campo].markAsTouched()
  }

  console(value) {
    console.log(value)
  }

  public exibirPainelLogin(): void {
    this.exibirPainel.emit('login');
    window.scrollTo(0, 0);
  }

  public cadastrarUsuario(): void {

    let usuario = new Usuario(
      this.formulario.value.nome,
      this.formulario.value.sobrenome,
      this.formulario.value.nascimento,
      this.formulario.value.celular,
      this.formulario.value.email,
      this.formulario.value.cep,
      this.formulario.value.endereco,
      this.formulario.value.numero,
      this.formulario.value.complemento,
      this.formulario.value.bairro,
      this.formulario.value.cidade,
      this.formulario.value.estado,
      this.formulario.value.senha,
    )

    var aux = true;

    if (this.formulario.status == "INVALID") {
      // this.formulario.get('nome').markAsTouched()
      // this.formulario.get('sobrenome').markAsTouched()
      // this.formulario.get('data_nascimento').markAsTouched()
      // this.formulario.get('cep').markAsTouched()
      // this.formulario.get('email').markAsTouched()
      // this.formulario.get('cep').markAsTouched()
      // this.formulario.get('endereco').markAsTouched()
      // this.formulario.get('numero').markAsTouched()
      // this.formulario.get('complemento').markAsTouched()
      // this.formulario.get('bairro').markAsTouched()
      // this.formulario.get('cidade').markAsTouched()
      // this.formulario.get('estado').markAsTouched()
      // this.formulario.get('senha').markAsTouched()


    } else {
      Object.assign(this.usuario, usuario)
      this.usuario.foto_perfil = ""
      this.auth.cadastrarUsuario(usuario)
        .then(() => {

          if (this.mensagemErroCad !== undefined) {
            this.auth.message = undefined;
          }

          if (this.auth.error !== undefined) {
            if (this.auth.error.code === 'auth/email-already-in-use') {
              this.mensagemErroCad = "O endereço de email já está em uso por uma outra conta."

            }
            if (this.auth.error.code === 'auth/invalid-email') {
              this.mensagemErroCad = "O endereço de email é inválido."
            }
            if (this.auth.error.code === 'auth/operation-not-allowed') {
              this.mensagemErroCad = "Conta de email/senha não estão ativadas."
            }
            if (this.auth.error.code === 'auth/weak-password') {
              this.mensagemErroCad = "Senha muita fraca. Para sua segurança digite uma senha mais forte."
            }
            this.auth.error = undefined

          } else {
            var user = this.fireAuth.auth.currentUser
            user.sendEmailVerification().then(function () {
              // Email sent.
            }).catch(function (error) {
              // An error happened.
            });
            this.toastr.success('Cadastro foi relazidado com sucesso!')
            this.exibirPainelLogin()
            this.mensagemErroCad = undefined;
          }


        })
    }
  }


  aplicaCssErro(campo) {
    return { 'is-invalid': this.formulario.get(campo).invalid && this.formulario.get(campo).touched }
  }



}


