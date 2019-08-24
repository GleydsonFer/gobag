import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { LojistaService } from '../lojista.service';
import { Lojista } from '../shared/lojista.model';

// import { Autenticacao } from '../../autenticacao.service'
import { ToastrService } from 'ngx-toastr';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-cadastro-lojista',
  templateUrl: './cadastro-lojista.component.html',
  styleUrls: ['./cadastro-lojista.component.css']
})
export class CadastroLojistaComponent implements OnInit {

  lojista: Lojista;
  formulario: FormGroup
  
  public mensagemErroCad: string;

  constructor(private lojistaService: LojistaService,
    // private auth: Autenticacao,
    private fireAuth: AngularFireAuth,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private http: Http,) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      sobrenome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      email: ['', [Validators.required, Validators.email]],
      numero: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      cargo: [''],
      cep: ['', [Validators.required, Validators.minLength(10)]],
      celular: ['', [Validators.required, Validators.minLength(14)]],
      telefone: ['', [Validators.required, Validators.minLength(14)]],
      cnpj: ['',[Validators.required, Validators.minLength(18)]],
      endereco: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      complemento: [''],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      uf: ['', [Validators.required]],
      nomeDaLoja: ['']
    })
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
      this.formulario.controls['uf'].setValue(dadosCep.uf)
    })
  }
}

  // public cadastro: FormGroup = new FormGroup({
  //   'nome': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
  //   'sobrenome': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
  //   'cargo': new FormControl(null),
  //   'telefone': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(13)]),
  //   'email': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.email]),
  //   'nomeDaLoja': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
  //   'cnpj': new FormControl(null, [Validators.required, Validators.pattern('[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}')]),
  //   'cep': new FormControl(null, [Validators.required, Validators.pattern('[0-9]{5}-[0-9]{3}')]),
  //   'endereco': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
  //   'numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
  //   'complemento': new FormControl(null),
  //   'bairro': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
  //   'cidade': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
  //   'uf': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
  //   'telefone_loja': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(13)]),
  //   'instagram': new FormControl(null),
  //   'jaPossuiEntregadores': new FormControl(null),
  //   'possuiQuantasLojas': new FormControl(null),
  //   'comoChegouAteNos': new FormControl(null),
  // })

  public cadastrarLojista() {
    this.lojista = new Lojista();

    // if (this.cadastro.status == "INVALID") {
    //   this.cadastro.get('nome').markAsTouched()
    //   this.cadastro.get('sobrenome').markAsTouched()
    //   this.cadastro.get('celular').markAsTouched()
    //   this.cadastro.get('email').markAsTouched()
    //   this.cadastro.get('nomeDaLoja').markAsTouched()
    //   this.cadastro.get('cnpj').markAsTouched()
    //   this.cadastro.get('cep').markAsTouched()
    //   this.cadastro.get('endereco').markAsTouched()
    //   this.cadastro.get('numero').markAsTouched()
    //   this.cadastro.get('bairro').markAsTouched()
    //   this.cadastro.get('cidade').markAsTouched()
    //   this.cadastro.get('uf').markAsTouched()
    //   this.cadastro.get('telefone_loja').markAsTouched()

    // } else {

    //   this.lojista = {
    //     nome: <string>this.cadastro.value.nome,
    //     sobrenome: <string>this.cadastro.value.sobrenome,
    //     cargo: <string>this.cadastro.value.cargo,
    //     telefone: <string>this.cadastro.value.celular,
    //     email: <string>this.cadastro.value.email,
    //     nomeDaLoja: <string>this.cadastro.value.nomeDaLoja,
    //     cnpj: <string>this.cadastro.value.cnpj,
    //     cep: <string>this.cadastro.value.cep,
    //     endereco: <string>this.cadastro.value.endereco,
    //     numero: <number>this.cadastro.value.numero,
    //     complemento: <string>this.cadastro.value.complemento,
    //     bairro: <string>this.cadastro.value.bairro,
    //     cidade: <string>this.cadastro.value.cidade,
    //     uf: <string>this.cadastro.value.uf,
    //     telefone_loja: '',
    //     instagram: '',
    //     jaPossuiEntregadores: <string>this.cadastro.value.jaPossuiEntregadores,
    //     possuiQuantasLojas: <string>this.cadastro.value.possuiQuantasLojas,
    //     comoChegouAteNos: <string>this.cadastro.value.comoChegouAteNos
    //   };

    //   this.lojistaService.cadastrarLojista(this.lojista);
    //   this.cadastro.reset();

    //}
  }
  updateFieldValue(campo, value) {
    console.log(this.formulario.controls[campo])

    this.formulario.controls[campo].setValue(value)
    this.formulario.controls[campo].markAsTouched()
  }

  aplicaCssErro(campo) {
    return { 'is-invalid': this.formulario.get(campo).invalid && this.formulario.get(campo).touched }
  }
}
