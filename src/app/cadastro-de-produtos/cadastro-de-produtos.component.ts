import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Produto } from '../shared/produto.model';
import { OfertasService } from '../ofertas.service';

@Component({
  selector: 'app-cadastro-de-produtos',
  templateUrl: './cadastro-de-produtos.component.html',
  styleUrls: ['./cadastro-de-produtos.component.css']
})
export class CadastroDeProdutosComponent implements OnInit {

  private produto: Produto;
  private imagens: Array<any> = [];

  constructor(private ofertasService: OfertasService) { }

  public cadastro: FormGroup = new FormGroup({
    'nome': new FormControl(null, [Validators.required]),
    'descricao': new FormControl(null, [Validators.required]),
    'valor': new FormControl(null, [Validators.required]),
    'categoria': new FormControl(null, [Validators.required]),
    'observacoes': new FormControl(null, [Validators.required]),
    'loja': new FormControl(null, [Validators.required]),
    'tamanho': new FormControl(null, [Validators.required]),
    'estoque': new FormControl(null, [Validators.required])
  })

  ngOnInit() {
  }

  // envia o produto com as imagens no formato de string vazio,
  cadastrarProduto() {
    this.produto = new Produto();
    this.produto = {
      id_produto: Date.now(),
      nome: this.cadastro.value.nome,
      descricao: this.cadastro.value.descricao,
      valor: this.cadastro.value.valor,
      categoria: this.cadastro.value.categoria,
      loja: this.cadastro.value.loja,
      tamanho: this.cadastro.value.tamanho,
      estoque: this.cadastro.value.estoque,
      observacoes: this.cadastro.value.observacoes,
      // as imagens começam vazias, só são preenchidas se o usuário inserir imagens
      imagens: []
    }

    // envia as imagens em separado como parametro para o setProduto(),
    this.ofertasService.setProduto(this.produto, this.imagens);
  }

  // insere as imagens seleiconadas pelo usuário ao Array de imagens
  uploadFile(event){
    for(let imagem of event.target.files){
      this.imagens.push( imagem );
    }
  }

}
