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
  private categorias = [];

  constructor(private ofertasService: OfertasService) { }

  public cadastro: FormGroup = new FormGroup({
    'nome': new FormControl(null, [Validators.required]),
    'descricao': new FormControl(null, [Validators.required]),
    'valor': new FormControl(null, [Validators.required]),
    'categoria': new FormControl(null, [Validators.required]),
    'observacoes': new FormControl(null, [Validators.required]),
    'loja': new FormControl(null, [Validators.required]),
    'tamanhoPP': new FormControl(),
    'tamanhoP': new FormControl(),
    'tamanhoM': new FormControl(),
    'tamanhoG': new FormControl(),
    'tamanhoGG': new FormControl(),
  })

  ngOnInit() {
  }

  // envia o produto com as imagens no formato de string vazio,
  cadastrarProduto() {
    //reorganizando categorias para ser array de strings, e não de objetos
    var aux = [];
    this.categorias.forEach(element => {
      aux.push(element.display)
    });
    this.categorias = aux;
    console.log(this.categorias);

    let nome: string = this.cadastro.value.nome;

    this.produto = new Produto();
    this.produto = {
      id_produto: Date.now().toString(),
      nome: nome,
      nome_insensitive: nome.toLowerCase(),
      descricao: this.cadastro.value.descricao,
      valor: this.cadastro.value.valor,
      categoria: this.categorias,
      data: new Date(Date.now()),
      loja: this.cadastro.value.loja,
      promocao: false,
      tamanho: {
        PP: this.cadastro.value.tamanhoPP,
        P: this.cadastro.value.tamanhoP,
        M: this.cadastro.value.tamanhoM,
        G: this.cadastro.value.tamanhoG,
        GG: this.cadastro.value.tamanhoGG
      },
      observacoes: this.cadastro.value.observacoes,
      // as imagens começam vazias, só são preenchidas se o usuário inserir imagens
      imagens: []
    }

    // envia as imagens em separado como parametro para o setProduto(),
    this.ofertasService.setProduto(this.produto, this.imagens);
  }

  // insere as imagens seleiconadas pelo usuário ao Array de imagens
  uploadFile(event) {
    for (let imagem of event.target.files) {
      this.imagens.push(imagem);
    }
  }

}
