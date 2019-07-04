import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { Usuario } from '../usuario.model'

import { Autenticacao } from '../../autenticacao.service'






@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})



export class CadastroComponent implements OnInit {

  public mensagemErroCad: string
  

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'nome_completo': new FormControl(null,[Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'nome_usuario': new FormControl(null,[Validators.required, Validators.minLength(3)]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    'endereco': new FormControl (null,[Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'numero': new FormControl (null,[Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    'complemento': new FormControl (null)
  })

  constructor(
    private authcad : Autenticacao,
    
    
  ) { }

  ngOnInit() {
  }

  public exibirPainelLogin(): void {
    this.exibirPainel.emit('login')
  }
/* certo 
  public cadastrarUsuarioValido(): void {

    
    let usuario: Usuario = new Usuario(
      this.formulario.value.email,      
      this.formulario.value.nome_completo,      
      this.formulario.value.nome_usuario,      
      this.formulario.value.senha,
      this.formulario.value.endereco, 
      this.formulario.value.numero,
      this.formulario.value.complemento,
      
    )
     this.authcad.cadastrarUsuarioValido(usuario)
      .then(() => {
        
          console.log('primeiro if do cadrastrar valido')          
        
      })
    
  
    }


/*fim certo*/
    public cadastrarUsuario(): void {
      let usuario = new Usuario ( 
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
        this.authcad.cadastrarUsuario( usuario )    
              
         .catch((erro: any) => {
           
          if(erro){
            
            console.log(erro)
            if (erro.code === 'auth/email-already-in-use') {
              
              this.mensagemErroCad = "erro login cadastrado!!!!!"
              aux = false
              } 
            } 

       }) 
       .then (()=>{

        console.log(aux)
      if(aux === true){
        this.exibirPainelLogin()
      } else {
        console.log('else!!!!!')
        aux = true
      } 
       })
       
       
    }  
  }
}

//////////////////////////
/*
.then(( ) => {
        console.log(aux)
      /*this.exibirPainelLogin()
      this.authcad.cadastrarUsuario( usuario ) 
      if(aux == true )  {

        this.exibirPainelLogin()
        } else {
          aux = true
        }
      })

*/