import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-lojista',
  templateUrl: './cadastro-lojista.component.html',
  styleUrls: ['./cadastro-lojista.component.css']
})
export class CadastroLojistaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public formulario: FormGroup = new FormGroup({
    'nome': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'cnpj': new FormControl(null, [Validators.required, Validators.minLength(3)]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    'endereco': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    'complemento': new FormControl(null)
    
  })

}
