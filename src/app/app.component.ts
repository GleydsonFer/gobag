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

    firebase.initializeApp(firebaseConfig)
  }
}
