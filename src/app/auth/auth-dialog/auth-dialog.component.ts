import { Component, OnInit, Input, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
@Component({
  selector: 'auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.css']
})
export class AuthDialogComponent implements OnInit {
  @Input('auth-mode') authMode: 'Login' | 'Register'| 'ResetPassword' = 'Login';
  @ViewChild('template', {static: false}) template: TemplateRef<any>
  modalRef: BsModalRef;
  

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  openDialog(mode: 'Login' | 'Register' | 'ResetPassword' = 'Login'
        ){
    this.authMode = mode;
    console.log("auth component **** " + this.authMode)
   this.modalRef = this.modalService.show(this.template);
  }

  isLoginMode(){return this.authMode=='Login'};
  isRegisterMode(){return this.authMode=='Register'};
  isResetPasswordMode(){return this.authMode=='ResetPassword'};

}
