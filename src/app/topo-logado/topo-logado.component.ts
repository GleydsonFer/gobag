import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Autenticacao } from '../autenticacao.service';
import CarrinhoService from '../carrinho.service';
import { OfertasService } from '../ofertas.service';
import { Produto } from '../shared/produto.model';
import { UsuarioService } from './../usuario.service';

@Component({
  selector: 'app-topo-logado',
  templateUrl: './topo-logado.component.html',
  styleUrls: ['./topo-logado.component.css'],
  providers: [OfertasService]
})
export class TopoLogadoComponent implements OnInit {
  public usuario:any
  public enderecoEntrega: string;
  public numeroEntrega: string;
  public numeroItensCarrinho: number;
  public widthScreen:boolean = true;

  // public ofertas: Observable<Oferta[]>
  public produtos: Observable<Produto[]>
  private subjectPesquisa: Subject<string> = new Subject<string>()
  
  searchValue: string = '';

  constructor(
    private ofertasService: OfertasService,
    private autenticacao: Autenticacao,
    private carrinhoService: CarrinhoService,
    private db: AngularFirestore,
    public afauth: AngularFireAuth,
    public userService: UsuarioService
  ) { }

  ngAfterViewInit(): void {
    this.resize()
  }
  resize(){
    if(screen.width > 820){
      this.widthScreen = true
    }else{
      this.widthScreen = false
    }
  }
  ngOnInit() {
    var aux

    this.produtos = this.subjectPesquisa //retorno Produto[]
      .debounceTime(500) //executa a ação do switchMap após 1/2 segundo
      .distinctUntilChanged() //para fazer pesquisas distintas
      .switchMap((termo: string) => {
        if (termo.trim() === '') {
          //retornar um observable de array de produtos vazio
          return Observable.of<Produto[]>([])
        }
        return this.ofertasService.pesquisaProdutos(termo).subscribe(prods => prods);
      })
      .catch((err: any) => {
        return Observable.of<Produto[]>([])
      })

    this.produtos.subscribe(prods => {
      console.log(prods);
    })

   // mostrar número de itens no carrinho
    this.carrinhoService.emitirNumeroDeItens.subscribe(
      numeroItens => this.numeroItensCarrinho = numeroItens
    );

    this.afauth.auth.onAuthStateChanged(user => {

      this.userService.getEnderecoByUsuario(user.email).subscribe(usuario => {

        aux = usuario[0]
        this.enderecoEntrega = aux.endereco
        this.numeroEntrega = aux.numero
      })
    })
  }

  public pesquisa(termoDaBusca: string): void {
    this.subjectPesquisa.next(termoDaBusca);
  }

  public limpaPesquisa(): void {
    this.subjectPesquisa.next('');
  }

  public sair(): void {
    this.autenticacao.sair();
  }
}