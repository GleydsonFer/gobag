import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private db: AngularFirestore) { }
  
  public getEnderecoByUsuario(key: string) {
    console.log(key + "isso é ")
    return this.db.collection("usuarios", ref => ref.where('email', '==', key))
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }));
        })
      );
  }
}
