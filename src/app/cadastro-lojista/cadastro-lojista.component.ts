import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LojistaService } from '../lojista.service';
import { Lojista } from '../shared/lojista.model';

@Component({
  selector: 'app-cadastro-lojista',
  templateUrl: './cadastro-lojista.component.html',
  styleUrls: ['./cadastro-lojista.component.css']
})
export class CadastroLojistaComponent implements OnInit {

  lojista: Lojista;

  constructor(private lojistaService: LojistaService) { }

  ngOnInit() {
  }

  public cadastro: FormGroup = new FormGroup({
    'nome': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    'sobrenome': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    'cargo': new FormControl(null),
    'telefone': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(13)]),
    'email': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.email]),
    'nomeDaLoja': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
    'cnpj': new FormControl(null, [Validators.required, Validators.pattern('[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}')]),
    'cep': new FormControl(null, [Validators.required, Validators.pattern('[0-9]{5}-[0-9]{3}')]),
    'endereco': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    'numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
    'complemento': new FormControl(null),
    'bairro': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
    'cidade': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
    'uf': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
    'telefone_loja': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(13)]),
    'instagram': new FormControl(null),
  })

  public cadastrarLojista() {
    this.lojista = new Lojista();

    if (this.cadastro.status == "INVALID") {
      this.cadastro.get('nome').markAsTouched()
      this.cadastro.get('sobrenome').markAsTouched()
      this.cadastro.get('telefone').markAsTouched()
      this.cadastro.get('email').markAsTouched()
      this.cadastro.get('nomeDaLoja').markAsTouched()
      this.cadastro.get('cnpj').markAsTouched()
      this.cadastro.get('cep').markAsTouched()
      this.cadastro.get('endereco').markAsTouched()
      this.cadastro.get('numero').markAsTouched()
      this.cadastro.get('bairro').markAsTouched()
      this.cadastro.get('cidade').markAsTouched()
      this.cadastro.get('uf').markAsTouched()
      this.cadastro.get('telefone_loja').markAsTouched()

    } else {

      this.lojista = {
        nome: <string>this.cadastro.value.nome,
        sobrenome: <string>this.cadastro.value.sobrenome,
        cargo: <string>this.cadastro.value.cargo,
        telefone: <string>this.cadastro.value.telefone,
        email: <string>this.cadastro.value.email,
        nomeDaLoja: <string>this.cadastro.value.nomeDaLoja,
        cnpj: <string>this.cadastro.value.cnpj,
        cep: <string>this.cadastro.value.cep,
        endereco: <string>this.cadastro.value.endereco,
        numero: <number>this.cadastro.value.numero,
        complemento: <string>this.cadastro.value.complemento,
        bairro: <string>this.cadastro.value.bairro,
        cidade: <string>this.cadastro.value.cidade,
        uf: <string>this.cadastro.value.uf,
        telefone_loja: <string>this.cadastro.value.telefone_loja,
        instagram: <string>this.cadastro.value.instagram,
      };

      this.lojistaService.cadastrarLojista(this.lojista);
      this.cadastro.reset();

    }
  }

}
