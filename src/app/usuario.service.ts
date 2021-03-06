import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private db: AngularFirestore) { }

  // retorna um JSON no formato de Usuário; 
  // para recuperar os dados basta referenciar o atributo requerido
  // exemplo: usuario.endereco.logradouro para recuperar a rua do usuário
  //       ou usuario.nome para recuperar o nome do usuário

  public getUsuario(uid: string): Promise<any> {
    return new Promise(resolve => {
      this.db.collection('usuarios').doc(uid).ref.get().then(item => {
        resolve(item.data());
      });
    });


    // return this.db.collection('usuarios', ref => ref.where('email', '==', key))
    //   .snapshotChanges()
    //   .pipe(
    //     map(changes => {
    //       return changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }));
    //     })
    //   );
  }
}
