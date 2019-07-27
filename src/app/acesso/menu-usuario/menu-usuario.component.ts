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
    complemento: ""
  }
  imagem: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private db: AngularFirestore,
    private userService: UsuarioService,
    private fireAuth: AngularFireAuth,
    private authService: Autenticacao,
    private ngxToastr:ToastrService
  ) { }

  ngOnInit() {

    this.formulario = this.formBuilder.group({
      foto: [],
      nome: [''],
      endereco: [''],
      numero: [''],

    })

    this.fireAuth.auth.onAuthStateChanged(user => {

      this.userService.getEnderecoByUsuario(user.email).subscribe(user => {
        user.forEach((user: any) => {
          this.usuario.nome_usuario = user.nome_usuario
          this.usuario.email = user.email;
          this.formulario.controls['nome'].setValue(user.nome_completo)
          this.formulario.controls['endereco'].setValue(user.endereco)
          this.formulario.controls['numero'].setValue(user.numero)

          var foto_user = document.getElementById("foto_user");
          foto_user.style.backgroundImage = `url(${user.foto_perfil})`;
          foto_user.style.backgroundSize = "300px";

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
    this.usuario.nome_completo = this.formulario.value.nome

    this.usuario.endereco = this.formulario.value.endereco
    this.usuario.numero = this.formulario.value.numero
    this.usuario.foto_perfil = this.imagem

   
    this.authService.updateUsuario(this.usuario)
  }
}
