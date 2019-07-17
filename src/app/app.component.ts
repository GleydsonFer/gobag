import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
  
export class AppComponent implements OnInit {
  ngOnInit(): void {
    
    //AQUI FICA AS CONFIGURAÇÕES DO SDK EXTRAIDA DO FIREBASE!
    // SDK DE TESTE

    //nabag@gmail.com - cadastro
    var firebaseConfig = {
      apiKey: "AIzaSyCn5sb89NEIW_cV5Xp86rOQoT8rZ-6rels",
      authDomain: "cadastro-2accc.firebaseapp.com",
      databaseURL: "https://cadastro-2accc.firebaseio.com",
      projectId: "cadastro-2accc",
      storageBucket: "",
      messagingSenderId: "486427866121",
      appId: "1:486427866121:web:3a5a6b4d4a285426"
    };
    //fim.

    // CONFIGURAÇÃO DO SDK DO FIREBASE DA NABAG
    //
    //nabag@gmail.com - /nabag-delivery
    // var firebaseConfig = {
    //   apiKey: "AIzaSyCL_mKpDYSoTSapdSn4Fiolb5hAXUaFSGE",
    //   authDomain: "nabag-delivery.firebaseapp.com",
    //   databaseURL: "https://nabag-delivery.firebaseio.com",
    //   projectId: "nabag-delivery",
    //   storageBucket: "nabag-delivery.appspot.com",
    //   messagingSenderId: "1048871905386",
    //   appId: "1:1048871905386:web:a2d1f1903162af2b"
    // };

    // firebase.initializeApp(firebaseConfig);
  }
}
