import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';

import { Autenticacao } from '../../autenticacao.service'





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
                
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public mensagemErro: string = ""

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter()

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  constructor(
    private auth: Autenticacao,
    
  ) { }

  ngOnInit() {
  }


  public exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro')
  }

  

  public autenticar(): void {
    if (this.formulario.status == "INVALID") {
      this.formulario.get('email').markAsTouched()
      this.formulario.get('senha').markAsTouched()
    } else {
      this.auth.autenticar(
        this.formulario.value.email,
        this.formulario.value.senha
      ).catch((erro: any) => {
        console.log()

        if(erro){
          if (erro.code === 'auth/wrong-password') {
            this.mensagemErro = "Senha inválida";
          } else if(erro.code === 'auth/user-not-found'){
            this.mensagemErro = "O email informado é inválido ou não está cadastrado";
         } 
      } else {
        
          this.mensagemErro = "ERRO1";
          
       
      }
    })
  }
}

  

}