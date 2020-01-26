import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AngularTokenService, SignInData } from 'angular-token';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
//import { NgModuleRef } from '@angular/core/src/render3';
//import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';
@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

    signInData: SignInData = <SignInData>{};

    @Output() onFormResult = new EventEmitter<any>();
    public signinForm: FormGroup;
    modalRef: BsModalRef;
  constructor(protected tokenAuthService: AngularTokenService, private fb: FormBuilder,
    private modalService: BsModalService ) { }

  ngOnInit() {
    this.signinForm = this.fb.group({
      login: ['', Validators.required],
      password: ['',Validators.required],
      
    })
  }
  onSignInSubmit(){
    this.signInData.login = this.signinForm.value.login;
    this.signInData.password = this.signinForm.value.password;
    this.tokenAuthService.signIn(this.signInData).subscribe(
      res => {
        if(res.status == 200){
          this.onFormResult.emit({signedIn: true, res});
          console.log('User name ', res);
          alert('You are signed in');
          this.modalService.hide(1);
          
        }
        
      },
      err => {
        console.log('Login error ', err.error.errors);
        this.onFormResult.emit({signedIn: false, err});
        alert(err.error.errors);
      }
    )
  }
  modalClose(){
    this.modalService.hide(1);
  }
}
