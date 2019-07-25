import { UsuarioService } from './../usuario.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Autenticacao } from '../autenticacao.service';
import CarrinhoService from '../carrinho.service';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

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

  public ofertas: Observable<Oferta[]>
  private subjectPesquisa: Subject<string> = new Subject<string>()
  
  produtos: any;
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
    // console.log(this.widthScreen);
  }
  ngOnInit() {
    var aux
    var endereco
    var numero

    // this.ofertas = this.subjectPesquisa //retorno Oferta[]
    //   .debounceTime(1000) //executa a ação do switchMap após 1 segundo
    //   .distinctUntilChanged() //para fazer pesquisas distintas
    //   .switchMap((termo: string) => {
    //     if (termo.trim() === '') {
    //       //retornar um observable de array de ofertas vazio
    //       return Observable.of<Oferta[]>([])
    //     }
    //     return this.ofertasService.pesquisaOfertas(termo)
    //   })
    //   .catch((err: any) => {
    //     return Observable.of<Oferta[]>([])
    //   })
    
    //Puxa o endereço de entrega do banco de dados
    this.ofertasService.getEnderecoDePedidos().then((resp) => {
     this.enderecoEntrega = resp.endereco;
    })
    //Puxa o número da casa de entrega do banco de dados
    // this.ofertasService.getNumeroDePedidos().then((resp) => {
    //   this.numeroEntrega = resp.numero;
    // })

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

  search(){
    this.produtos = this.ofertasService.pesquisaProdutos(this.searchValue);
  }

  public pesquisa(termoDaBusca: string): void {
    this.subjectPesquisa.next(termoDaBusca)
  }

  public limpaPesquisa(): void {
    this.subjectPesquisa.next('')
  }

  public sair(): void {
    this.autenticacao.sair()
  }
}