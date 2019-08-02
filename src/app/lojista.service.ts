import { Injectable } from '@angular/core';
import { Lojista } from "./shared/lojista.model";
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LojistaService {

  constructor(
    private afs: AngularFirestore,
    private toastr: ToastrService
  ) { }

  cadastrarLojista(lojista: Lojista){
    this.afs.collection('lojas').add(lojista).then(resp => {
      this.toastr.success(`BEM-VINDO ${lojista.nome.toUpperCase()}`,'LOJISTA ADICIONADO COM SUCESSO!')
    })
    .catch(err => {
      console.log(err);
    });
  }
}
