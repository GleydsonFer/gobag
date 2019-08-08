import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-senha',
  templateUrl: './forget-senha.component.html',
  styleUrls: ['./forget-senha.component.css']
})
export class ForgetSenhaComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter()

  formulario:FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private fireAuth: AngularFireAuth,
    private toastr: ToastrService
    ) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      email: [],
    })
  }
  redefinirSenha(){
      this.fireAuth.auth.sendPasswordResetEmail(this.formulario.controls['email'].value)
      this.toastr.warning('Enviamos um email de redefinição par sua conta de email')
      this.exibirPainel.emit('login')
  }

}
