import { Autenticacao } from './../../autenticacao.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from './../../shared/usuario.model';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.css']
})
export class MenuUsuarioComponent implements OnInit {

  formulario: FormGroup;
  usuario: Usuario = {
    email: "",
    nome_completo: "",
    nome_usuario: "",
    senha: "",
    endereco: "",
    numero: "",
    complemento: "",
    data_nascimento: "",
    celular: "",
    bairro: ""
  }
  imagem: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private db: AngularFirestore,
    private userService: UsuarioService,
    private fireAuth: AngularFireAuth,
    private authService: Autenticacao,
    private ngxToastr: ToastrService
  ) { }

  ngOnInit() {

    this.formulario = this.formBuilder.group({
      foto: [],
      nome: ['',[Validators.required]],
      email: [''],
      cpf: ['', [Validators.minLength(11), Validators.maxLength(11),Validators.required]],
      data_nascimento: ['',[Validators.required]],
      celular: ['',[Validators.required]],
      endereco: ['', [Validators.minLength(3),Validators.required]],
      numero: ['', [Validators.minLength(1), Validators.required]],
      bairro: ['',[Validators.required]],
      nome_usuario: ['',[Validators.required]],
    })

    this.fireAuth.auth.onAuthStateChanged(user => {

      this.userService.getUsuario(user.email).subscribe(user => {
        user.forEach((user: any) => {
          //setando informações do usuario na tela de cadastro
          this.formulario.controls['nome'].setValue(user.nome_completo)
          this.formulario.controls['endereco'].setValue(user.endereco)
          this.formulario.controls['numero'].setValue(user.numero)
          this.formulario.controls['email'].setValue(user.email)
          this.formulario.controls['cpf'].setValue(user.cpf)
          this.formulario.controls['data_nascimento'].setValue(user.data_nascimento)
          this.formulario.controls['nome_usuario'].setValue(user.nome_usuario)
          this.formulario.controls['celular'].setValue(user.celular)
          this.formulario.controls['bairro'].setValue(user.bairro)

          //atribuindo dados do banco ao objeto usuario
          this.usuario.nome_usuario = user.nome_usuario
          this.usuario.nome_completo = user.nome_completo;
          this.usuario.email = user.email;
          this.usuario.cpf = user.cpf;
          this.usuario.data_nascimento = user.data_nascimento;
          this.usuario.endereco = user.endereco;
          this.usuario.numero = user.numero;
          this.usuario.celular = user.celular;
          this.usuario.bairro = user.bairro;

          if (user.foto_perfil) {
            //colocar url da imagem como background na foto de perfil 
            var foto_user = document.getElementById("foto_user");
            foto_user.style.backgroundImage = `url(${user.foto_perfil})`;
            foto_user.style.backgroundSize = "100%";

          }
        })
      })
    })
  }

  uploadFile(event: any) {


    var selectedFile = event.target.files[0];
    var reader = new FileReader();
    this.imagem = event.target.files[0]

    var imgtag: any = document.getElementById("imgtag");
    var foto_user = document.getElementById("foto_user");
    reader.onload = function (event) {
      var target: any = event.target

      foto_user.style.backgroundImage = "none";
      imgtag.src = target.result;
    };
    reader.readAsDataURL(selectedFile);
  }

  salvar() {

    delete this.usuario.senha;
    //atribuindo dados do formulário ao objeto usuário
    this.usuario.nome_completo = this.formulario.value.nome
    this.usuario.nome_usuario = this.formulario.value.nome_usuario
    this.usuario.email = this.formulario.value.email
    this.usuario.cpf = this.formulario.value.cpf
    this.usuario.data_nascimento = this.formulario.value.data_nascimento
    this.usuario.endereco = this.formulario.value.endereco
    this.usuario.numero = this.formulario.value.numero
    this.usuario.celular = this.formulario.value.celular
    this.usuario.bairro = this.formulario.value.bairro


    this.usuario.foto_perfil = this.imagem

    
    this.authService.updateUsuario(this.usuario)

  }

  aplicaCssErro(campo) {
    switch (campo) {
      case "endereco":
        return {
          'is-invalid': this.formulario.get(campo).invalid && this.formulario.get(campo).touched
        }
      case 'cpf':
        return {
          'is-invalid': this.formulario.get(campo).invalid && this.formulario.get(campo).touched
        }
      case 'numero':
        return {
          'is-invalid': this.formulario.get(campo).invalid && this.formulario.get(campo).touched
        }
      default:
        break;
    }
  }
}
