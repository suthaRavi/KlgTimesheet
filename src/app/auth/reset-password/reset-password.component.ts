import { Component, OnInit, Output, EventEmitter,TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { AngularTokenService, ResetPasswordData } from 'angular-token';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as modal from 'ngx-bootstrap/modal' ;

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  
  resetPasswordData: ResetPasswordData = <ResetPasswordData>{};
  @Output() onFormResult = new EventEmitter<any>();
  @ViewChild('template') template: TemplateRef<any>;
 
  modalRef: modal.BsModalRef;
  public resetPasswordForm: FormGroup;

  constructor(private tokenService: AngularTokenService,
    private modalService: modal.BsModalService,
    private fb: FormBuilder ) { }

  ngOnInit() {
    this.resetPasswordForm = this.fb.group({
      login: ['', Validators.required],

    })
  }
  resetPassword(){
    console.log('Reset password ', this.resetPasswordForm.value.login);
    this.resetPasswordData.login = this.resetPasswordForm.value.login;
    this.tokenService.resetPassword(this.resetPasswordData).subscribe(
      res => {
        if(res.status == 'success'){
          this.onFormResult.emit({ signedUp: true, res});
          console.log('Reset Password ', res);
          this.modalService.hide(1);
          
        }
      },
      err =>{
        console.log('Register err ', err);
        console.log('Register error ', err.error.errors);
        alert('Errors' + err.error.errors.full_messages);
        this.onFormResult.emit({signedUp: false, err});
        
      }
    )


  }

}
